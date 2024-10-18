/*
This packet contains lap times and tyre usage for the session. This packet works slightly differently
to other packets. To reduce CPU and bandwidth, each packet relates to a specific vehicle and is
sent every 1/20 s, and the vehicle being sent is cycled through. Therefore in a 20 car race you
should receive an update for each vehicle at least once per second.
Note that at the end of the race, after the final classification packet has been sent, a final bulk update
of all the session histories for the vehicles in that session will be sent.
Frequency: 20 per second but cycling through cars
Size: 1460 bytes
Version: 1
*/
module.exports.decodeSessionHistory = async (header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29;
    sessionHistoryPacket = {
        header: header,
        carIndex: dataView.getUint8(offset), // Index of the car this lap data relates to
        numLaps: dataView.getUint8(offset+1), // Num laps in the data (including current partial lap)
        numTyreStints: dataView.getUint8(offset+2), // Number of tyre stints in the data
        bestLapTimeLapNum: dataView.getUint8(offset+3), // Lap the best lap time was achieved on
        bestSector1LapNum: dataView.getUint8(offset+4), // Lap the best Sector 1 time was achieved on
        bestSector2LapNum: dataView.getUint8(offset+5), // Lap the best Sector 2 time was achieved on
        bestSector3LapNum: dataView.getUint8(offset+6), // Lap the best Sector 3 time was achieved on
        lapHistoryData: [], // 100 laps of data max
        tyreStintsHistoryData: [] //8
    }
    offset += 7;

    for (i = 0; i < 100; i++){

        singleLap = {
            lapTimeInMS: dataView.getUint32(offset, true), // Lap time in milliseconds
            sector1TimeInMS: dataView.getUint16(offset+4, true), // Sector 1 time in milliseconds
            sector1TimeMinutes: dataView.getUint8(offset+6), // Sector 1 whole minute part
            sector2TimeInMS: dataView.getUint16(offset+7, true), // Sector 2 time in milliseconds
            sector2TimeMinutes: dataView.getUint8(offset+9), // Sector 2 whole minute part
            sector3TimeInMS: dataView.getUint16(offset+10, true), // Sector 3 time in milliseconds
            sector3TimeMinutes: dataView.getUint8(offset+12), // Sector 3 whole minute part
            lapValidBitFlags: dataView.getUint8(offset+13), // 0x01 bit set-lap valid, 0x02 bit set-sector 1 valid, 0x04 bit set-sector 2 valid, 0x08 bit set-sector 3 valid
        }

        offset += 14;
        sessionHistoryPacket.lapHistoryData.push(singleLap);
    }

    for (i = 0; i < 8; i++){

        singleTyreStint = {
            endLap: dataView.getUint8(offset), // Lap the tyre usage ends on (255 of current tyre)
            tyreActualCompound: dataView.getUint8(offset+1), // Actual tyres used by this driver
            tyreVisualCompound: dataView.getUint8(offset+2), // Visual tyres used by this driver
        }

        offset += 3;
        sessionHistoryPacket.tyreStintsHistoryData.push(singleTyreStint);
    }

    return lobbyInfoPacket
}