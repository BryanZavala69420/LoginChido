import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Registrar from './javascript/Registrar';
import Login from './javascript/Login';
import Index from './javascript/Principal';
import CambiarContrasenia from './javascript/CambiarContrasenia';
import Reset from './javascript/Reset';
import CrearNotsicia from './javascript/CrearNoticia';
import Plantilla from './javascript/NoticiaPlantilla';
import PanelAdmin from './javascript/PanelAdmin';
import LogNoticias from './javascript/LogNoticias';
import PerfilPlantilla from './javascript/PerfilPlantilla';
import LogUsuarios from './javascript/LogUsuarios';
import SobreNosotros from './javascript/SobreNosotros';
import Error404 from './javascript/Error404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/registrar' element={<Registrar />} />
        <Route path='/sesion' element={<Login />} />
        <Route path='/cambiar' element={<CambiarContrasenia />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/crearnoticia' element={<CrearNotsicia />} />
        <Route path='/noticia/:id_noticia' element={<Plantilla />} />
        <Route path='/admin' element={<PanelAdmin />} />
        <Route path='/log' element={<LogNoticias />} />
        <Route path='/perfil/:id_usuario' element={<PerfilPlantilla />} />
        <Route path='/Log/Usuarios' element={<LogUsuarios />} />
        <Route path='/nosotros' element={<SobreNosotros />} />

        <Route path="*" element={<Error404 />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
