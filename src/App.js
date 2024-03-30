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
import AjoutAnnonce from './Views/AjoutAnnonce';
import ListComment from './Views/ListComment';
import ListFavoris from './Views/ListFavoris';
import Chat from './components/Chat';
import Chats from './components/Chats';
import UpdateAnnonce from './Views/UpdateAnnonce';
import Discussion from './components/Discussion';
import { AuthProvider } from './components/AuthProvider';

function App() {
  const Privateroute = ({ children }) => {
    if (!localStorage.getItem("user")) {
      return <Navigate to="/"></Navigate>;
    }
    return children;
  }
  return (
  <div className="App">
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/Home' element={<Privateroute><Home></Home></Privateroute>}>
          <Route path='/Home' element={<Privateroute><Layout></Layout></Privateroute>}></Route>
          <Route path='/Home/listA' element={<Privateroute><ListeAnnonces></ListeAnnonces></Privateroute>}></Route>
          <Route path='/Home/page/:id' element={<Privateroute><SinglePage></SinglePage></Privateroute>}></Route>
          <Route path='/Home/ajout' element={<Privateroute><AjoutAnnonce></AjoutAnnonce></Privateroute>}></Route>
          <Route path='/Home/listComment' element={<Privateroute><ListComment></ListComment></Privateroute>}></Route>
          <Route path='/Home/listFavoris' element={<Privateroute><ListFavoris></ListFavoris></Privateroute>}></Route>
          <Route path='/Home/Discussion' element={<Privateroute><Discussion></Discussion></Privateroute>}></Route>
          <Route path='/Home/chat2' element={<Privateroute><Chat></Chat></Privateroute>}></Route>
          <Route path='/Home/update/:id' element={<Privateroute><UpdateAnnonce></UpdateAnnonce></Privateroute>}></Route>
        </Route>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/signup_c' element={<SignUpClient></SignUpClient>}></Route>
        <Route path='/signup_v' element={<SignUpVendeur></SignUpVendeur>}></Route>
      </Routes>
      </AuthProvider>
      </BrowserRouter>     
      </div>
  );
}

export default App;
