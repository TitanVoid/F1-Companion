/**
 * @typedef {Object} MotionPacket
 * @property {import('./Header')} header - Header
 * @property {CarMotionData[]} carMotionData
 */

/**
 * @typedef {Object} CarMotionData
 * @property {Number} worldPositionX - World space X position
 * @property {Number} worldPositionY - World space Y position
 * @property {Number} worldPositionZ - World space Z position
 * @property {Number} worldVelocityX - Velocity in world space X
 * @property {Number} worldVelocityY - Velocity in world space Y
 * @property {Number} worldVelocityZ - Velocity in world space Z
 * @property {Number} worldForwardDirectionX - World space forward X direction (normalised)
 * @property {Number} worldForwardDirectionY - World space forward Y direction (normalised)
 * @property {Number} worldForwardDirectionZ - World space forward Z direction (normalised)
 * @property {Number} worldRightDirectionX - World space right X direction (normalised)
 * @property {Number} worldRightDirectionY - World space right Y direction (normalised)
 * @property {Number} worldRightDirectionZ - World space right Z direction (normalised)
 * @property {Number} gForceLateral - G-Force right
 * @property {Number} gForceLongitudinal - G-Force forward
 * @property {Number} gForceVertical - G-Force up
 * @property {Number} yawAngle - Yaw angle in radians
 * @property {Number} pitchAngle - Pitch angle in radians
 * @property {Number} rollAngle - Roll angle in radians
 * @property {SelfCarExtraData|null} selfCarExtraData - Extra car motion data
 */

/**
 * @typedef {Object} SelfCarExtraData
 * @property {Number[]} suspensionPosition - Suspension position RL, RR, FL, FR
 * @property {Number[]} suspensionVelocity - Suspension velocity RL, RR, FL, FR
 * @property {Number[]} suspensionAcceleration - Suspension acceleration RL, RR, FL, FR
 * @property {Number[]} wheelSpeed - Wheel speed RL, RR, FL, FR
 * @property {Number[]} wheelSlip - Wheel slip RL, RR, FL, FR
 * @property {Number} localVelocityX - Local velocity X
 * @property {Number} localVelocityY - Local velocity Y
 * @property {Number} localVelocityZ - Local velocity Z
 * @property {Number} angularVelocityX - Angular velocity X
 * @property {Number} angularVelocityY - Angular velocity Y
 * @property {Number} angularVelocityZ - Angular velocity Z
 * @property {Number} angularAccelerationX - Angular acceleration X
 * @property {Number} angularAccelerationY - Angular acceleration Y
 * @property {Number} angularAccelerationZ - Angular acceleration Z
 * @property {Number} frontWheelsAngle - Front wheels angle in radians
 */

module.exports = MotionPacket