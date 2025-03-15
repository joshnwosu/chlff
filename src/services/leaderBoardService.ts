import { db } from '../configs/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';

export interface LeaderBoardEntry {
  uid: string;
  displayName: string;
  totalTimePlayed: number;
  totalSuccessfulMissions: number;
  totalFailedMissions: number;
  year: number;
  level: number;
  character: string;
  gender: string;
  skin: string;
  fishGameInfo: {
    level: number;
    totalTimePlayed: number;
    totalSuccessfulMissions: number;
    totalFailedMissions: number;
  };
  carGameInfo: {
    level: number;
    totalTimePlayed: number;
    totalSuccessfulMissions: number;
    totalFailedMissions: number;
  };
}

export const getLeaderBoardService = async (
  year: number
): Promise<LeaderBoardEntry[]> => {
  try {
    const leaderboardRef = collection(db, 'users');
    const q = query(leaderboardRef, where('year', '==', year));
    const querySnapshot = await getDocs(q);

    const leaderboard: LeaderBoardEntry[] = [];

    // Default values for nested game info
    const defaultGameInfo = {
      level: 1, // Default level if missing
      totalTimePlayed: 0,
      totalSuccessfulMissions: 0,
      totalFailedMissions: 0,
    };

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();

      leaderboard.push({
        uid: docSnap.id,
        displayName: data.displayName,
        totalTimePlayed: data.totalTimePlayed ?? 0,
        totalSuccessfulMissions: data.totalSuccessfulMissions ?? 0,
        totalFailedMissions: data.totalFailedMissions ?? 0,
        year: data.year ?? 1,
        level: data.level ?? 1,
        character: data.character,
        gender: data.gender,
        skin: data.skin,
        fishGameInfo: data.fishGameInfo || defaultGameInfo,
        carGameInfo: data.carGameInfo || defaultGameInfo,
      });
    });

    // console.log('OMO NA HERE I DEY O: ', leaderboard);

    return leaderboard;
  } catch (error) {
    console.error('Error getting leaderboard: ', error);
    throw new Error('Unable to retrieve leaderboard');
  }
};

export const updateLeaderBoardService = async (
  uid: string,
  updatedData: Partial<LeaderBoardEntry>
) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, updatedData);
  } catch (error) {
    console.error('Error updating leaderboard: ', error);
    throw new Error('Unable to update leaderboard');
  }
};
