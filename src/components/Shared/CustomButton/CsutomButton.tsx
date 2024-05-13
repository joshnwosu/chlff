import './CustomButton.css';
interface ICustomButton {
  children: any;
}

const CustomButton: React.FC<ICustomButton> = ({ children }) => {
  return (
    <button className='button-82-pushable' role='button'>
      <span className='button-82-shadow'></span>
      <span className='button-82-edge'></span>
      <span className='button-82-front text'>{children}</span>
    </button>
  );
};
export default CustomButton;
