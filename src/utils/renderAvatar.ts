const imagePath = '/assets/showroom/avatar';

export const renderAvatar = (
  gender: string,
  skin: string,
  character: string
): string => {
  // Determine the prefix based on gender and skin
  let prefix = '';
  if (gender === 'boy') {
    prefix = skin === 'black' ? 'bb' : 'wb'; // bb = black boy, wb = white boy
  } else if (gender === 'girl') {
    prefix = skin === 'black' ? 'bg' : 'wg'; // bg = black girl, wg = white girl
  }

  // Combine the prefix with the character name
  return `${imagePath}/${character?.toLowerCase()}-${prefix}.jpg`;
};
