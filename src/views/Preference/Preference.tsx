import classes from './Preference.module.css';
import React, { useState } from 'react';

type Gender = 'male' | 'female';
type SkinColor = 'light' | 'medium' | 'dark';

const Preference: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedSkinColor, setSelectedSkinColor] = useState<SkinColor | null>(
    null
  );

  const avatars = {
    male: ['firefighter', 'police', 'doctor'],
    female: ['firefighter', 'police', 'doctor'],
  };

  const skinColors: SkinColor[] = ['light', 'medium', 'dark'];

  const imagePath = 'assets/showroom/avatar';

  const handleGenderSelection = (gender: Gender) => {
    setSelectedGender(gender);
    setSelectedAvatar(null);
    setSelectedSkinColor(null);
  };

  const handleAvatarSelection = (avatar: string) => {
    setSelectedAvatar(avatar);
    setSelectedSkinColor(null);
  };

  const handleSkinColorSelection = (color: SkinColor) => {
    setSelectedSkinColor(color);
  };

  return (
    <div className={classes.container}>
      {/* Step 1: Select Gender */}
      {!selectedGender && (
        <div>
          <h2>Select Gender</h2>
          <button onClick={() => handleGenderSelection('male')}>Male</button>
          <button onClick={() => handleGenderSelection('female')}>
            Female
          </button>
        </div>
      )}

      {/* Step 2: Select Avatar */}
      {selectedGender && !selectedAvatar && (
        <div>
          <h2>Select {selectedGender === 'male' ? 'Male' : 'Female'} Avatar</h2>
          {avatars[selectedGender].map((avatar) => (
            <div
              key={avatar}
              onClick={() => handleAvatarSelection(avatar)}
              style={{
                display: 'inline-block',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              <img
                src={`${imagePath}/${avatar.toLowerCase()}-${selectedGender}.png`}
                alt={avatar}
                style={{ width: '100px', height: '100px' }}
              />
              <p>{avatar}</p>
            </div>
          ))}
        </div>
      )}

      {/* Step 3: Select Skin Color */}
      {selectedAvatar && !selectedSkinColor && (
        <div>
          <h2>Select Skin Color</h2>
          <p>
            {selectedAvatar.toLowerCase()}-{selectedGender}
          </p>
          {skinColors.map((color) => (
            <div
              key={color}
              onClick={() => handleSkinColorSelection(color)}
              style={{
                display: 'inline-block',
                margin: '10px',
                cursor: 'pointer',
              }}
            >
              <img
                src={`${imagePath}/${selectedAvatar.toLowerCase()}-${selectedGender}-${color}.png`}
                alt={`${selectedAvatar} ${color}`}
                style={{ width: '100px', height: '100px' }}
              />
              <p>{color.charAt(0).toUpperCase() + color.slice(1)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Final Character Display */}
      {selectedGender && selectedAvatar && selectedSkinColor && (
        <div>
          <h3>Your Character:</h3>
          <img
            src={`/${selectedAvatar.toLowerCase()}-${selectedGender}-${selectedSkinColor}.png`}
            alt={`${selectedAvatar} (${selectedGender}, ${selectedSkinColor})`}
            style={{ width: '150px', height: '150px' }}
          />
          <p>{`${selectedAvatar} (${selectedGender}, ${selectedSkinColor})`}</p>
        </div>
      )}
    </div>
  );
};

export default Preference;
