/**
 * @typedef {Object} CarSetupPacket
 * @property {import('./Header')} header
 * @property {CarSetupData[]} carSetups
 */

/**
 * @typedef {Object} CarSetupData
 * @property {Number} frontWing - Front wing aero
 * @property {Number} rearWing - Rear wing aero
 * @property {Number} onThrottle - Differential adjustment on throttle (percentage)
 * @property {Number} offThrottle - Differential adjustment off throttle (percentage)
 * @property {Number} frontCamber - Front camber angle (suspension geometry)
 * @property {Number} rearCamber - Rear camber angle (suspension geometry)
 * @property {Number} frontToe - Front toe angle (suspension geometry)
 * @property {Number} rearToe - Rear toe angle (suspension geometry)
 * @property {Number} frontSuspension - Front suspension
 * @property {Number} rearSuspension - Rear suspension
 * @property {Number} frontAntiRollBar - Front anti-roll bar
 * @property {Number} rearAntiRollBar - Rear anti-roll bar
 * @property {Number} frontSuspensionHeight - Front suspension height
 * @property {Number} rearSuspensionHeight - Rear suspension height
 * @property {Number} brakePressure - Brake pressure (percentage)
 * @property {Number} brakeBias - Brake bias (percentage)
 * @property {Number} rearLeftTyrePressure - Rear left tyre pressure (PSI)
 * @property {Number} rearRightTyrePressure - Rear right tyre pressure (PSI)
 * @property {Number} frontLeftTyrePressure - Front left tyre pressure (PSI)
 * @property {Number} frontRightTyrePressure - Front right tyre pressure (PSI)
 * @property {Number} ballast - Ballast
 * @property {Number} fuelLoad - Fuel load
 */

module.exports = CarSetupPacket