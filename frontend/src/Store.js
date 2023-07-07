import {createStore, combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { userReducer } from "./Reducers/userReducer";
import bookReducer, { bookDetailsReducer } from "./Reducers/bookReducer";
import connectionReducer from "./Reducers/connectionReducer";
const reducer=combineReducers({
     user:userReducer,
     book:bookReducer,
     bookDetails:bookDetailsReducer,
     connection: connectionReducer
});



const middleWare=[thunk]

const store= createStore(reducer,composeWithDevTools(applyMiddleware(...middleWare)));

export default store