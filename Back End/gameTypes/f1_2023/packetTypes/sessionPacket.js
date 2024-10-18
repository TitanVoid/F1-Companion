/*
The session packet includes details about the current session in progress.
Frequency: 2 per second
Size: 644 bytes
Version: 1
*/

module.exports.decodeSession = async(header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29; //Header is 29 bytes
    sessionPacket = {
        header: header,
        sessionData: {}
    }
    sessionPacket.sessionData = {
        weather: dataView.getUint8(offset), //0 = Clear, 1 = light cloud, 2 = overcast, 3 = light rain, 4 = heavy rain, 5 = storm
        trackTemperature: dataView.getInt8(offset+1), //Track temperature in degrees Celsius
        airTemperature: dataView.getInt8(offset+2), //Air temperature in degrees Celsius
        totalLaps: dataView.getUint8(offset+3), //Total number of laps in this race
        trackLength: dataView.getUint16(offset+4, true), //Track length in metres
        sessionType: dataView.getUint8(offset+6), //0 = Unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short, 5 = Q1, 6 = Q2, 7 = Q3, 8 = Short Qualifying, 9 = OSQ, 10 = Race, 11 = Race 2, 12 = Race 3, 13 = Time Trial
        trackID: dataView.getInt8(offset+7), //-1 for unknown, see appendix for track ids
        formula: dataView.getUint8(offset+8), //0 = F1 Modern, 1 = F1 Classic, 2 = F2, 3 = F1 Generic, 4 = Beta, 5 = Supercars, 6 = Esports, 7 = F2 2021
        sessionTimeLeft: dataView.getUint16(offset+9, true), //Time left in seconds
        sessionDuration: dataView.getUint16(offset+11, true), //Session duration in seconds
        pitSpeedLimit: dataView.getUint8(offset+13), //Pit speed limit in kilometres per hour
        gamePaused: dataView.getUint8(offset+14), //Whether the game is paused (LAN games only)
        isSpectating: dataView.getUint8(offset+15), //Whether the player is spectating
        spectatorCarIndex: dataView.getUint8(offset+16), //Index of the car being spectated
        sliProNativeSupport: dataView.getUint8(offset+17), //SLI Pro Support, 0 = inactive, 1 = active
        numMarshalZones: dataView.getUint8(offset+18), //Number of marshal zones to follow
        marshalZones: [], //Marshal Zones appended after (max 21)
        safetyCarStatus: dataView.getUint8(offset+124), //0 = no safety car, 1 = full, 2 = virtual, 3 = formation lap
        networkGame: dataView.getUint8(offset+125), //0 = offline, 1 = online
        numWeatherForecastSamples: dataView.getUint8(offset+126), //Number of weather samples to follow
        weatherForecastSamples: [], //Weather Forecast samples appended after (max 51)
        forecastAccuracy: dataView.getUint8(offset+575), //0 = Perfect, 1 = Approximate
        aiDifficulty: dataView.getUint8(offset+576), // 0 - 110
        seasonLinkIdentifier: dataView.getUint32(offset+577, true), //Identifier for season - persists across saves
        weekendLinkIdentifier: dataView.getUint32(offset+581, true), //Identifier for weekend - persists across saves
        sessionLinkIdentifier: dataView.getUint32(offset+585, true), //Identifier for session - persists across saves
        pitStopWindowIdealLap: dataView.getUint8(offset+589), //Ideal lap to pit on for current strategy (player)
        pitStopWindowLatestLap: dataView.getUint8(offset+590), //Latest lap to pit on for current strategy (player)
        pitStopRejoinPosition: dataView.getUint8(offset+591), //Predicted position to rejoin at (player)
        steeringAssist: dataView.getUint8(offset+592), //0 = off, 1 = on
        brakingAssist: dataView.getUint8(offset+593), //0 = off, 1 = low, 2 = medium, 3 = high
        gearboxAssist: dataView.getUint8(offset+594), //1 = manual, 2 = manual and suggested gear, 3 = auto
        pitAssist: dataView.getUint8(offset+595), //0 = off, 1 = on
        pitReleaseAssist: dataView.getUint8(offset+596), //0 = off, 1 = on
        ERSAssist: dataView.getUint8(offset+597), //0 = off, 1 = on
        DRSAssist: dataView.getUint8(offset+598), //0 = off, 1 = on
        dynamicRacingLine: dataView.getUint8(offset+599), //0 = off, 1 = corners only, 2 = full
        dynamicRacingLineType: dataView.getUint8(offset+600), //0 = 2D, 1 = 3D
        gameMode: dataView.getUint8(offset+601), //Game Mode Id (See Appendix)
        ruleSet: dataView.getUint8(offset+602), //See Appendix for Ruleset
        timeOfDay: dataView.getUint32(offset+603, true), //Local time of day - minutes since midnight
        sessionLength: dataView.getUint8(offset+607), // 0 = None, 2 = Very Short, 3 = Short, 4 = Medium, 5 = Medium Long, 6 = Long, 7 = Full
        speedUnitsLeadPlayer: dataView.getUint8(offset+608), //0 = MPH, 1 = KPH
        temperatureUnitsLeadPlayer: dataView.getUint8(offset+609), //0 = Celsius, 1 = Farenheit
        speedUnitsSecondPlayer: dataView.getUint8(offset+610), //0 = MPH, 1 = KPH
        temperatureUnitsSecondPlayer: dataView.getUint8(offset+610), //0 = Celsius, 1 = Farenheit
        numSafetyCarPeriods: dataView.getUint8(offset+611), //Number of safety cars called during session
        numVirtualSafetyCarPeriods: dataView.getUint8(offset+612), //Number of virtual safety cars called during sessions
        numRedFlagPeriods: dataView.getUint8(offset+613), //Number of red flags called during session
    }

    offset = 47; //This is where marshal zones information starts from in the packet
    for (i = 0; i<21; i++){

        marshalZone = {
            zoneStart: dataView.getFloat32(offset, true), //Fraction (0 ... 1) of way through the lap the marshal zone starts
            zoneFlag: dataView.getInt8(offset+4) //-1 = invalid/unknown, 0 = none, 1 = green, 2 = blue, 3 = yellow
        }
        sessionData.marshalZones.push(marshalZone); //Add current marshal zone to the session data object
        offset += 5;
    }

    offset = 127 //This is where weather forecast samples start from in the packet.
    for(i = 0; i<51; i++){
        
        weatherForecastSample = {
            sessionType: dataView.getUint8(offset), //0 = Unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short, 5 = Q1, 6 = Q2, 7 = Q3, 8 = Short Qualifying, 9 = OSQ, 10 = Race, 11 = Race 2, 12 = Race 3, 13 = Time Trial
            timeOffset: dataView.getUint8(offset+1), //Time in minutes the forecast is for
            weather: dataView.getUint8(offset+2), //0 = Clear, 1 = light cloud, 2 = overcast, 3 = light rain, 4 = heavy rain, 5 = storm
            trackTemperature: dataView.getInt8(offset+3), //Track temperature in degrees Celsius
            trackTemperatureChange: dataView.getInt8(offset+4), //0 = increasing, 1 = decreasing, 2 = no change
            airTemperature: dataView.getInt8(offset+5), //Air temperature in degrees Celsius
            airTemperatureChange: dataView.getInt8(offset+6), //0 = increasing, 1 = decreasing, 2 = no change
            rainPercentage: dataView.getUint8(offset+7) //Rain percentage (0-100)
        }
        sessionData.weatherForecastSamples.push(weatherForecastSample); //Adds current weather forecast sample to the session data object
        offset += 8;
    }

    return sessionData;
}