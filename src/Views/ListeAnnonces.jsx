import React, { useEffect, useState } from "react";
import AnnonceService from "../services/AnnonceService";
import { Link } from "react-router-dom";
import "./Listes.css";
import { api } from "../config";

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
    console.log("Selected category:", category);
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
  console.log("Annonces:", annonces);
  const confirmedAnnonces = annonces.filter(annonce => annonce.confirmed);
  const filteredAnnonces = selectedCategory ? confirmedAnnonces.filter(annonce => annonce.category?._id === selectedCategory) : confirmedAnnonces;
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
                <div className="select_option_list">
                  Category <i className="right fas fa-caret-down" />{" "}
                </div>
                {showDropdown && (
                  <div
                    className="select_option_dropdown"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <p>
                      <a
                        className="select_option_list"
                        onClick={() => handleCategoryChange("65eddf6ea5adbaca6e281700")}
                      >
                        Normal
                      </a>
                    </p>
                    <p>
                      <a
                        className="select_option_list"
                        onClick={() => handleCategoryChange("65eddfcba5adbaca6e281702")}
                      >
                        BigDeal
                      </a>
                    </p>
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
                        <div
                          className="card"
                          style={{
                            width: "300px",
                            height: "425px",
                            marginRight: "10px",
                          }}
                        >
                          <img
                            src={`${api}/file/annonces/${annonce.photo}`}
                            className="card-img-top"
                            style={{ width: "300px", height: "200px" }}
                            alt={annonce.nom}
                          />
                          <div
                            className="card-body"
                            style={{ width: "300px", height: "200px" }}
                          >
                            <h4>
                              <Link to={`/Home/page/${annonce._id}`}>
                                {annonce.titre}
                              </Link>
                            </h4>
                            <p className="card-text">{annonce.prix}</p>
                            <p className="card-text">{annonce.reduction}</p>
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
    </div>
  );
};

export default ListeAnnonces;
