/**
 * @typedef {Object} LapDataPacket
 * @property {import('./Header')} header
 * @property {CarLapData[]} carLapData - Lap data for all cars on track
 * @property {TimeTrial} timeTrial - Time trial lap data
 */

/**
 * @typedef {Object} CarLapData
 * @property {Number} lastLapTimeInMS - Last lap time in milliseconds
 * @property {Number} currentLapTimeInMS - Current lap time in milliseconds
 * @property {Number} sector1TimeInMS - Sector 1 time in milliseconds
 * @property {Number} sector2TimeInMS - Sector 2 time in milliseconds
 * @property {Number} lapDistance - Distance vehicle is around lap in meters - could be negative if line hasn't been crossed yet
 * @property {Number} totalDistance - Total distance travelled in meters - could be negative if line hasn't been crossed yet
 * @property {Number} safetyCarDelta - Delta in seconds for safety car
 * @property {Number} carPosition - Car race position
 * @property {Number} currentLapNum - Current lap number
 * @property {Number} pitStatus - Pit status - 0 = none, 1 = pitting, 2 = in pit area
 * @property {Number} numPitStops - Number of pit stops taken this race
 * @property {Number} sector - Current sector - 0 = sector1, 1 = sector2, 2 = sector3
 * @property {Number} currentLapInvalid - Current lap invalid - 0 = valid, 1 = invalid
 * @property {Number} penalties - Accumulated time penalties in seconds to be added
 * @property {Number} totalWarnings - Number of warnings - 0 = green, 1 = blue, 2 = yellow, 3 = red
 * @property {Number} numUnservedDriveThroughPenalties - Number of unserved drive through penalties
 * @property {Number} numUnservedStopAndGoPenalties - Number of unserved stop go penalties
 * @property {Number} gridPosition - Grid position the vehicle started the race in
 * @property {Number} driverStatus - Status of driver - 0 = in garage, 1 = flying lap, 2 = in lap, 3 = out lap, 4 = on track
 * @property {Number} resultStatus - Result status - 0 = invalid, 1 = inactive, 2 = active, 3 = finished, 4 = didnotfinish, 5 = disqualified, 6 = not classified, 7 = retired
 * @property {Number} pitLaneTimerActive - Pit lane timer active - 0 = inactive, 1 = active
 * @property {Number} pitLaneTimeInLaneInMS - Time vehicle has spent in pit lane in milliseconds
 * @property {Number} pitstopTimerInMS - Pit stop timer in milliseconds
 * @property {Number} pitstopShouldServePenalty - Should serve penalty - 0 = no, 1 = yes
 */

/**
 * @typedef {Object} TimeTrial
 * @property {Number} timeTrialPersonalBestCarIndex - Car index of personal best time trial
 * @property {Number} timeTrialRivalCarIndex - Car index of rival time trial
 */

module.exports = LapDataPacket