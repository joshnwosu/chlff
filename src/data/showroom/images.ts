const imagePath = '/assets/showroom/avatar';

interface IProp {
  name: string;
  image: string;
  type?: string; // Optional: Add this if you want to categorize props
}

interface IAvatar {
  name: string;
  image: string;
  gender: 'male' | 'female';
  props: IProp[];
}

interface IAvatarConfig {
  imageMale: string;
  imageFemale: string;
  props: IProp[];
}

interface IAvatarConfigMap {
  [profession: string]: IAvatarConfig;
}

type Profession = 'doctor' | 'firefighter' | 'police'; // Add more professions as needed

const avatarConfig: IAvatarConfigMap = {
  doctor: {
    imageMale: `${imagePath}/doctor/male.png`,
    imageFemale: `${imagePath}/doctor/female.png`,
    props: [
      {
        name: 'Stethoscope',
        image: `${imagePath}/doctor/props/1.png`,
      },
      { name: 'Doctor Bag', image: `${imagePath}/doctor/props/2.png` },
      { name: 'Syringe', image: `${imagePath}/doctor/props/3.png` },
      { name: 'Syringe', image: `${imagePath}/doctor/props/4.png` },
      { name: 'Syringe', image: `${imagePath}/doctor/props/5.png` },
      { name: 'Syringe', image: `${imagePath}/doctor/props/6.png` },
      { name: 'Syringe', image: `${imagePath}/doctor/props/7.png` },
      { name: 'Syringe', image: `${imagePath}/doctor/props/8.png` },
      { name: 'Syringe', image: `${imagePath}/doctor/props/9.png` },
      { name: 'Syringe', image: `${imagePath}/doctor/props/10.png` },
    ],
  },
  police: {
    imageMale: `${imagePath}/police/male.png`,
    imageFemale: `${imagePath}/police/female.png`,
    props: [
      { name: 'Police Hat', image: `${imagePath}/police/props/1.png` },
      { name: 'Badge', image: `${imagePath}/police/props/2.png` },
      { name: 'Badge', image: `${imagePath}/police/props/3.png` },
      { name: 'Badge', image: `${imagePath}/police/props/4.png` },
      { name: 'Badge', image: `${imagePath}/police/props/5.png` },
      { name: 'Badge', image: `${imagePath}/police/props/6.png` },
      { name: 'Badge', image: `${imagePath}/police/props/7.png` },
      { name: 'Badge', image: `${imagePath}/police/props/8.png` },
    ],
  },
  firefighter: {
    imageMale: `${imagePath}/firefighter/male.png`,
    imageFemale: `${imagePath}/firefighter/female.png`,
    props: [
      {
        name: 'Fire Hose',
        image: `${imagePath}/firefighter/props/1.png`,
      },
      { name: 'Helmet', image: `${imagePath}/firefighter/props/2.png` },
      { name: 'Helmet', image: `${imagePath}/firefighter/props/3.png` },
      { name: 'Helmet', image: `${imagePath}/firefighter/props/4.png` },
      { name: 'Helmet', image: `${imagePath}/firefighter/props/5.png` },
      { name: 'Helmet', image: `${imagePath}/firefighter/props/6.png` },
      { name: 'Helmet', image: `${imagePath}/firefighter/props/7.png` },
      { name: 'Helmet', image: `${imagePath}/firefighter/props/8.png` },
      { name: 'Helmet', image: `${imagePath}/firefighter/props/9.png` },
      { name: 'Helmet', image: `${imagePath}/firefighter/props/10.png` },
    ],
  },
};

export const getAvatarsByGender = (gender: 'male' | 'female'): IAvatar[] => {
  return Object.keys(avatarConfig).map((profession) => {
    const config = avatarConfig[profession as Profession];
    const image = gender === 'male' ? config.imageMale : config.imageFemale;
    return {
      name: profession.charAt(0).toUpperCase() + profession.slice(1),
      image,
      gender,
      props: config.props,
    };
  });
};

export const getAvatarByProfessionAndGender = (
  profession: Profession,
  gender: 'male' | 'female'
): IAvatar | undefined => {
  const avatars = getAvatarsByGender(gender);
  return avatars.find(
    (avatar) => avatar.name.toLowerCase() === profession.toLowerCase()
  );
};
