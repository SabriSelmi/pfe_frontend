import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const navigate = useNavigate();

  const handleVerifyCode = async () => {
    try {
      await UserService.verificationCode({ resetCode: verificationCode });
      navigate("/Newpass");
    } catch (error) {
      console.error("Erreur lors de la vérification du code :", error);
      setVerificationMessage("Le code de vérification est incorrect.");
    }
  };

  return (
    <div className="login_part_form" style={{ padding: "50px 0" }}>
      <div className="login_part_form_iner" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3>Vérification du code</h3>
        <div style={{ marginBottom: "20px", marginTop:"20px" }}>
          <input
            type="text"
            className="form-control"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Entrez le code de vérification"
            style={{ width: "100%" }}
          />
        </div>
        <button className="btn_3" onClick={handleVerifyCode}>Vérifier le code</button>
        {verificationMessage && <p style={{ color: 'red', marginTop: '30px' }}>{verificationMessage}</p>}
      </div>
    </div>
  );
};

export default VerificationCode;
