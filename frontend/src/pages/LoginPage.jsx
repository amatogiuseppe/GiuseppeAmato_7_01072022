import React from 'react';
import Login from '../components/Login';
import logo from '../assets/logo.png';

function LoginPage() {
  return (
    <div className='login-page'>

      {/* Header */}
      <header className='login-page__header'>
        <img className='login-page__header__logo' src={logo} alt="Groupomania logo" />
        <h1 className='login-page__header__title'>Connectez-vous pour partager et rester en contact avec vos collègues de Groupomania.</h1>
      </header>

      {/* Main */}
      <main className='login-page__main'>
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;