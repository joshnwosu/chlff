import './CustomButton.css';
interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CustomButton: React.FC<ICustomButton> = ({ children, ...rest }) => {
  return (
    <>
      <button className='custom-button' {...rest}>
        <span className='button-text'>{children}</span>
      </button>
    </>
  );
};
export default CustomButton;
