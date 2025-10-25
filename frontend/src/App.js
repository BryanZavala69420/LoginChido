import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Registrar from './javascript/Registrar';
import Login from './javascript/Login';
import Index from './javascript/Principal';
import Ejemplo from './javascript/Ejemplo';
import CambiarContrasenia from './javascript/CambiarContrasenia';
import Reset from './javascript/Reset';



function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/registrar' element={<Registrar />} />
        <Route path='/sesion' element={<Login />}/>
        <Route path='/ejemplo' element={<Ejemplo/>}/>
        <Route path='/cambiar' element={<CambiarContrasenia/>}/>
        <Route path='/reset' element = {<Reset/>}/>



      </Routes>

    </BrowserRouter>
  );
}

export default App;
