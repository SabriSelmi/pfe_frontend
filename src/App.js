import logo from './logo.svg';
import './App.css';
import Home from './Views/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './Views/Layout';
import Login from './components/Login';
import SignUpClient from './components/SignUpClient';
import SignUpVendeur from './components/SignUpVendeur';
import ListeAnnonces from './Views/ListeAnnonces';
import SinglePage from './Views/SinglePage';
import SinglePageVendeur from './Views/SinglePageVendeur';
import AjoutAnnonce from './Views/AjoutAnnonce';
import ListComment from './Views/ListComment';
import ListFavoris from './Views/ListFavoris';
import Chat from './components/Chat';
import UpdateAnnonce from './Views/UpdateAnnonce';
import Discussion from './components/Discussion';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { useEffect } from 'react';
import { socket } from './config';
import AnnoncesPublies from './Views/AnnoncesPublies';
import ResetPassword from './components/ResetPassword';
import VerificationCode from './components/VerificationCode';
import Newpass from './components/Newpass';


function App() {
  const { isLoggedIn, redirectToSignIn, setIsLoggedIn } = useAuth();
  // const Privateroute = ({ children }) => {
  //   if (!localStorage.getItem("user")) {
  //     return <Navigate to="/"></Navigate>;
  //   }
  //   return children;
  // }
  useEffect(() => {
    if (!isLoggedIn)
      redirectToSignIn()
    socket.on('connect', () => {
      console.log("socket connected")
    });
  }, [isLoggedIn])
  return (
  <div className="App">
      <Routes>
        <Route path='/Home' element={<Home></Home>}>
          <Route path='/Home' element={<Layout></Layout>}></Route>
          <Route path='/Home/listA' element={<ListeAnnonces></ListeAnnonces>}></Route>
          <Route path='/Home/listP' element={<AnnoncesPublies></AnnoncesPublies>}></Route>
          <Route path='/Home/page/:id' element={<SinglePage></SinglePage>}></Route>
          <Route path='/Home/pageV/:id' element={<SinglePageVendeur></SinglePageVendeur>}></Route>
          <Route path='/Home/ajout' element={<AjoutAnnonce></AjoutAnnonce>}></Route>
          <Route path='/Home/listComment' element={<ListComment></ListComment>}></Route>
          <Route path='/Home/listFavoris' element={<ListFavoris></ListFavoris>}></Route>
          <Route path='/Home/Discussion' element={<Discussion></Discussion>}></Route>
          <Route path='/Home/chat/:id' element={<Chat></Chat>}></Route>
          <Route path='/Home/update/:id' element={<UpdateAnnonce></UpdateAnnonce>}></Route>
            </Route>
                <Route path='/' element={<Login></Login>}></Route>
                <Route path='/reset-password' element={<ResetPassword></ResetPassword>}></Route>
                <Route path='/verification-code' element={<VerificationCode></VerificationCode>}></Route>
                <Route path='/Newpass' element={<Newpass></Newpass>}></Route>
                <Route path='/signup_c' element={<SignUpClient></SignUpClient>}></Route>
                <Route path='/signup_v' element={<SignUpVendeur></SignUpVendeur>}></Route>
        
      </Routes>
      </div>
  );
}

export default App;
