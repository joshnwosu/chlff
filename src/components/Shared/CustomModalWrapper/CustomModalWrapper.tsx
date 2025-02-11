import classes from './CustomModalWrapper.module.css';

interface Props {
  children: React.ReactNode;
  title?: string;
}

interface TitleProps {
  children: string;
}

export const CustomModalTitle = ({ children }: TitleProps) => (
  <p
    style={{
      color: '#002575',
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 28,
      fontFamily: 'Sigmar One',
      // WebkitTextStroke: '1px black',
      textTransform: 'uppercase',
    }}
  >
    {children}
  </p>
);

export default function CustomModalWrapper({ children, title = '' }: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <CustomModalTitle>{title}</CustomModalTitle>
        {children}
      </div>
    </div>
  );
}
