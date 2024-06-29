import React, { useState, useEffect } from "react";
import FavorisService from "../services/FavorisService";
import { api } from "../config";

const ListFavoris = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [favoris, setFavoris] = useState([]);
  const [isAffiche, setIsAffiche] = useState(false);

  const Affiche = () => {
    FavorisService.GetFavorisByUser(userId)
      .then((res) => {
        console.log(res.data);
        const uniqueFavoris = [
          ...new Map(res.data.map((item) => [item.annonce._id, item])).values(),
        ];
        setFavoris(uniqueFavoris);
        setIsAffiche(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Affiche();
  }, []);

  const retirerDesFavoris = (favorisId) => {
    FavorisService.DeleteOne(favorisId)
      .then((res) => {
        console.log("Annonce retirée des favoris avec succès !");
        setFavoris(favoris.filter((item) => item._id !== favorisId));
      })
      .catch((error) => {
        console.log("Erreur lors du retrait des favoris :", error);
      });
  };

  if (!isAffiche) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(favoris) || favoris.length === 0) {
    return <div>No favoris found.</div>;
  }

  return (
    <div>
      <h2>Liste des Favoris</h2>
      <div className="container">
        <div className="row">
          {favoris.map((item) => (
            <div key={item._id} className="col-lg-3 col-md-6 mb-4">
              <div
                className="single_product_item"
                style={{ margin: "30px", marginTop: "40px" }}
              >
                <div
                  className="card"
                  style={{
                    width: "300px",
                    height: "200px",
                    scrollMargin: "30px",
                  }}
                >
                  <img
                    src={`${api}/file/annonces/${item.annonce.photo}`}
                    className="card-img-top"
                    style={{ width: "300px", height: "200px" }}
                  />
                  <div className="card-body" style={{ height: "100px" }}>
                    <h3 style={{ fontSize: "1rem" }}>{item.annonce.titre}</h3>
                    <p className="card-text" style={{ fontSize: "0.9rem" }}>
                      {item.annonce.prix}
                    </p>
                    <button
                      className="btn_3"
                      onClick={() => retirerDesFavoris(item._id)}
                      style={{ fontSize: "0.8rem", padding: "0.25rem 0.5rem" }}
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListFavoris;
