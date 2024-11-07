import classes from './ElementWrapper.module.css';

interface ElementWrapperProps {
  title?: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export default function ElementWrapper({
  title,
  width = 400,
  height,
  children,
}: ElementWrapperProps) {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className={classes.elementWrapper}
    >
      {title && <h1 className={classes.title}>{title}</h1>}
      <img
        src='/assets/elements/content-element2.png'
        className={classes.image}
      />
      <div className={classes.children}>{children}</div>
    </div>
  );
}
