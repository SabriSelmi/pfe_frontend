import React, { useEffect, useState } from 'react';
import AnnonceService from '../services/AnnonceService';
import { Link } from 'react-router-dom';
import { api } from '../config';

const Layout = () => {
  const [annonces, setAnnonces] = useState([]);
  const [bigDeals, setBigDeals] = useState([]);
  const [recentAnnonce, setRecentAnnonce] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const response = await AnnonceService.getRecentAnnonces(6);
        setAnnonces(response.data.data);

        // Find big deals
        const bigDeals = response.data.data.filter(annonce => annonce.reduction > 0);
        setBigDeals(bigDeals);

        // Find the recent annonce with the highest reduction
        let maxReductionAnnonce = null;
        response.data.data.forEach(annonce => {
          if (!maxReductionAnnonce || annonce.reduction > maxReductionAnnonce.reduction) {
            maxReductionAnnonce = annonce;
          }
        });

        // Si la récente annonce n'est pas confirmée, trouver la prochaine annonce confirmée
        if (maxReductionAnnonce && !maxReductionAnnonce.confirmed) {
          maxReductionAnnonce = response.data.data.find(annonce => annonce.confirmed);
        }

        setRecentAnnonce(maxReductionAnnonce);
      } catch (error) {
        console.error('Error fetching recent annonces:', error);
      }
    };

    fetchAnnonces();
  }, []);

  // Filter annonces based on search term and confirmation status
  const filteredAnnonces = annonces.filter(annonce =>
    annonce.titre.toLowerCase().includes(searchTerm.toLowerCase()) && annonce.confirmed
  );

  // Handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="search_bar">
        <div className="container">
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-md-5">
            <div className="banner_text">
              <div className="banner_text_iner">
                {recentAnnonce && recentAnnonce.confirmed && (
                  <>
                    <h1>{recentAnnonce.titre}</h1>
                    <p>{recentAnnonce.prix}</p>
                    <p>{recentAnnonce.reduction}</p>
                    <Link to={`/Home/page/${recentAnnonce._id}`} className="btn_1">View Details</Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-7">
            {recentAnnonce && recentAnnonce.confirmed && (
              <div className="banner_img">
                <img src={`${api}/file/annonces/${recentAnnonce.photo}`} className="card-img-top img-fluid" style={{ maxWidth: '700px', height: '400px' }}/>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="trending_items">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_tittle text-center">
                <h2>Les nouvelles Annonces</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Display big deals first */}
            {bigDeals.map((annonce) => (
              <div key={annonce._id} className="col-lg-4 col-md-6 mb-4">
                <div className="single_product_item">
                  <div className="single_product_item_thumb">
                    <img src={`${api}/file/annonces/${annonce.photo}`} className="card-img-top" style={{ maxWidth: '400px', height: '300px' }} />
                  </div>
                  <h3><Link to={`/Home/page/${annonce._id}`}>{annonce.titre}</Link></h3>
                  <p className="card-text">{annonce.prix}</p>
                  <p className="card-text">{annonce.reduction}</p>
                </div>
              </div>
            ))}
            {/* Then display other annonces */}
            {filteredAnnonces.map((annonce) => (
              <div key={annonce._id} className="col-lg-4 col-md-6 mb-4">
                <div className="single_product_item">
                  <div className="single_product_item_thumb">
                    <img src={`${api}/file/annonces/${annonce.photo}`} className="card-img-top" style={{ maxWidth: '400px', height: '300px' }} />
                  </div>
                  <h3><Link to={`/Home/page/${annonce._id}`}>{annonce.titre}</Link></h3>
                  <p className="card-text">{annonce.prix}</p>
                  <p className="card-text">{annonce.reduction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer section */}
      <footer className="footer_part">
        <div className="footer_iner">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-8">
                <div className="footer_menu">
                  <div className="footer_logo">
                    <a href="index.html"><img src="img/logo.png" alt="#" /></a>
                  </div>
                  <div className="footer_menu_item">
                    <a href="index.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="product_list.html">Annonces</a>
                    <a href="blog.html">Blog</a>
                    <a href="contact.html">Contact</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="social_icon">
                  <a href="#"><i className="fab fa-facebook-f" /></a>
                  <a href="#"><i className="fab fa-instagram" /></a>
                  <a href="#"><i className="fab fa-google-plus-g" /></a>
                  <a href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright_part">
          <div className="container">
            <div className="row ">
              <div className="col-lg-12">
                <div className="copyright_text">
                  <div className="copyright_link">
                    <a href="#">Turms &amp; Conditions</a>
                    <a href="#">FAQ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
