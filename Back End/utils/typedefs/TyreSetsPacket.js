/**
 * @typedef {Object} TyreSetsPacket
 * @property {import('./Header')} header - Header
 * @property {Number} carIndex - Index of the car this set of tyres is for
 * @property {TyreSetData[]} tyreSetData - Array of tyre sets, 20 sets: 13 dry, 7 wet
 * @property {Number} fittedIndex - Index of the tyre set last fitted to the car
 */

/**
 * @typedef {Object} TyreSetData
 * @property {Number} actualTyreCompound - Actual tyre compound
 * @property {Number} visualTyreCompound - Visual tyre compound
 * @property {Number} wear - Tyre wear (percentage)
 * @property {Number} available - Whether this set is available
 * @property {Number} recommendedSession - Recommended session to use this set
 * @property {Number} lifeSpan - Number of laps this set is expected to last
 * @property {Number} usableLife - Max number of laps this set can be used for (recommendation)
 * @property {Number} lapDeltaTime - Lap delta time in milliseconds compared to fitted set
 * @property {Number} fitted - Whether this set is currently fitted
 */

module.exports = TyreSetsPacket