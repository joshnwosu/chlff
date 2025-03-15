import { UserProfile } from '../services/userService';
import { formatTime } from './formatTime';

// // New utility function to calculate combined game stats
// export const calculateGameStats = (profile: UserProfile) => {
//   const { fishGameInfo, carGameInfo } = profile;

//   // Total time played for both games
//   const totalTimePlayed =
//     fishGameInfo.totalTimePlayed + carGameInfo.totalTimePlayed;

//   // Success rate calculations
//   const calculateSuccessRate = (success: number, failed: number): number => {
//     const totalMissions = success + failed;
//     return totalMissions === 0
//       ? 0
//       : Number(((success / totalMissions) * 100).toFixed(2));
//   };

//   // Individual game success rates
//   const fishSuccessRate = calculateSuccessRate(
//     fishGameInfo.totalSuccessfulMissions,
//     fishGameInfo.totalFailedMissions
//   );
//   const carSuccessRate = calculateSuccessRate(
//     carGameInfo.totalSuccessfulMissions,
//     carGameInfo.totalFailedMissions
//   );

//   // Combined success rate
//   const combinedSuccess =
//     fishGameInfo.totalSuccessfulMissions + carGameInfo.totalSuccessfulMissions;
//   const combinedFailed =
//     fishGameInfo.totalFailedMissions + carGameInfo.totalFailedMissions;
//   const combinedSuccessRate = calculateSuccessRate(
//     combinedSuccess,
//     combinedFailed
//   );

//   return {
//     totalTimePlayed, // In seconds
//     fishSuccessRate, // Percentage (e.g., 75.00)
//     carSuccessRate, // Percentage
//     combinedSuccessRate, // Percentage
//   };
// };

export const calculateCombinedGameStats = (profile: UserProfile) => {
  const { fishGameInfo, carGameInfo } = profile;

  // Combined total time played
  const totalTimePlayed =
    fishGameInfo.totalTimePlayed + carGameInfo.totalTimePlayed;

  // Combined mission stats
  const combinedSuccessfulMissions =
    fishGameInfo.totalSuccessfulMissions + carGameInfo.totalSuccessfulMissions;
  const combinedFailedMissions =
    fishGameInfo.totalFailedMissions + carGameInfo.totalFailedMissions;
  const totalMissions = combinedSuccessfulMissions + combinedFailedMissions;

  // Individual game mission stats (optional, if you want them too)
  const fishTotalMissions =
    fishGameInfo.totalSuccessfulMissions + fishGameInfo.totalFailedMissions;
  const carTotalMissions =
    carGameInfo.totalSuccessfulMissions + carGameInfo.totalFailedMissions;

  return {
    totalTimePlayed: `${formatTime(totalTimePlayed)}`, // In seconds
    combinedMissionFraction: `${combinedSuccessfulMissions}/${totalMissions}`, // e.g., "20/30"
    fishMissionFraction: `${fishGameInfo.totalSuccessfulMissions}/${fishTotalMissions}`, // e.g., "15/20"
    carMissionFraction: `${carGameInfo.totalSuccessfulMissions}/${carTotalMissions}`, // e.g., "5/10"
  };
};
