import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnnonceService from "../services/AnnonceService";

function AjoutAnnonce() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const [data, setData] = useState({
    titre: "",
    description: "",
    prix: "",
    reduction: "",
    category: "",
    vendeur: userId,
  });
  const [image, setImage] = useState([]);
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titre", data.titre);
    formData.append("description", data.description);
    formData.append("prix", data.prix);
    formData.append("vendeur", data.vendeur);

    if (data.category === "65eddfcba5adbaca6e281702") {
      // Identifiant de la catégorie BigDeal
      formData.append("reduction", data.reduction);
    }

    formData.append("category", data.category);

    if (image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append("files", image[i]);
      }
    }

    try {
      const res = await AnnonceService.Create(formData);
      console.log("Annonce ajoutée avec succès:", res.data);
      navigate("/Home");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce:", error);
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {" "}
          {/* Augmentation de la largeur de la colonne */}
          <div className="card" style={{ height: "550px" }}>
            {" "}
            {/* Augmentation de la hauteur de la carte */}
            <div className="card-body">
              <h2
                className="card-title text-center mb-4"
                style={{ color: "#c59fc5" }}
              >
                Ajouter une Annonce
              </h2>
              <form onSubmit={onSubmitHandle}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="titre"
                    placeholder="Titre"
                    value={data.titre}
                    onChange={onChangeHandle}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows={3}
                    cols={6}
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    value={data.description}
                    onChange={onChangeHandle}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="prix"
                    placeholder="Prix"
                    value={data.prix}
                    onChange={onChangeHandle}
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="category"
                    onChange={onChangeHandle}
                    value={data.category}
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="65eddf6ea5adbaca6e281700">Normal</option>
                    <option value="65eddfcba5adbaca6e281702">BigDeal</option>
                  </select>
                </div>
                {data.category === "65eddfcba5adbaca6e281702" && ( // Identifiant de la catégorie BigDeal
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="reduction"
                      placeholder="Reduction"
                      value={data.reduction}
                      onChange={onChangeHandle}
                    />
                  </div>
                )}
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleImage}
                    multiple
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ backgroundColor: "#ad8fba", borderColor: "#ad8fba" }}
                >
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjoutAnnonce;
