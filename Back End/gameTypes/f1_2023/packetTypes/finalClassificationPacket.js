/*
This packet details the final classification at the end of the race, and the data will match with the post
race results screen. This is especially useful for multiplayer games where it is not always possible to
send lap times on the final frame because of network delay.
Frequency: Once at the end of a race
Size: 1020 bytes
Version: 1
*/
module.exports.decodeFinalClassification = async (header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 30;
    finalClassificationPacket = {
        header: header,
        numberOfCars: dataView.getUint8(offset-1), //Number of cars in the final results
        finalClassification: []
    }

    for (i = 0; i < 22; i++){

        singleCarResult = {
            position: dataView.getUint8(offset), // Finishing position
            numLaps: dataView.getUint8(offset+1), // Number of laps completed
            gridPosition: dataView.getUint8(offset+2), // Grid position of the car
            points: dataView.getUint8(offset+3), // Number of points scored
            numPitStops: dataView.getUint8(offset+4), // Number of pit stops made
            resultStatus: dataView.getUint8(offset+5), // Result status - 0 = invalid, 1 = inactive, 2 = active, 3 = finished, 4 = didnotfinish, 5 = disqualified, 6 = not classified, 7 = retired
            bestLapTimeInMS: dataView.getUint32(offset+6, true), // Best lap time of the session in milliseconds
            totalRaceTime: dataView.getFloat64(offset+10, true), // Total race time in seconds without penalties
            penaltiesTime: dataView.getUint8(offset+18), // Total penalties accumulated in seconds
            numPenalties: dataView.getUint8(offset+19), // Number of penalties applied to this driver
            numTyreStints: dataView.getUint8(offset+20), // Number of tyres stints up to maximum
            tyreStintsActual: [dataView.getUint8(offset+21), dataView.getUint8(offset+22), dataView.getUint8(offset+23), dataView.getUint8(offset+24), dataView.getUint8(offset+25), dataView.getUint8(offset+26), dataView.getUint8(offset+27), dataView.getUint8(offset+28)], // Actual tyres used by this driver
            tyreStintsVisual: [dataView.getUint8(offset+29), dataView.getUint8(offset+30), dataView.getUint8(offset+31), dataView.getUint8(offset+32), dataView.getUint8(offset+33), dataView.getUint8(offset+34), dataView.getUint8(offset+35), dataView.getUint8(offset+36)], // Visual tyres used by this driver
            tyreStintsEndLaps: [dataView.getUint8(offset+37), dataView.getUint8(offset+38), dataView.getUint8(offset+39), dataView.getUint8(offset+40), dataView.getUint8(offset+41), dataView.getUint8(offset+42), dataView.getUint8(offset+43), dataView.getUint8(offset+44)] // The lap number stints end on
        }

        offset += 45;
        finalClassificationPacket.finalClassification.push(singleCarResult);
    }

    return finalClassificationPacket
}