import './styles.css';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import LoginPopup from './components/LoginPopup';
const Login = () => {
  const [openPopup, setopenPopup] = useState(false);
  const onOpen = () => setopenPopup(true);
  const onClose = () => setopenPopup(false);

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Swipe to date" />
      </Helmet>
      <div className="select-none login-wrapper h-screen w-screen flex items-center bg-cover bg-center bg-no-repeat justify-center">
        <div className="bg-gray-900 bg-origin-content h-screen w-screen bg-opacity-50 flex items-center justify-center flex-col w-100 px-4">
          <div className="text-center">
            <h1 className="lg:text-9xl md:text-7xl italic sm:text-5xl text-4xl text-white mb-32 md:mb-32 lg:mb-10 lg:font-medium font-extrabold">
              Swipe to date
            </h1>
            <button className="max-w-xs bg-primary hover:bg-white hover:text-primary px-10 py-4 rounded-3xl text-white font-bold text-md w-full mr-1">
              CREATE ACCOUNT
            </button>
            <button
              onClick={onOpen}
              className="max-w-xs bg-white hover:bg-primary hover:text-white px-10 py-4 rounded-3xl text-primary font-bold text-md w-full mt-4 mr-1"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
      <LoginPopup display={openPopup} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default Login;
