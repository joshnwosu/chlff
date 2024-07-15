import './CustomButton.css';
interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonIcon: React.FC<ICustomButton> = ({ children, ...rest }) => {
  return (
    <button className='button-icon' role='button' {...rest}>
      {children}
    </button>
  );
};
export default ButtonIcon;
