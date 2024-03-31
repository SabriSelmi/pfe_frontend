import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnnonceService from "../services/AnnonceService";
import FavorisService from "../services/FavorisService";
import CommentaireService from "../services/CommentaireService";
import Swal from "sweetalert2";
import { api } from "../config";

const SinglePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [annonce, setAnnonce] = useState({});
  const [favorisAdded, setFavorisAdded] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({ contenu: "", auteur: userId });

  console.log("id", id);

  const onChangeHandle = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();
    const commentData = {
      ...data,
      annonce: id, // Ajouter l'identifiant de l'annonce
    };
    CommentaireService.Create(commentData)
      .then((res) => {
        console.log(res);
        setData({ contenu: "", auteur: userId });
        Swal.fire("Merci pour votre commantaire");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Affiche();
    checkFavoris();
  }, [id]);

  const Affiche = () => {
    AnnonceService.GetById(id)
      .then((res) => {
        console.log(res);
        setAnnonce(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addFavoris = () => {
    const favorisData = {
      annonce: annonce._id,
      user: userId,
    };

    FavorisService.Create(favorisData)
      .then((res) => {
        console.log("Annonce ajoutée aux favoris avec succès !");
        Swal.fire("ajoutée au favoris avec succés");
      })
      .catch((error) => {
        console.log("Erreur lors de l'ajout aux favoris :", error);
      });
  };

  const checkFavoris = () => {
    AnnonceService.checkFavoris(id)
      .then((res) => {
        setFavorisAdded(true);
      })
      .catch((error) => {
        console.log("Erreur lors de la vérification des favoris :", error);
      });
  };

  return (
    <div>
      <section className="breadcrumb_part single_product_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_iner"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="product_image_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="single_product_img">
                <img
                  src={`${api}/file/annonces/${annonce.photo}`}
                  className="img-fluid"
                  alt="Annonce"
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="single_product_text text-center">
                <h3>{annonce.titre}</h3>
                <p>{annonce.description}</p>
                <p>{annonce.category?.prix}</p>
                <p>{annonce.category?.reduction}</p>
                <div className="card_area row">
                  <div className="col">
                    <div className="contact_seller">
                      <button className="btn_3" onClick={addFavoris}>
                        {favorisAdded
                          ? "Ajoutée aux favoris"
                          : "Ajouter au favoris"}{" "}
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col">
                    <div className="contact_seller">
                      <Link
                        to={`/Home/chat/${annonce.vendeur}`}
                        className="btn_3"
                      >
                        Contacter le vendeur
                        <i className="fas fa-comment-alt"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="comment_section" style={{ marginBottom: "30px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="comment_form">
                <h3>Leave a Comment</h3>
                <form onSubmit={onSubmitHandle}>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Write your comment here"
                      value={data.contenu}
                      name="contenu"
                      onChange={onChangeHandle}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn_3">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SinglePage;
