import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Registrar from './javascript/Registrar';
import Login from './javascript/Login';
import Index from './javascript/Principal';
import Ejemplo from './javascript/Ejemplo';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/registrar' element={<Registrar />} />
        <Route path='/sesion' element={<Login />}/>
        <Route path='/ejemplo' element={<Ejemplo/>}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
