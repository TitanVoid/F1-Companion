/*
This packet details car statuses for all the cars in the race.
Frequency: Rate as specified in menus
Size: 1239 bytes
Version: 1
*/
module.exports.decodeCarStatus = async (header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29; //size of header
    carStatusPacket = {
        header: header,
        carStatus: []
    }

    for (i = 0; i < 22; i++){
        
        singleCarStatus = {
            tractionControl: dataView.getUint8(offset), // Traction control - 0 = off, 1 = medium, 2 = full
            antiLockBrakes: dataView.getUint8(offset+1), // 0 (off) - 1 (on)
            fuelMix: dataView.getUint8(offset+2), // Fuel mix - 0 = lean, 1 = standard, 2 = rich, 3 = max
            frontBrakeBias: dataView.getUint8(offset+3), // Front brake bias (percentage)
            pitLimiterStatus: dataView.getUint8(offset+4), // Pit limiter status - 0 = off, 1 = on
            fuelInTank: dataView.getFloat32(offset+5, true), // Current fuel mass
            fuelCapacity: dataView.getFloat32(offset+9, true), // Fuel capacity
            fuelRemainingLaps: dataView.getFloat32(offset+13, true), // Fuel remaining in terms of laps (value on MFD)
            maxRPM: dataView.getUint16(offset+17, true), // Cars max RPM, point of rev limiter
            idleRPM: dataView.getUint16(offset+19, true), // Cars idle RPM
            maxGears: dataView.getUint8(offset+21), // Maximum number of gears
            drsAllowed: dataView.getUint8(offset+22), // 0 = not allowed, 1 = allowed
            drsActivationDistance: dataView.getUint16(offset+23, true), // 0 = DRS not available, non-zero - DRS will be available in [X] metres
            actualTyreCompound: dataView.getUint8(offset+25), // F1 Modern - 16 = C5, 17 = C4, 18 = C3, 19 = C2, 20 = C1, 21 = C0, 7 = inter, 8 = wet, F1 Classic - 9 = dry, 10 = wet, F2 – 11 = super soft, 12 = soft, 13 = medium, 14 = hard, 15 = wet
            visualTyreCompound: dataView.getUint8(offset+26), // F1 visual (can be different from actual compound), 16 = soft, 17 = medium, 18 = hard, 7 = inter, 8 = wet, F1 Classic – same as above, F2 ‘19, 15 = wet, 19 – super soft, 20 = soft, 21 = medium , 22 = hard
            tyresAgeLaps: dataView.getUint8(offset+27), // Age in laps of the current set of tyres
            vehicleFiaFlags: dataView.getInt8(offset+28), // -1 = invalid/unknown, 0 = none, 1 = green, 2 = blue, 3 = yellow
            enginePowerICE: dataView.getFloat32(offset+29, true), // Engine power output of ICE (W)
            enginePowerMGUK: dataView.getFloat32(offset+33, true), // Engine power output of MGU-K (W)
            ersStoreEnergy: dataView.getFloat32(offset+37, true), // ERS energy store in Joules
            ersDeployMode: dataView.getUint8(offset+41), // ERS deployment mode, 0 = none, 1 = medium, 2 = hotlap, 3 = overtake
            ersHarvestedThisLapMGUK: dataView.getFloat32(offset+42, true), // ERS energy harvested this lap by MGU-K
            ersHarvestedThisLapMGUH: dataView.getFloat32(offset+46, true), // ERS energy harvested this lap by MGU-H
            ersDeployedThisLap: dataView.getFloat32(offset+50, true), // ERS energy deployed this lap
            networkPaused: dataView.getUint8(offset+54) // Whether the car is paused in a network game
        }

        offset += 55;
        carStatusPacket.carStatus.push(singleCarStatus)
    }

    return carStatusPacket;
}