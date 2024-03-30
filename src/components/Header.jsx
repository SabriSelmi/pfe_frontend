import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="main_menu home_menu">
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-12">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="index.html"> <img src="img/logo.png" alt="logo" /> </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="menu_icon"><i className="fas fa-bars" /></span>
            </button>
            <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="#">Home</a>
                </li>
                
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Annonce
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                  <Link to="/Home/listA">
                    <a className="dropdown-item"> Annonce list</a>
                  </Link>
                  <Link to="/Home/ajout">
                    <a className="dropdown-item">Ajouter Annonce</a>
                  </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Pages
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown_2">
                    <Link to='/Home/listFavoris'>
                    <a className="dropdown-item" href="cart.html">List Favoris</a>
                    </Link>
                    <Link to='/Home/listComment'>
                    <a className="dropdown-item" href="checkout.html">List Comments</a>
                    </Link>
                  </div>
                </li>
                <li>
                  <Link to="/Home/Discussion" className="nav-link">Chats</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">Contact</a>
                </li>
                <li>
                  <Link to="/" className="nav-link">Login</Link>
                </li>
              </ul>
            </div>
            <div className="hearer_icon d-flex align-items-center">
              <a id="search_1" href="javascript:void(0)"><i className="ti-search" /></a>
              <a href="cart.html">
                <i className="flaticon-shopping-cart-black-shape" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>

  </header>
  )
}

export default Header
