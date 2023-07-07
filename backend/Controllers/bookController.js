const Book=require("../Models/bookModel");
const Member=require("../Models/Users/memberModel");
const cloudinary=require("cloudinary")
const catchAsyncErrors=require("../Middlewares/catchAsyncErrors")
const ErrorHandler=require("../Utils/errorHandler");
const sendToken=require("../Utils/jwtToken")
const ApiFeatures=require("../Utils/apiFeatures")
const organization=require("../Models/Users/adminModel")
const Borrow=require("../Models/borrowModel")



// Create a new book
exports.createbook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    console.log(req.body)
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the book.' });
  console.log(error.message)
  }
};

// Get a specific book by ID
exports.bookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the book.' });
  }
};

exports.searchbooks=catchAsyncErrors(async(req,res,next)=>{
    const resultPerPage=8;
    const booksCount=await Book.countDocuments();
      
    const apiFeature=new ApiFeatures(Book.find(),req.query).search().filter().pagination(resultPerPage)

   const booksInfo =await apiFeature.query
   console.log(booksInfo)
     res.status(200).json({
         success:true,
         booksInfo,
         booksCount,
         resultPerPage,
     })
 
})

exports.getAllbooks = async (req, res) => {
  try {
    // Find all books and populate the organization field
    const books = await Book.find()

    // Return the book details with organization details
    res.status(200).json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.borrowBook=catchAsyncErrors( async (req,res,next)=>{
 
  const { id,borrowDate,returnDate } = req.body;

  const selectedbook = await Book.findById(id);

  if (!selectedbook) {
    return res.status(400).json({
      success: false,
      message: "book does not exist",
    });
  }

  req.user.borrowedBooks.push(id);
  selectedbook.status="Borrowed"

  const borrowedBook=new Borrow({
    book:id,
    member:req.user._id,
    borrowDate,
    returnDate
  })

  await borrowedBook.save()
  // req.user.notifications.push(`${selectedbook.title} : Application Submitted. `)
  await req.user.save();
  await selectedbook.save();

  res.status(201).json({
    success: true,
    message: "Borrowed successfully",
  });
});



exports.returnBook = async (req, res, next) => {
  const { bookID } = req.body;

  try {
    const selectedBook = await Book.findById(bookID);
    const member = await Member.findById(req.user._id);

    if (!member) {
      return next(new ErrorHandler('Member Not Found', 400));
    }

    if (!selectedBook) {
      return res.status(400).json({
        success: false,
        message: 'Book does not exist',
      });
    }

    member.borrowedBooks.pull(bookID);
    selectedBook.status = 'Available';

    await Borrow.findOneAndDelete({ book: bookID });

    await member.save();
    await selectedBook.save();

    res.status(201).json({
      success: true,
      message: 'Returned successfully',
    });
  } catch (err) {
    return next(err);
  }
};



exports.updatebook= async (req, res) => {
  try {
 
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
  };

  exports.deletebook = async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
  
      if (book) {
        await book.deleteOne();
        res.status(201).json({ message: 'Book removed' });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  exports.myBooks = async (req, res) => {
    try {
      
    
      const member = await Member.findById(req.params.id).populate("borrowedBooks")
     
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
      
      res.json(member.borrowedBooks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
// Function to check and send reminder emails for overdue books
const checkOverdueBooks = async () => {
  try {
    // Find all borrowed books that are overdue
    const currentDate = new Date();
    const overdueBooks = await Borrow.find({ returnDate: { $lt: currentDate } }).populate('member');

    // Send reminder emails to the members
    for (const book of overdueBooks) {
      const member = book.member;
      member.notifications.push(`Dear ${member.firstName},\n\nThis is a reminder that the book you borrowed, ${book.title}, is overdue. Please return it as soon as possible.`)
    }
  } catch (error) {
    console.log('Error checking overdue books:', error);
  }
};

// Schedule the checkOverdueBooks function to run periodically (e.g., every day)
setInterval(checkOverdueBooks, 24 * 60 * 60 * 1000); // Run once every 24 hours (adjust as needed)


exports.trackBook=async (req,res)=>{
  try {
    const borrowedBook = await Borrow.findById(req.params.id);

    if (!borrowedBook) {
      return res.status(404).json({ error: 'Borrowed book not found' });
    }

    res.json(borrowedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAllBorrowedBooks=async (req,res)=>{
  try {
    const borrowedBooks = await Borrow.find().populate("member").populate("book");

    res.json(borrowedBooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}