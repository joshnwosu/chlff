import './CustomButton.css';
interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton: React.FC<ICustomButton> = ({ children, ...rest }) => {
  return (
    <button className='button-82-pushable' role='button' {...rest}>
      <span className='button-82-shadow'></span>
      <span className='button-82-edge'></span>
      <p className='button-82-front text'>{children}</p>
    </button>
  );
};
export default CustomButton;
