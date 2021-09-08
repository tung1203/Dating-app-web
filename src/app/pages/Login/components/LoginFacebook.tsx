import { memo, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Button } from './LoginPopup';

const LoginFacebook = () => {
  const [isOpenFacebook, setIsOpenFacebook] = useState(false);
  const [dataFacebook, setDataFacebook] = useState(false);
  const [avatarFacebook, setAvatarFacebook] = useState('');
  const responseFacebook = response => {
    // console.log(response);
    setDataFacebook(response);
    console.log(response, 'data');
    setAvatarFacebook(response?.picture?.data?.url);
    console.log(response?.picture?.data?.url, 'avatar');
    if (response.accessToken) {
      setIsOpenFacebook(false);
    } else {
      setIsOpenFacebook(true);
    }
  };
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      // autoLoad={true}
      fields="name,email,picture"
      scope="public_profile,user_friends"
      callback={responseFacebook}
      // icon="fa-facebook"
      render={renderProps => (
        <Button onClick={renderProps.onClick}>LOG IN WITH FACEBOOK</Button>
      )}
    />
  );
};
export default memo(LoginFacebook);
