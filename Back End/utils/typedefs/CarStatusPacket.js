/**
 * @typedef {Object} CarStatusPacket
 * @property {import('./Header')} header
 * @property {CarStatusData[]} carStatus
 */

/**
 * @typedef {Object} CarStatusData
 * @property {Number} tractionControl - Traction control - 0 = off, 1 = medium, 2 = full
 * @property {Number} antiLockBrakes - Anti-lock brakes - 0 = off, 1 = on
 * @property {Number} fuelMix - Fuel mix - fuel mix - 0 = lean, 1 = standard, 2 = rich, 3 = max
 * @property {Number} frontBrakeBias - Front brake bias (percentage)
 * @property {Number} pitLimiterStatus - Pit limiter status - 0 = off, 1 = on
 * @property {Number} fuelInTank - Current fuel mass
 * @property {Number} fuelCapacity - Fuel capacity
 * @property {Number} fuelRemainingLaps - Fuel remaining in terms of laps (value on MFD)
 * @property {Number} maxRPM - Cars max RPM, point of rev limiter
 * @property {Number} idleRPM - Cars idle RPM
 * @property {Number} maxGears - Maximum number of gears
 * @property {Number} drsAllowed - 0 = not allowed, 1 = allowed
 * @property {Number} drsActivationDistance - 0 = DRS not available, non-zero - DRS will be available in [X] metres
 * @property {Number} actualTyreCompound - F1 Modern - 16 = C5, 17 = C4, 18 = C3, 19 = C2, 20 = C1, 21 = C0, 7 = inter, 8 = wet, F1 Classic - 9 = dry, 10 = wet, F2 – 11 = super soft, 12 = soft, 13 = medium, 14 = hard, 15 = wet
 * @property {Number} visualTyreCompound - F1 visual (can be different from actual compound), 16 = soft, 17 = medium, 18 = hard, 7 = inter, 8 = wet, F1 Classic – same as above, F2 ‘19, 15 = wet, 19 – super soft, 20 = soft, 21 = medium , 22 = hard
 * @property {Number} tyresAgeLaps - Age in laps of the current set of tyres
 * @property {Number} vehicleFIAFlags - -1 = invalid/unknown, 0 = none, 1 = green, 2 = blue, 3 = yellow, 4 = red
 * @property {Number} enginePowerICE - Engine power output of ICE (W)
 * @property {Number} enginePowerMGUK - Engine power output of MGU-K (W)
 * @property {Number} ersStoreEnergy - ERS energy store in Joules
 * @property {Number} ersDeployMode - ERS deployment mode, 0 = none, 1 = medium, 2 = hotlap, 3 = overtake
 * @property {Number} ersHarvestedThisLapMGUK - ERS energy harvested this lap by MGU-K
 * @property {Number} ersHarvestedThisLapMGUH - ERS energy harvested this lap by MGU-H
 * @property {Number} ersDeployedThisLap - ERS energy deployed this lap
 * @property {Number} networkPaused - Whether the car is paused in a network game
 */ 

module.exports = CarStatusPacket