/**
 * @typedef {Object} SessionHistoryPacket
 * @property {import('./Header')} header - Header
 * @property {Number} carIndex - Index of the car this lap data relates to
 * @property {Number} numLaps - Num laps in the data (including current partial lap)
 * @property {Number} numTyreStints - Number of tyre stints in the data
 * @property {Number} bestLapTimeLapNum - Lap the best lap time was set on
 * @property {Number} bestSector1LapNum - Lap the best Sector 1 time was set on
 * @property {Number} bestSector2LapNum - Lap the best Sector 2 time was set on
 * @property {Number} bestSector3LapNum - Lap the best Sector 3 time was set on
 * @property {LapHistoryData[]} lapHistoryData - Lap history data, max 100
 * @property {TyreStintHistoryData[]} tyreStintHistoryData - Tyre stint history data, max 8
 */

/**
 * @typedef {Object} LapHistoryData
 * @property {Number} lapTimeInMS - Lap time in milliseconds
 * @property {Number} sector1TimeInMS - Sector 1 time in milliseconds
 * @property {Number} sector1TimeMinutes - Sector 1 time in minutes
 * @property {Number} sector2TimeInMS - Sector 2 time in milliseconds
 * @property {Number} sector2TimeMinutes - Sector 2 time in minutes
 * @property {Number} sector3TimeInMS - Sector 3 time in milliseconds
 * @property {Number} sector3TimeMinutes - Sector 3 time in minutes
 * @property {Number} lapValidBitFlags - Bit flags specifying if the lap is valid - 0x01 bit set-lap valid, 0x02 bit set-sector 1 valid, 0x04 bit set-sector 2 valid, 0x08 bit set-sector 3 valid
 */

/**
 * @typedef {Object} TyreStintHistoryData
 * @property {Number} endLap - Lap the tyre stint ended on (255 of current tyre)
 * @property {Number} tyreActualCompound - Actual tyre compound
 * @property {Number} tyreVisualCompound - Visual tyre compound
 */

module.exports = SessionHistoryPacket