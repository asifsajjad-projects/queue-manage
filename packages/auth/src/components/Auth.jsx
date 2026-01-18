import React, { useState } from 'react';

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleLogin = () => {
    window.location.href = '/auth/google';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <button onClick={handleGoogleLogin} style={{ width: '100%', padding: '10px', backgroundColor: '#4285f4', color: 'white', border: 'none', borderRadius: '5px' }}>
          {isLogin ? 'Login with Google' : 'Sign Up with Google'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', textAlign: 'center', marginTop: '10px' }}>
          {isLogin ? 'Need to sign up?' : 'Already have an account?'}
        </p>
      </div>
    </div>
  );
}

export default LoginSignup;