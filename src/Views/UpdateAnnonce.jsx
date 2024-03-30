import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AnnonceService from '../services/AnnonceService';

const UpdateProduct = () => {
const [data, setData]=useState({});
const [image, setImage]=useState([]);
  const {id}=useParams()
  useEffect(()=>{
    AnnonceService.GetById(id).then((res)=>{
      console.log(res)
      setData(res.data.data)
    })
  }, [])
  const OnChangeHandle=(e)=>{
    setData({
      ...data, [e.target.name]:e.target.value
    }) 
    console.log(data)
  }
  const navigate = useNavigate()
  const OnSubmitHandle=(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("titre", data.titre);
    formData.append("description", data.description);
    formData.append("prix", data.prix);
    formData.append("vendeur", data.vendeur);

    if (data.category === '65eddfcba5adbaca6e281702') { // Identifiant de la catégorie BigDeal
      formData.append("reduction", data.reduction);
    }

    formData.append("category", data.category);

    if (image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append("files", image[i]);
      }
    }

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        AnnonceService.Update(id, data).then((res)=>{
          console.log(res)
          navigate("/Home/listA")
          }).catch((error)=>{
            console.log(error)
        })
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

  }
  const handleImage=(e)=>{
    setImage(e.target.files)

  }
  return (
<div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8"> {/* Augmentation de la largeur de la colonne */}
          <div className="card" style={{ height: '550px' }}> {/* Augmentation de la hauteur de la carte */}
            <div className="card-body">
              <h2 className="card-title text-center mb-4" style={{ color: '#c59fc5' }}>Ajouter une Annonce</h2>
              <form onSubmit={OnSubmitHandle}>
                <div className="form-group">
                  <input type="text" className="form-control" name="titre" defaultValue={data.titre} onChange={OnChangeHandle} required />
                </div>
                <div className="form-group">
                  <textarea rows={3} cols={6} className="form-control" name="description" defaultValue={data.description} onChange={OnChangeHandle} required />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="prix" defaultValue={data.prix} onChange={OnChangeHandle} required />
                </div>
                <div className="form-group">
                  <select className="form-control" name="category" onChange={OnChangeHandle} defaultValue={data.category} required>
                    <option value="">Sélectionner une catégorie</option>
                    <option value="65eddf6ea5adbaca6e281700">Normal</option>
                    <option value="65eddfcba5adbaca6e281702">BigDeal</option>
                  </select>
                </div>
                {data.category === '65eddfcba5adbaca6e281702' && // Identifiant de la catégorie BigDeal
                  <div className="form-group">
                    <input type="text" className="form-control" name="reduction" defaultValue={data.reduction} onChange={OnChangeHandle} />
                  </div>
                }
                <div className="form-group">
                  <input type="file" className="form-control" name='image' onChange={handleImage} multiple />
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#ad8fba', borderColor: '#ad8fba' }}>
                  Modifier
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default UpdateProduct
