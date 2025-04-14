export interface Item {
  id: number;
  name: string;
  image: string;
}

export interface Character {
  name: string;
  boy: {
    blackSkin: string;
    whiteSkin: string;
  };
  girl: {
    blackSkin: string;
    whiteSkin: string;
  };
  items: Item[];
  vehicle: string;
}

export const characters: Character[] = [
  {
    name: 'Police',
    boy: { blackSkin: 'police-bb.jpg', whiteSkin: 'police-wb.jpg' },
    girl: { blackSkin: 'police-bg.jpg', whiteSkin: 'police-wg.jpg' },
    items: [
      { id: 1, name: 'Badge', image: 'police/props/1.png' },
      { id: 2, name: 'Hat', image: 'police/props/2.png' },
      { id: 3, name: 'Hat', image: 'police/props/3.png' },
      { id: 4, name: 'Hat', image: 'police/props/4.png' },
      { id: 5, name: 'Hat', image: 'police/props/5.png' },
      { id: 6, name: 'Hat', image: 'police/props/6.png' },
      { id: 7, name: 'Hat', image: 'police/props/7.png' },
      { id: 8, name: 'Hat', image: 'police/props/8.png' },
    ],
    vehicle: 'police-car.jpg',
  },
  {
    name: 'Doctor',
    boy: { blackSkin: 'doctor-bb.jpg', whiteSkin: 'doctor-wb.jpg' },
    girl: { blackSkin: 'doctor-bg.jpg', whiteSkin: 'doctor-wg.jpg' },
    items: [
      { id: 1, name: 'Badge', image: 'doctor/props/1.png' },
      { id: 2, name: 'Hat', image: 'doctor/props/2.png' },
      { id: 3, name: 'Hat', image: 'doctor/props/3.png' },
      { id: 4, name: 'Hat', image: 'doctor/props/4.png' },
      { id: 5, name: 'Hat', image: 'doctor/props/5.png' },
      { id: 6, name: 'Hat', image: 'doctor/props/6.png' },
      { id: 7, name: 'Hat', image: 'doctor/props/7.png' },
      { id: 8, name: 'Hat', image: 'doctor/props/8.png' },
      { id: 9, name: 'Hat', image: 'doctor/props/9.png' },
      { id: 10, name: 'Hat', image: 'doctor/props/10.png' },
    ],
    vehicle: 'ambulance.jpg',
  },
  {
    name: 'Engineer',
    boy: { blackSkin: 'engineer-bb.jpg', whiteSkin: 'engineer-wb.jpg' },
    girl: { blackSkin: 'engineer-bg.jpg', whiteSkin: 'engineer-wg.jpg' },
    items: [
      { id: 1, name: 'Badge', image: 'engineer/props/1.png' },
      { id: 2, name: 'Hat', image: 'engineer/props/2.png' },
      { id: 3, name: 'Hat', image: 'engineer/props/3.png' },
      { id: 4, name: 'Hat', image: 'engineer/props/4.png' },
      { id: 5, name: 'Hat', image: 'engineer/props/5.png' },
      { id: 6, name: 'Hat', image: 'engineer/props/6.png' },
      { id: 7, name: 'Hat', image: 'engineer/props/7.png' },
      { id: 8, name: 'Hat', image: 'engineer/props/8.png' },
      { id: 9, name: 'Hat', image: 'engineer/props/9.png' },
      { id: 10, name: 'Hat', image: 'engineer/props/10.png' },
    ],
    vehicle: 'engineering-truck.jpg',
  },
  {
    name: 'Scientist',
    boy: { blackSkin: 'scientist-bb.jpg', whiteSkin: 'scientist-wb.jpg' },
    girl: { blackSkin: 'scientist-bg.jpg', whiteSkin: 'scientist-wg.jpg' },
    items: [
      { id: 1, name: 'Badge', image: 'scientist/props/1.png' },
      { id: 2, name: 'Hat', image: 'scientist/props/2.png' },
      { id: 3, name: 'Hat', image: 'scientist/props/3.png' },
      { id: 4, name: 'Hat', image: 'scientist/props/4.png' },
      { id: 5, name: 'Hat', image: 'scientist/props/5.png' },
      { id: 6, name: 'Hat', image: 'scientist/props/6.png' },
      { id: 7, name: 'Hat', image: 'scientist/props/7.png' },
      { id: 8, name: 'Hat', image: 'scientist/props/8.png' },
      { id: 9, name: 'Hat', image: 'scientist/props/9.png' },
      { id: 10, name: 'Hat', image: 'scientist/props/10.png' },
    ],
    vehicle: 'research-van.jpg',
  },
  {
    name: 'Firefighter',
    boy: { blackSkin: 'firefighter-bb.jpg', whiteSkin: 'firefighter-wb.jpg' },
    girl: {
      blackSkin: 'firefighter-bg.jpg',
      whiteSkin: 'firefighter-wg.jpg',
    },
    items: [
      {
        id: 1,
        name: 'Badge',
        image: 'firefighter/props/1.png',
      },
      { id: 2, name: 'Hat', image: 'firefighter/props/2.png' },
      { id: 3, name: 'Hat', image: 'firefighter/props/3.png' },
      { id: 4, name: 'Hat', image: 'firefighter/props/4.png' },
      { id: 5, name: 'Hat', image: 'firefighter/props/5.png' },
      { id: 6, name: 'Hat', image: 'firefighter/props/6.png' },
      { id: 7, name: 'Hat', image: 'firefighter/props/7.png' },
      { id: 8, name: 'Hat', image: 'firefighter/props/8.png' },
      { id: 9, name: 'Hat', image: 'firefighter/props/9.png' },
      {
        id: 10,
        name: 'Hat',
        image: 'firefighter/props/10.png',
      },
    ],
    vehicle: 'fire-truck.jpg',
  },
];
