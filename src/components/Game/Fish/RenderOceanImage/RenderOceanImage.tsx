const RenderOceanImage = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }}
  >
    <img
      src='assets/fish/background.jpg'
      alt='Backup Image'
      title='Your browser does not support the video tag'
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'cenetr',
      }}
    />
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'skyblue',
        position: 'absolute',
        opacity: 0.3,
        top: 0,
        left: 0,
        zIndex: 2,
      }}
    />
  </div>
);

export default RenderOceanImage;
