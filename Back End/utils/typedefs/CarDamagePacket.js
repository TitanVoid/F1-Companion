/**
 * @typedef {Object} CarDamagePacket
 * @property {import('./Header')} header
 * @property {CarDamageData[]} carDamageData
 */

/**
 * @typedef {Object} CarDamageData
 * @property {Number[]} tyresWear - Tyre wear (percentage)
 * @property {Number[]} tyresDamage - Tyre damage (percentage)
 * @property {Number[]} brakesDamage - Brake damage (percentage)
 * @property {Number} frontLeftWingDamage - Front left wing damage (percentage)
 * @property {Number} frontRightWingDamage - Front right wing damage (percentage)
 * @property {Number} rearWingDamage - Rear wing damage (percentage)
 * @property {Number} floorDamage - Floor damage (percentage)
 * @property {Number} diffuserDamage - Diffuser damage (percentage)
 * @property {Number} sidepodDamage - Sidepod damage (percentage)
 * @property {Number} drsFault - Indicator for DRS fault, 0 = OK, 1 = fault
 * @property {Number} ersFault - Indicator for ERS fault, 0 = OK, 1 = fault
 * @property {Number} gearBoxDamage - Gear box damage (percentage)
 * @property {Number} engineDamage - Engine damage (percentage)
 * @property {Number} engineMGUHWear - Engine wear MGU-H (percentage)
 * @property {Number} engineESWear - Engine wear ES (percentage)
 * @property {Number} engineCEWear - Engine wear CE (percentage)
 * @property {Number} engineICEWear - Engine wear ICE (percentage)
 * @property {Number} engineMGUKWear - Engine wear MGU-K (percentage)
 * @property {Number} engineTCWear - Engine wear TC (percentage)
 * @property {Number} engineBlown - Indicator for engine blow, 0 = OK, 1 = fault
 * @property {Number} engineSeized - Indicator for engine seize, 0 = OK, 1 = fault
 */

module.exports = CarDamagePacket