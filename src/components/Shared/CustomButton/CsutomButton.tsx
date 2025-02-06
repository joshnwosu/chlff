import classes from './CustomButton.module.css';

interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'green' | 'red';
  size?: 'default' | 'small' | 'large';
}

const CustomButton: React.FC<ICustomButton> = ({
  color = 'green',
  size = 'default',
  children,
  ...rest
}) => {
  return (
    <>
      <button
        className={classes['custom-button']}
        {...rest}
        style={{
          transform:
            size === 'small'
              ? 'scale(0.7)'
              : size === 'large'
              ? 'scale(1.2)'
              : 'scale(1)',
        }}
      >
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
