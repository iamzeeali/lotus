import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === 'demo' && password === 'demo') {
      navigate('/report');
    } else {
      window.alert('Wrong username or password');
    }
    // try {
    //   const response = await axios.post("http://localhost:5000/login", {
    //     username,
    //     password,
    //   });
    //   console.log(response.data);

    //   setLoggedIn(true);
    // } catch (error) {
    //   console.error("Error:", error.response.data.error);
    // }
  };

  return (
    <div className="page login p-3">
      <img src="/logo.png" alt="logo" width={150} />{' '}
      <img src="/siCalC.png" alt="calc" width={60} />
      <div className="container py-5">
        <div className="row py-4">
          <div className="col-sm-6" style={{ textAlign: 'center' }}>
            <img src="/lotus.png" alt="logo" style={{ width: '50%' }} />
            <br />
            <br />
            <img src="/logo.png" alt="logo" width={300} /> <br />
            <small>SilCal Developed by Lotus Wireless Technologies</small>
          </div>
          <div className="col-sm-6 px-5">
            <form className="px-5 py-5" onSubmit={handleLogin}>
              <h3>
                {' '}
                <i className="fa fa-user-o"></i> Login
              </h3>
              <hr />
              <fieldset>
                <div class="form-group mt-4">
                  <label for="exampleInputEmail1" class="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter User Name"
                    value={username}
                    onChange={(e) => handleUsername(e)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1" class="form-label mt-3">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    value={password}
                    onChange={(e) => handlePasswordChange(e)}
                    placeholder="Password"
                    required
                  />
                  <a href="">
                    {' '}
                    <small>Forgot password?</small>
                  </a>
                </div>
                <div className="d-grid">
                  <button
                    to="/report"
                    className="btn btn-primary mt-4"
                    type="submit"
                  >
                    Login{' '}
                  </button>
                </div>
                <a href="">
                  {' '}
                  <small>Create Account?</small>
                </a>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="footer">
          <small className="copyright">
            &copy; Copyright 20223, Lotus Wireless Technologies
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
