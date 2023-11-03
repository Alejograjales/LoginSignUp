import React, { useEffect, useState } from 'react'
import './LoginSignup.css'

import email_icon from '../Assets/email.png'
import id_icon from '../Assets/id.png'
import password_icon from '../Assets/password.png'
import user_icon from '../Assets/user.png'

const LoginSignup = () => {

    const [action,setAction] = useState('Registrarse');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [typecard] = useState ('');
    const [idcard, setIdCard] = useState ('');
    const [name, setName] = useState ('');
    const [surname, setSurname] = useState ('');

    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      setPasswordError('');

     if (action==='Registrarse') {
    // Validación de contraseña
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordPattern.test(newPassword)) {
      setPasswordError('La contraseña debe contener mínimo 8 caracteres alfanuméricos incluyendo mayúsculas.');
      }
     }
    };

    const handleEmailChange = (e) => {
      const newEmail = e.target.value;
      setEmail(newEmail);
      setEmailError('');
  
      // Validación del correo electrónico
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailPattern.test(newEmail)) {
        setEmailError('El correo electrónico ingresado no es válido.');
      }
    };
  
    const handleConfirmPasswordChange = (e) => {
      const newConfirmPassword = e.target.value;
      setConfirmPassword(newConfirmPassword);
      setPasswordError('');

    // Validación de confirmación de contraseña
    if (newConfirmPassword !== password) {
      setPasswordError('Las contraseñas no coinciden.');
     }
    };

    const submitForm = () => {
      // Lógica para enviar los datos al localhost:8000 para el inicio de sesión
      if (action === 'Iniciar Sesion') {
        fetch('http://localhost:8000/login', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((response) => {
            if (response.ok) {
              // Realizar acciones con la respuesta si es necesaria
              console.log(response);
            } else {
              throw new Error('Error al enviar los datos.');
            }
          })
          .catch((error) => {
            console.error('Error al enviar los datos:', error);
          });
      } else {
        // Lógica para enviar los datos al localhost:8000 para el registro
        fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            typecard: typecard,
            idcard: idcard,
            name: name,
            surname: surname,
          }),
        })
          .then((response) => {
            if (response.ok) {
              // Realizar acciones con la respuesta si es necesaria
              console.log(response);
            } else {
              throw new Error('Error al enviar los datos.');
            }
          })
          .catch((error) => {
            console.error('Error al enviar los datos:', error);
          });
      }
    };

    useEffect(() => {
      const generateStars = () => {
        const numStars = 300; // Cantidad de estrellas
  
        for (let i = 0; i < numStars; i++) {
          const star = document.createElement('div');
          star.classList.add('stars');
          star.style.top = Math.random() * 100 + 'vh'; // Posición vertical aleatoria
          star.style.left = Math.random() * 100 + 'vw'; // Posición horizontal aleatoria
          document.body.appendChild(star);
        }
      };
  
      generateStars(); // Llamada a la función para generar estrellas
  
      return () => {
        const stars = document.querySelectorAll('.stars');
        stars.forEach(star => star.remove());
      };
    }, []);

  return (

    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="submit-container">
            <div className={action==="Iniciar Sesion"?"submit gray":"submit"} onClick={()=>{setAction("Registrarse")}}>Registrarse</div>
            <div className={action==="Registrarse"?"submit gray":"submit"} onClick={()=>{setAction("Iniciar Sesion")}}>Iniciar Sesion</div>
        </div>
        <div className="inputs">
        {action === "Registrarse" ? (
          <div className="input">
            <img src={id_icon} alt='' />
            <input type="text" value={typecard} placeholder="Tipo de documento:" readOnly name='typecard'/>
            <select value={idcard} onChange={(e) => setIdCard(e.target.value)}>
              <option value="cedula">CC</option>
              <option value="extranjero">CE</option>
              <option value="nit">NIT</option>
              <option value="pasaporte">PA</option>
            </select>
          </div>
        ) : null}

           {action==="Iniciar Sesion" ? null : (
           <div className="input">
            <img src={id_icon} alt='' />
            <input type='text' value={idcard} onChange={(e) => setIdCard(e.target.value)} placeholder='Numero de documento' name='idcard' />
           </div>)}
           
           {action==="Iniciar Sesion" ? null : (
           <div className="input">
            <img src={user_icon} alt='' />
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Nombre' name='name' />
           </div>)}

           {action==="Iniciar Sesion" ? null : (
           <div className="input">
            <img src={user_icon} alt='' />
            <input type='text' value={surname} onChange={(e) => setSurname(e.target.value)} placeholder='Apellidos' name='surname' />
           </div>)}

           <div className="input">
            <img src={email_icon} alt='' />
            <input 
             type='email' 
             placeholder='Correo electronico'
             value={email}
             onChange={handleEmailChange}
             name='email'  />
           </div>
           <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            name='password'
          />
        </div>
        {action === "Registrarse" ? (
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              name='password_confirmation'
            />
          </div>
        ) : null}
          {passwordError && password.length > 0 && (<div className="error-message">{passwordError}</div>)}
          {emailError && email.length > 0 && (<div className="error-message">{emailError}</div>)}
        </div>
        {action==="Registrarse"?<div></div>: <div className="forgot-password">¿Olvidaste tu contraseña? <span>Haz click aqui</span></div>}
        <div className="button-container">
        <div className="submit" onClick={submitForm}>Enviar formulario</div>
        </div>
    </div>
  )
}

export default LoginSignup