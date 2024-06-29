import React, { useState, useEffect } from "react";
import { api } from "../config";
import AnnonceService from "../services/AnnonceService";
import { Link } from "react-router-dom";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2'; 


const AnnoncesPublies = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const [annonces, setAnnonces] = useState([]);
  const [isAffiche, setIsAffiche] = useState(false);

  const deleteAnnonce = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            // If user confirms deletion
            AnnonceService.DeleteOne(id).then((res) => {
              setAnnonces(annonces.filter((annonce) => annonce._id !== id));
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your announcement has been deleted.",
                "success"
              );
            }).catch((error) => {
              // Handle error if deletion fails
              console.error("Error deleting announcement:", error);
              swalWithBootstrapButtons.fire(
                "Error",
                "Failed to delete announcement.",
                "error"
              );
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // If user cancels deletion
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your announcement is safe :)",
              "error"
            );
          }
        });
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };  

  const Affiche = () => {
    AnnonceService.GetAnnoncesByVendeur(userId)
      .then((res) => {
        console.log(res.data);
        setAnnonces(res.data);
        setIsAffiche(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Affiche();
  }, []);

  if (!isAffiche) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(annonces) || annonces.length === 0) {
    return <div>No Annonce found.</div>;
  }

  return (
    <div>
      <h2>Liste des Annonces</h2>
      <div className="container">
        <div className="row">
          {annonces.map((annonce) => (
            <div key={annonce._id} className="col-lg-3 col-md-6 mb-4">
              <div
                className="single_product_item"
                style={{ margin: "30px", marginTop: "40px" }}
              >
                <div
                  className="card"
                  style={{
                    width: "300px",
                    height: "400px",
                    scrollMargin: "50px",
                  }}
                >
                  <img
                    src={`${api}/file/annonces/${annonce.photo}`}
                    className="card-img-top"
                    style={{ width: "300px", height: "200px" }}
                    alt={annonce.titre}
                  />
                  <div className="card-body" style={{ height: "100px" }}>
                    <Link to={`/Home/pageV/${annonce._id}`} style={{ fontSize: "1rem", color:"black" }}>{annonce.titre}</Link>                    
                    <p className="card-text" style={{ fontSize: "0.9rem" }}>
                      {annonce.prix}
                    </p>
                    <Link
                       to={`/Home/update/${annonce._id}`}
                        className="btn btn-primary mr-2"
                        >
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <button
                        onClick={() => deleteAnnonce(annonce._id)}
                        className="btn btn-danger"
                        >
                        <FontAwesomeIcon icon={faTrash} />
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

export default AnnoncesPublies;
