import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Registrar from './javascript/Registrar';
import Login from './javascript/Login';
import Index from './javascript/Principal';
import Ejemplo from './javascript/Ejemplo';
import CambiarContrasenia from './javascript/CambiarContrasenia';
import Reset from './javascript/Reset';
import CrearNotsicia from './javascript/CrearNoticia';
import Plantilla from './javascript/NoticiaPlantilla';
import PanelAdmin from './javascript/PanelAdmin';
import LogNoticias from './javascript/LogNoticias';
import PerfilPlantilla from './javascript/PerfilPlantilla';



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

        <Route path='/crearnoticia' element = {<CrearNotsicia/>}/>
        
        
        <Route path='/noticia/:id_noticia' element={<Plantilla/>}/>
        

        <Route path='/admin/' element={<PanelAdmin/>}/>

        <Route path='/log' element={<LogNoticias/>}/>  \


        <Route path='/perfil/:id_usuario' element={<PerfilPlantilla/>}/> 
    
      </Routes>

    </BrowserRouter>
  );
}

export default App;
