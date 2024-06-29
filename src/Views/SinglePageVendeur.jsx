import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnnonceService from "../services/AnnonceService";

import { api } from "../config";

const SinglePage = () => {
  const [annonce, setAnnonce] = useState({});
  const { id } = useParams();

  console.log("id", id);

  useEffect(() => {
    Affiche();
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
                  style={{ width: "850px", height: "500px" }}
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="single_product_text text-center">
                <h3>{annonce.titre}</h3>
                <p>{annonce.description}</p>
                <p>{annonce.category?.prix}</p>
                <p>{annonce.category?.reduction}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default SinglePage;
