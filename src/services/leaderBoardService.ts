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
  year: number;
  level: number;
}

export const getLeaderBoardService = async (
  year: number
): Promise<LeaderBoardEntry[]> => {
  try {
    const leaderboardRef = collection(db, 'users');
    const q = query(leaderboardRef, where('year', '==', year));
    const querySnapshot = await getDocs(q);

    const leaderboard: LeaderBoardEntry[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      leaderboard.push({
        uid: docSnap.id,
        displayName: data.displayName,
        totalTimePlayed: data.totalTimePlayed,
        totalSuccessfulMissions: data.totalSuccessfulMissions,
        year: data.year,
        level: data.level,
      });
    });

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
