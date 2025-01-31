import classes from './CustomModalWrapper.module.css';

interface Props {
  children: JSX.Element;
}

export default function CustomModalWrapper({ children }: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
