/**
 * @typedef {Object} FinalClassificationPacket
 * @property {import('./Header')} header
 * @property {Number} numberOfCars - Number of cars in the final classification
 * @property {FinalClassificationData[]} finalClassification
 */

/**
 * @typedef {Object} FinalClassificationData
 * @property {Number} position - Finishing position
 * @property {Number} numLaps - Number of laps completed
 * @property {Number} gridPosition - Grid position of the car
 * @property {Number} points - Number of points scored
 * @property {Number} numPitStops - Number of pit stops made
 * @property {Number} resultStatus - Result status - 0 = invalid, 1 = inactive, 2 = active, 3 = finished, 4 = didnotfinish, 5 = disqualified, 6 = notclassified, 7 = retired
 * @property {Number} bestLapTimeInMS - Best lap time of the session in milliseconds
 * @property {Number} totalRaceTime - Total race time in seconds without penalties
 * @property {Number} penaltiesTime - Total penalties accumulated in seconds
 * @property {Number} numPenalties - Number of penalties applied to this driver
 * @property {Number} numTyreStints - Number of tyres stints up to maximum
 * @property {Number[]} tyreStintsActual - Actual tyres used by this driver
 * @property {Number[]} tyreStintsVisual - Visual tyres used by this driver
 * @property {Number[]} tyreStintsEndLaps - End laps of the tyres stints
 */

module.exports = FinalClassificationPacket