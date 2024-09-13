import React from 'react';
import "../assets/style.css"
import "../assets/bootstrap.min.css";

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });

    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...");
    } else {
      alert("The user could not be logged out.");
    }
  };

  // Gets the username in the current session
  const curr_user = sessionStorage.getItem('username');

  // If the user is logged in, show the username and logout option
  const homePageItems = curr_user ? (
    <div className="navbar-text">
      <span className="btn btn-outlined-dark disabled">{curr_user}</span>
      <a className="btn btn-outline-dark" href="/djangoapp/logout" onClick={logout}>Logout</a>
    </div>
  ) : (
    <div className="navbar-text">
      <a className="btn btn-outline-dark" href="/login">Login</a>
      <a className="btn btn-outline-dark" href="/register">Register</a>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Dealerships</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact Us</a>
            </li>
          </ul>
          <div className="navbar-text d-flex">
            {homePageItems}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
