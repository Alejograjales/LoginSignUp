import { useEffect } from 'react';
import './App.css';
import API from './components/API';
import LoginSignup from './components/LoginSignup/LoginSignup';

function App() {
  const http = API();

  useEffect(() => {
    async function getUsuario() {
      const csrf = await http.get('/sanctum/csrf-cookie')
      console.log('csrf =', csrf)
    }

    getUsuario();
  }, [])
  return (
    <div>
      <LoginSignup/>
    </div>
  );
}

export default App;
