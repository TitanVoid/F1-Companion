/**
 * @typedef {Object} SessionPacket
 * @property {import('./Header')} header - Header
 * @property {SessionData} sessionData - Session data
 */

/**
 * @typedef {Object} SessionData
 * @property {Number} weather - Weather - 0 = clear, 1 = light cloud, 2 = overcast, 3 = light rain, 4 = heavy rain, 5 = storm
 * @property {Number} trackTemperature - Track temp. in degrees Celsius
 * @property {Number} airTemperature - Air temp. in degrees Celsius
 * @property {Number} totalLaps - Total number of laps in this
 * @property {Number} trackLength - Track length in metres
 * @property {Number} sessionType - 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P, 5 = Q1, 6 = Q2, 7 = Q3, 8 = Short Q, 9 = OSQ, 10 = R, 11 = R2, 12 = R3, 13 = Time Trial
 * @property {Number} trackID - -1 for unknown, see appendix
 * @property {Number} formula - Formula, 0 = F1 Modern, 1 = F1 Classic, 2 = F2, 3 = F1 Generic, 4 = Beta, 5 = Supercars, 6 = Esports, 7 = F2 2021
 * @property {Number} sessionTimeLeft - Time left in session in seconds
 * @property {Number} sessionDuration - Session duration in seconds
 * @property {Number} pitSpeedLimit - Pit speed limit in kilometres per hour
 * @property {Number} gamePaused - Whether the game is paused (LAN only)
 * @property {Number} isSpectating - Whether the player is spectating
 * @property {Number} spectatorCarIndex - Index of the car being spectated
 * @property {Number} sliProNativeSupport - SLI Pro support, 0 = inactive, 1 = active
 * @property {Number} numMarshalZones - Number of marshal zones to follow
 * @property {MarshalZone[]} marshalZones - List of marshal zones – max 21
 * @property {Number} safetyCarStatus - 0 = no safety car, 1 = full safety car, 2 = virtual safety car, 3 = formation lap
 * @property {Number} networkGame - 0 = offline, 1 = online
 * @property {Number} numWeatherForecastSamples - Number of weather samples to follow
 * @property {WeatherForecastSample[]} weatherForecastSamples - Array of weather forecast samples, max 51
 * @property {Number} forecastAccuracy - 0 = Perfect, 1 = Approximate
 * @property {Number} aiDifficulty - AI Difficulty rating – 0-110
 * @property {Number} seasonLinkIdentifier - Identifier for season - persists across saves
 * @property {Number} weekendLinkIdentifier - Identifier for weekend - persists across saves
 * @property {Number} sessionLinkIdentifier - Identifier for session - persists across saves
 * @property {Number} pitStopWindowIdealLap - Ideal lap to pit
 * @property {Number} pitStopWindowLatestLap - Latest lap to pit without being too slow, on current strategy
 * @property {Number} pitStopRejoinPosition - Grid position the player will rejoin
 * @property {Number} steeringAssist - 0 = off, 1 = on
 * @property {Number} brakingAssist - 0 = off, 1 = low, 2 = medium, 3 = high
 * @property {Number} gearboxAssist - 1 = manual, 2 = manual & suggested gear, 3 = auto
 * @property {Number} pitAssist - 0 = off, 1 = on
 * @property {Number} pitReleaseAssist - 0 = off, 1 = on
 * @property {Number} ERSAssist - 0 = off, 1 = on
 * @property {Number} DRSAssist - 0 = off, 1 = on
 * @property {Number} dynamicRacingLine - 0 = off, 1 = corners only, 2 = full
 * @property {Number} dynamicRacingLineType - 0 = 2D, 1 = 3D
 * @property {Number} gameMode - Game mode, see appendix
 * @property {Number} ruleSet - Rule set, see appendix
 * @property {Number} timeOfDay - Local time of day - minutes since midnight
 * @property {Number} sessionLength - 0 = None, 2 = Very Short, 3 = Short, 4 = Medium, 5 = Medium Long, 6 = Long, 7 = Full
 * @property {Number} speedUnitsLeadPlayer - Speed units for the lead player, 0 = km/h, 1 = mph
 * @property {Number} temperatureUnitsLeadPlayer - 0 = Celsius, 1 = Farenheit
 * @property {Number} speedUnitsSecondPlayer - Speed units for the second player, 0 = km/h, 1 = mph
 * @property {Number} temperatureUnitsSecondPlayer - 0 = Celsius, 1 = Farenheit
 * @property {Number} numSafetyCarPeriods - Number of safety car periods in this session
 * @property {Number} numVirtualSafetyCarPeriods - Number of virtual safety car periods in this session
 * @property {Number} numRedFlagPeriods - Number of red flag periods in this session
 */

/**
 * @typedef {Object} MarshalZone
 * @property {Number} zoneStart - Fraction (0..1) of way through the lap the marshal zone starts
 * @property {String} zoneFlag - -1 = invalid/unknown, 0 = none, 1 = green, 2 = blue, 3 = yellow, 4 = red
 */

/**
 * @typedef {Object} WeatherForecastSample
 * @property {Number} sessionType - 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P, 5 = Q1, 6 = Q2, 7 = Q3, 8 = Short Q, 9 = OSQ, 10 = R, 11 = R2, 12 = R3, 13 = Time Trial
 * @property {Number} timeOffset - Time in minutes the forecast is for
 * @property {Number} weather - Weather - 0 = clear, 1 = light cloud, 2 = overcast, 3 = light rain, 4 = heavy rain, 5 = storm
 * @property {Number} trackTemperature - Track temp. in degrees Celsius
 * @property {Number} trackTemperatureChange - Track temp. change in degrees Celsius
 * @property {Number} airTemperature - Air temp. in degrees Celsius
 * @property {Number} airTemperatureChange - Air temp. change in degrees Celsius
 * @property {Number} rainPercentage - Rain percentage (0-100)
 */

module.exports = SessionPacket