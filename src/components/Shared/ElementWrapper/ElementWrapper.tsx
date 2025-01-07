import classes from './ElementWrapper.module.css';

interface ElementWrapperProps {
  title?: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
  padding?: number;
  backgroundImage?: string;
}

export default function ElementWrapper({
  title,
  width = 400,
  height = 400,
  padding = 50,
  backgroundImage = '/assets/elements/content-element2.png',
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
      {title && backgroundImage && <h1 className={classes.title}>{title}</h1>}
      <img src={backgroundImage} className={classes.image} />
      <div
        className={classes.children}
        style={{
          padding: padding,
        }}
      >
        {children}
      </div>
    </div>
  );
}
