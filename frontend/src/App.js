import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
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



import kon from './imagenes/1_.mp4';
import './css/Pagina-error.css'
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
        <Route path='/admin/' element={<PanelAdmin />} />
        <Route path='/log' element={<LogNoticias />} />
        <Route path='/perfil/:id_usuario' element={<PerfilPlantilla />} />
        <Route path='/Log/Usuarios' element={<LogUsuarios />} />
        <Route path='/nosotros' element={<SobreNosotros />} />
      </Routes>



      <div className="error-page">
        <div className="error-card">

          <div className="error-header">
            <h1 className="error-title">Error, oh Dios, sálvanos…</h1>
            <span className="error-glitch">404</span>
          </div>

          <div className="error-message">
            <h2>
              Hubo un error al cargar la página.
              <br />
              ¿Por qué no ves un episodio de <span>K-ON!</span> mientras tanto?
            </h2>
          </div>

          <div className="video-container">
            <div className="video-frame">
              <video src={kon} controls />
            </div>
          </div>

          <div className="error-footer">
            <p>
              O si eres amargado…
              <Link to="/" className="error-link"> volver al inicio</Link>
            </p>
          </div>

        </div>
      </div>



    </BrowserRouter>

 

  );
}

export default App;
