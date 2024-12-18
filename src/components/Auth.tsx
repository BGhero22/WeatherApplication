import React from 'react';
import { Button } from 'primereact/button';

const Auth: React.FC = () => {
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div>
      <Button
        label="Login with Google"
        icon="pi pi-google"
        onClick={loginWithGoogle}
        className="p-button-primary"
      />
    </div>
  );
};

export default Auth;
