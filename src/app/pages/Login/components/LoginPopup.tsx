import { memo, useState } from 'react';
import tw from 'twin.macro';
import facebook from '../../../assets/images/icons/facebook.svg';
import phone from '../../../assets/images/icons/phone.svg';
import x from '../../../assets/images/icons/x.svg';
import LoginFacebook from './LoginFacebook';
import PhonePopup from './PhonePopup';

export const Button = tw.button`px-10 py-4 font-bold text-xs w-full whitespace-nowrap overflow-auto`;
export const ButtonWrapper = tw.button`flex items-center justify-center w-full bg-white mr-1 rounded-3xl px-4 border-2`;
export const LoginForm = tw.div`max-w-full flex items-center justify-center flex-col lg:h-96 md:h-96 h-screen bg-white px-5 lg:rounded-3xl md:rounded-3xl`;
export const LoginFormWrapper = tw.div`fixed z-50 bg-gray-900 bg-origin-content h-screen w-screen bg-opacity-50 flex items-center justify-center flex-col w-full`;
const LoginPopup = ({ display, onOpen, onClose }) => {
  const [isOpenPhone, setIsOpenPhone] = useState(false);

  const onOpenPhone = () => setIsOpenPhone(true);
  const onClosePhone = () => setIsOpenPhone(false);
  // const onOpenFacebook = () => setIsOpenFacebook(true);
  // const onCloseFacebook = () => setIsOpenFacebook(false);

  return (
    // <div className="">
    <LoginFormWrapper
      className={`${display ? 'show ' : ''}login-popup__wrapper`}
    >
      {isOpenPhone ? (
        <PhonePopup onClosePhone={onClosePhone} />
      ) : (
        <LoginForm className="login__form ">
          <span
            className="absolute top-4 right-4 w-5 rotate-0 hover:rotate-45"
            onClick={onClose}
          >
            <img alt="cancel" src={x} className="w-full" />
          </span>
          <ButtonWrapper>
            <span className="w-6">
              <img alt="facebook-icon" src={facebook} className="w-full" />
            </span>
            <LoginFacebook />
          </ButtonWrapper>
          <ButtonWrapper className="mt-4">
            <span className="w-6">
              <img alt="facebook-icon" src={phone} className="w-full" />
            </span>
            <Button onClick={onOpenPhone}>LOG IN WITH PHONE NUMBER</Button>
          </ButtonWrapper>
        </LoginForm>
      )}
    </LoginFormWrapper>
    // </div>
  );
};

export default memo(LoginPopup);
