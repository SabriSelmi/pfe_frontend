import React, { useState } from "react";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetUsername, setResetUsername] = useState("");
  const [data, setData] = useState();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await UserService.resetPassword({
        username: resetUsername,
        password: newPassword,
      });
      setResetMessage("Mot de passe réinitialisé avec succès.");
      navigate("/");

    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation du mot de passe :",
        error
      );
      setResetMessage(
        "Une erreur s'est produite lors de la réinitialisation du mot de passe."
      );
    }
  };
  const sendResetPasswordEmail = () => {
    UserService.sendResetPasswordEmail({ username: resetUsername })
      .then((res) => {
        setResetMessage("Un email de réinitialisation a été envoyé.");
        navigate("/verification-code");
      })
      .catch((error) => {
        setResetMessage(error.message);
      });
  };
  return (
    <div className="login_part_form" style={{ padding: "50px 0" }}>
      <div className="login_part_form_iner" style={{ maxWidth: "400px", margin: "auto" }}>
        <h3>Réinitialisation du mot de passe</h3>
        <div style={{ marginBottom: "20px", marginTop:"20px" }}>
          <input
            type="text"
            className="form-control"
            value={resetUsername}
            onChange={(e) => setResetUsername(e.target.value)}
            placeholder="Entrez votre nom d'utilisateur"
            style={{ width: "100%", marginBottom: "30px" }}
          />
          {/*<input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Entrez votre nouveau mot de passe"
            style={{ width: "100%" }}
  />*/}
        </div>
        <button className="btn_3" onClick={() => sendResetPasswordEmail()}>ok</button>
        {resetMessage && <p style={{ color: 'green', marginTop: '10px' }}>{resetMessage}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
