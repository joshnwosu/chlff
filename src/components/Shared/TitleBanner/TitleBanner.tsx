interface Props {
  title: string;
}

export default function TitleBanner({ title }: Props) {
  return (
    <div
      style={{
        // backgroundColor: 'red',
        width: '100%',
        height: 80,
        position: 'absolute',
        top: -70,
        zIndex: 9999,
        left: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src='/assets/elements/assessment_game_header.png'
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 0,
          }}
        />
        <h1
          style={{
            position: 'relative',
            zIndex: 1,
            // color: '#F58F0E',

            fontSize: '30px',
            fontFamily: "'Sigmar One', 'Courier New', Courier, monospace",
            color: '#fdc915',
            marginTop: '10px',
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
