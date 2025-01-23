import React, { useState } from 'react';

interface Character {
  name: string;
  blackSkin: string; // Image for black skin
  whiteSkin: string; // Image for white skin
}

// const characters: Character[] = [
//   { name: 'Police', blackSkin: 'bb_police.png', whiteSkin: 'wb_police.png' },
//   { name: 'Doctor', blackSkin: 'bb_doctor.png', whiteSkin: 'wb_doctor.png' },
//   { name: 'Engineer', blackSkin: 'bb_engineer.png', whiteSkin: 'wb_engineer.png' },
//   { name: 'Scientist', blackSkin: 'bb_scientist.png', whiteSkin: 'wb_scientist.png' },
//   { name: 'Firefighter', blackSkin: 'bb_firefighter.png', whiteSkin: 'wb_firefighter.png' },
// ];

const imagePath = '/assets/showroom/avatar';

const characters: Character[] = [
  { name: 'Police', blackSkin: 'police-bb.jpg', whiteSkin: 'police-wb.jpg' },
  { name: 'Doctor', blackSkin: 'doctor-bb.jpg', whiteSkin: 'doctor-wb.jpg' },
  {
    name: 'Engineer',
    blackSkin: 'engineer-bb.jpg',
    whiteSkin: 'engineer-wb.jpg',
  },
  {
    name: 'Scientist',
    blackSkin: 'scientist-bb.jpg',
    whiteSkin: 'scientist-wb.jpg',
  },
  {
    name: 'Firefighter',
    blackSkin: 'firefighter-bb.jpg',
    whiteSkin: 'firefighter-wb.jpg',
  },
];

const ShowRoomEdit: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    characters[0]
  );
  const [skinColor, setSkinColor] = useState<'black' | 'white'>('black');

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleSkinColorChange = (color: 'black' | 'white') => {
    setSkinColor(color);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: 700,
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {/* Left: Thumbnail List */}
        <div style={{ flex: 1 }}>
          {characters.map((character) => (
            <div
              key={character.name}
              style={{
                marginBottom: '10px',
                cursor: 'pointer',
                border:
                  selectedCharacter.name === character.name
                    ? '2px solid blue'
                    : 'none',
              }}
              onClick={() => handleCharacterSelect(character)}
            >
              <img
                src={`${imagePath}/${
                  skinColor === 'black'
                    ? character.blackSkin
                    : character.whiteSkin
                }`}
                alt={character.name}
                style={{ width: '80px', height: '80px', borderRadius: '8px' }}
              />
              <p>{character.name}</p>
            </div>
          ))}
        </div>

        {/* Middle: Selected Character Display */}
        <div style={{ flex: 2, textAlign: 'center' }}>
          <img
            src={`${imagePath}/${
              skinColor === 'black'
                ? selectedCharacter.blackSkin
                : selectedCharacter.whiteSkin
            }`}
            alt={selectedCharacter.name}
            style={{ width: '200px', height: '200px' }}
          />
          <h2>{selectedCharacter.name}</h2>
        </div>

        {/* Right: Skin Color Switcher */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h3>Skin Color</h3>
          <button
            onClick={() => handleSkinColorChange('black')}
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '10px 20px',
              margin: '10px',
              border:
                skinColor === 'black' ? '2px solid blue' : '1px solid gray',
              cursor: 'pointer',
            }}
          >
            Black
          </button>
          <button
            onClick={() => handleSkinColorChange('white')}
            style={{
              backgroundColor: 'white',
              color: 'black',
              padding: '10px 20px',
              margin: '10px',
              border:
                skinColor === 'white' ? '2px solid blue' : '1px solid gray',
              cursor: 'pointer',
            }}
          >
            White
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowRoomEdit;
