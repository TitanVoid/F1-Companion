/**
 * @typedef {Object} CarTelemetryPacket
 * @property {import('./Header')} header
 * @property {CarTelemetryData[]} carTelemetryData
 * @property {Number} mfdPanelIndex - Index of MFD panel in active 255 = MFD closed, Single player race – 0 = Car setup, 1 = Pits, 2 = Damage, 3 = Engine, 4 = Temperatures (May vary depending on game mode)
 * @property {Number} mfdPanelIndexSecondaryPlayer - Same as above, but for the second driver
 * @property {Number} suggestedGear - Suggested gear for the player (1-8), 0 if no gear suggested
 */

/**
 * @typedef {Object} CarTelemetryData
 * @property {Number} speed - Speed of car in kilometres per hour
 * @property {Number} throttle - Amount of throttle applied (0.0 to 1.0)
 * @property {Number} steer - Steering (-1.0 (full lock left) to 1.0 (full lock right))
 * @property {Number} brake - Amount of brake applied (0.0 to 1.0)
 * @property {Number} clutch - Amount of clutch applied (0 to 100)
 * @property {Number} gear - Gear selected (1-8, 0 = N, -1 = Reverse)
 * @property {Number} engineRPM - Engine RPM
 * @property {Number} drs - 0 = off, 1 = on
 * @property {Number} revLightsPercent - Rev lights indicator (percentage)
 * @property {Number} revLightsBitValue - bit 0 = leftmost LED, bit 1 = rightmost LED
 * @property {Number[]} brakesTemperature - Brakes temperature (celsius)
 * @property {Number[]} tyresSurfaceTemperature - Tyres surface temperature (celsius)
 * @property {Number} engineTemperature - Engine temperature (celsius)
 * @property {Number[]} tyresPressure - Tyres pressure (PSI)
 * @property {Number[]} surfaceType - Driving surface, see appendices
 */

module.exports = CarTelemetryPacket