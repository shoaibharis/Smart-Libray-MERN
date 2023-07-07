import React, { Fragment, useState, useEffect } from 'react';
import Loader from '../Layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { MdOutlineLockOpen } from 'react-icons/md';
import { MdMailOutline } from 'react-icons/md';
import { MdLockOpen } from 'react-icons/md';
import { MdFace } from 'react-icons/md';
import { orgRegister, clearErrors } from '../../Actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const OrgReg = ({ history }) => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    orgName: '',
    phone: '',
    orgEmail: '',
    orgType: '',
    bio: '',
    github: '',
    twitter: '',
    instagram: '',
    password: '',
    confirmPassword: '',
  });

  const {
    orgName,
    phone,
    orgEmail,
    orgType,
    bio,
    github,
    twitter,
    instagram,
    password,
    confirmPassword,
  } = user;

  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      orgName: orgName,
      phone: phone,
      orgEmail: orgEmail,
      orgType: orgType,
      bio: bio,
      github: github,
      twitter: twitter,
      instagram: instagram,
      password: password,
      confirmPassword: confirmPassword,
      avatar: avatar,
    };

    dispatch(orgRegister(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [alert, isAuthenticated, dispatch, error, navigate]);

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <div className="col-xxl-8 m-5 mb-xxl-0">
        <div className="container bg-light shadow bg-secondary-soft emp-profile px-4 py-5 rounded">
          <h4 className="mb-4 mt-0">Sign Up!</h4>
          <form encType="multipart/form-data" onSubmit={registerSubmit}>
            <div className="row g-3">
              <hr />

              {/* Organization Name */}
              <div className="col-md-6">
                <label className="form-label">Organization Name </label>
                <div className="input-group shadow">
                  <div className="input-group-prepend">
                    <span className="input-group-text " id="inputGroupPrepend3">
                      <i className="fa-solid fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder= "Organization Name"
                    name="orgName"
                    value={orgName}
                    onChange={registerDataChange}
                    required
                    />
                    </div>
                    </div>
                              {/* Phone */}
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <div className="input-group shadow">
              <div className="input-group-prepend">
                <span className="input-group-text " id="inputGroupPrepend3">
                  <i className="fa-solid fa-phone" />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={registerDataChange}
                required
              />
            </div>
          </div>

          {/* Organization Email */}
          <div className="col-md-6">
            <label className="form-label">Organization Email</label>
            <div className="input-group shadow">
              <div className="input-group-prepend">
                <span className="input-group-text " id="inputGroupPrepend3">
                  <MdMailOutline />
                </span>
              </div>
              <input
                type="email"
                className="form-control"
                placeholder="Organization Email"
                name="orgEmail"
                value={orgEmail}
                onChange={registerDataChange}
                required
              />
            </div>
          </div>

          {/* Organization Type */}
          <div className="col-md-6">
            <label className="form-label">Organization Type</label>
            <div className="input-group shadow">
              <div className="input-group-prepend">
                <span className="input-group-text " id="inputGroupPrepend3">
                  <MdOutlineLockOpen />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Organization Type"
                name="orgType"
                value={orgType}
                onChange={registerDataChange}
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div className="col-md-12">
            <label className="form-label">Bio</label>
            <div className="input-group shadow">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend3">
                  <MdLockOpen />
                </span>
              </div>
              <textarea
                className="form-control"
                placeholder="Bio"
                rows="5"
                name="bio"
                value={bio}
                onChange={registerDataChange}
                required
              ></textarea>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4">
            <label className="form-label">Github</label>
            <div className="input-group shadow">
              <div className="input-group-prepend">
                <span className="input-group-text " id="inputGroupPrepend3">
                  <i className="fab fa-github"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Github"
                name="github"
                value={github}
                onChange={registerDataChange}
                required
              />
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label">Twitter</label>
            <div className="input-group shadow">
              <div className="input-group-prepend">
                <span className="input-group-text " id="inputGroupPrepend3">
                  <i className="fab fa-twitter"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Twitter"
                name="twitter"
                value={twitter}
                onChange={registerDataChange}
                required
              />
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label">Instagram</label>
            <div className="input-group shadow">
              <div className="input-group-prepend">
                <span className="input-group-text " id="inputGroupPrepend3">
                  <i className="fab fa-instagram"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Instagram"
                name="instagram"
                value={instagram}
                onChange={registerDataChange}
                required
              />
            </div>
          </div>

           {/* Password */}
           <div className="col-md-6">
              <label className="form-label">Password *</label>
              <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text p-2" id="inputGroupPrepend3">
                    <i className="fa-solid fa-lock" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
            </div>
            {/* Confirm Password */}
            <div className="col-md-6">
              <label className="form-label">Confirm Password *</label>
              <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text p-2" id="inputGroupPrepend3">
                    <i className="fa-solid fa-lock" />
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder=""
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={registerDataChange}
                />
              </div>
            </div>

           {/* Avatar */}
           <div className="col-md-12">
              <label className="form-label">Profile Picture</label>
              <div className="input-group shadow">
                <div className="input-group-prepend">
                  <span className="input-group-text p-2" id="inputGroupPrepend3">
                    <i className="fa-solid fa-image" />
                  </span>
                </div>
                <input type="file" className="form-control" required name="avatar" onChange={registerDataChange} />
              </div>
            </div>

          {/* Register Button */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>

          </div>
          <div className="col-md-12 text-center">Already have an account? <Link to={"/login/organization"}><button className='btn btn-outline-primary'>Log in</button></Link></div>

        </div>
      </form>
    </div>
  </div>
    </Fragment>
  )
}

export default OrgReg;