import { useAppSelector } from '../../../../app/hooks';

interface Props {
  useBG?: boolean;
}

const RenderOceanImage = ({ useBG = false }: Props) => {
  const { gameMode } = useAppSelector((state) => state.game);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        position: 'absolute',
      }}
    >
      <img
        src={
          useBG
            ? 'assets/fish/background1.png'
            : gameMode?.mode.image || 'assets/fish/background1.png'
        }
        alt='Backup Image'
        title='Your browser does not support the video tag'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'cenetr',
        }}
      />
      {true && (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'skyblue',
            position: 'absolute',
            opacity: 0.2,
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
};

export default RenderOceanImage;
