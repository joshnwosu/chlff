import classes from './CustomButton.module.css';

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
      <button className={classes['custom-button']} {...rest}>
        <span
          className={classes.buttonText}
          style={{
            WebkitTextStroke: color === 'green' ? '1px darkgreen' : '1px brown',
          }}
        >
          {children}
        </span>
        <img
          src={`/assets/elements/${color}_button.png`}
          className={classes.customBtnImage}
        />
      </button>
    </>
  );
};
export default CustomButton;
