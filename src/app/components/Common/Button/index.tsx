import tw from 'twin.macro';

const CustomButton = ({ onClick, width, height, content }) => {
  return (
    <button className="" onClick={onClick}>
      {content}
    </button>
  );
};

export default CustomButton;
