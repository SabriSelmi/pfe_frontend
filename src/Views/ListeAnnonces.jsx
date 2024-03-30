import React, { useEffect, useState } from 'react';
import AnnonceService from '../services/AnnonceService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Listes.css'
import { api } from '../config';

const ListeAnnonces = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  let timeoutId; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AnnonceService.GetAll();
        setAnnonces(res.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false); 
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); 
    setShowDropdown(true); 
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 200); 
  };

  const handleDropdownMouseEnter = () => {
    clearTimeout(timeoutId); 
  };

  const handleDropdownMouseLeave = () => {
    setShowDropdown(false); 
  };

  const deleteAnnonce = async (id) => {
    try {
      await AnnonceService.DeleteOne(id);
      setAnnonces(annonces.filter(annonce => annonce._id !== id));
    } catch (error) {
      console.error('Error deleting annonce:', error);
    }
  };

  const filteredAnnonces = selectedCategory ? annonces.filter(annonce => {
    if (selectedCategory === 'normal') {
      return annonce.category.type === 'normal';
    } else if (selectedCategory === 'bigdeal') {
      return annonce.category.type === 'bigdeal';
    } else {
      return true; // Si aucune catégorie n'est sélectionnée, afficher toutes les annonces
    }
  }) : annonces;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="single_sedebar">
              <div 
                className="select_option"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="select_option_list">Category <i className="right fas fa-caret-down" /> </div>
                {showDropdown && (
                  <div className="select_option_dropdown" onMouseEnter={handleDropdownMouseEnter} onMouseLeave={handleDropdownMouseLeave}>
                    <p><a className="select_option_list" onClick={() => handleCategoryChange('normal')}>Normal</a></p>
                    <p><a className="select_option_list" onClick={() => handleCategoryChange('bigdeal')}>BigDeal</a></p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <section className="product_list section_padding">
              <div className="container">
                <div className="row">
                  {filteredAnnonces.map((annonce) => (
                    <div key={annonce._id} className="col-lg-4 col-md-6 mb-4">
                      <div className="single_product_item">
                        <div className="card" style={{ width: "300px", height: '425px', marginRight:'10px'  }}>
                          <img src={`${api}/file/annonces/${annonce.photo}`} className="card-img-top" style={{ width: "300px", height: '200px'  }} alt={annonce.nom} />
                          <div className="card-body" style={{ width: "300px", height: '200px'  }}>
                            <h4><Link to={`/Home/page/${annonce._id}`}>{annonce.titre}</Link></h4>
                            <p className="card-text">{annonce.prix}</p>
                            <Link to={`/Home/update/${annonce._id}`} className="btn btn-primary mr-2">
                            <FontAwesomeIcon icon={faEdit} />
                            </Link>                            
                            <button onClick={() => deleteAnnonce(annonce._id)} className="btn btn-danger">
                            <FontAwesomeIcon icon={faTrash} />
                            </button>                          
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Subscribe Part */}
      <section className="subscribe_part section_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="subscribe_part_content">
                <div className="subscribe_form">
                  <input type="email" placeholder="Enter your mail" />
                  <a href="#" className="btn_1">Subscribe</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListeAnnonces;
