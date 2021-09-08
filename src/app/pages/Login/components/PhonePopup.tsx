import { memo, useState } from 'react';
import tw from 'twin.macro';
import { Button, LoginForm } from './LoginPopup';
import x from '../../../assets/images/icons/x.svg';
export const ButtonWrapper = tw.button`flex items-center text-white justify-center w-full mr-1 rounded-3xl px-4 border-2 `;
const PhonePopup = ({ onClosePhone }) => {
  const [phone, setPhone] = useState('');
  const onChange = e => {
    setPhone(e.target.value);
  };
  return (
    <LoginForm className="login__form lg:w-96 md:w-96 w-screen">
      <span
        className="absolute top-4 right-4 w-5 rotate-0 hover:rotate-45"
        onClick={onClosePhone}
      >
        <img alt="cancel" src={x} className="w-full" />
      </span>
      <input
        value={phone}
        onChange={onChange}
        className="rounded-2xl w-full px-2 py-2 outline-none border-black border-solid border-2 text-2xl"
      />
      <ButtonWrapper
        className={`mt-4 ${!phone ? 'bg-disabled' : 'bg-primary'}`}
      >
        <Button disabled={!!phone}>Continue</Button>
      </ButtonWrapper>
    </LoginForm>
  );
};

export default memo(PhonePopup);
