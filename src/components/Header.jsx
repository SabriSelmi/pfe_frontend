import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import AuthService from "../services/AuthService";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const logoutHandle = () => {
    AuthService.logout();
    localStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <header className="main_menu home_menu">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg navbar-light">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="menu_icon">
                  <i className="fas fa-bars" />
                </span>
              </button>
              <div
                className="collapse navbar-collapse main-menu-item"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/Home">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/Home/listA">
                      Annonces
                    </a>
                  </li>
                  {role == "vendeur"?
                  (<li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="blog.html"
                      id="navbarDropdown_1"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Pages
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown_1"
                    >
                      <Link to="/Home/ajout">
                        <a className="dropdown-item">Ajouter Annonce</a>
                      </Link>
                      <Link to="/Home/listP">
                        <a className="dropdown-item">Annonces Publiées</a>
                      </Link>
                    </div>
                  </li>):(<div></div>)}
                  
                  <li>
                    <Link to="/Home/Discussion" className="nav-link">
                      Chats
                    </Link>
                  </li>

                  <li>
                    {!isLoggedIn ? (
                      <Link to="/" className="nav-link">
                        Login
                      </Link>
                    ) : (
                      <Link
                        to="/"
                        className="nav-link"
                        onClick={() => logoutHandle()}
                      >
                        Logout
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
              <div className="hearer_icon d-flex align-items-center">
                <a href="/Home/listComment">
                <i className="far fa-comment"/>
                </a>
              </div>
              <div className="hearer_icon d-flex align-items-center">
                <a href="/Home/listFavoris">
                <i className="far fa-heart"/>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
