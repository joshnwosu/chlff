import './CustomButton.css';

interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'green' | 'red';
  size?: 'default' | 'small' | 'large';
}

const CustomButton: React.FC<ICustomButton> = ({
  color = 'green',
  children,
  ...rest
}) => {
  return (
    <>
      <button
        className='custom-button'
        {...rest}
        style={{
          backgroundImage: `url(/assets/elements/${color}_button.png)`,
        }}
      >
        <span className='button-text'>{children}</span>
      </button>
    </>
  );
};
export default CustomButton;
