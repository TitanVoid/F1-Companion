/**
 * @typedef {Object} ExtendedMotionPacket
 * @property {import('./Header')} header
 * @property {Number[]} suspensionPosition - Suspension position (array of four wheels: RL, RR, FL, FR)
 * @property {Number[]} suspensionVelocity - Suspension velocity (array of four wheels: RL, RR, FL, FR)
 * @property {Number[]} suspensionAcceleration - Suspension acceleration (array of four wheels: RL, RR, FL, FR)
 * @property {Number[]} wheelSpeed - Wheel speed (array of four wheels: RL, RR, FL, FR)
 * @property {Number[]} wheelSlipRatio - Wheel slip (array of four wheels: RL, RR, FL, FR)
 * @property {Number[]} wheelSlipAngle - Wheel slip angle (array of four wheels: RL, RR, FL, FR)
 * @property {Number[]} wheelLatForce - Lateral force (array of four wheels: RL, RR, FL, FR)
 * @property {Number[]} wheelLongForce - Longitudinal force (array of four wheels: RL, RR, FL, FR)
 * @property {Number} heighOfCOGAboveGround - Height of center of gravity above ground
 * @property {Number} localVelocityX - Velocity in local space - metres/s
 * @property {Number} localVelocityY - Velocity in local space - metres/s
 * @property {Number} localVelocityZ - Velocity in local space - metres/s
 * @property {Number} angularVelocityX - Angular velocity x-component - radians/s
 * @property {Number} angularVelocityY - Angular velocity y-component - radians/s
 * @property {Number} angularVelocityZ - Angular velocity z-component - radians/s
 * @property {Number} angularAccelerationX - Angular acceleration x-component - radians/s^2
 * @property {Number} angularAccelerationY - Angular acceleration y-component - radians/s^2
 * @property {Number} angularAccelerationZ - Angular acceleration z-component - radians/s^2
 * @property {Number} frontWheelsAngle - Front wheels angle in radians
 * @property {Number[]} wheelVertForce - Vertical load on wheels (array of four wheels: RL, RR, FL, FR)
 */

module.exports = ExtendedMotionPacket