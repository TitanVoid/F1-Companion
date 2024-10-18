/*
The lap data packet gives details of all the cars in the session.
Frequency: Rate as specified in menus
Size: 972 bytes
Version: 1
*/

module.exports.decodeLap = async(header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29; //Size of header
    var lapData = {
        header: header,
        carLapData: [] //Create an array to hold data for each car
    };
    for (i = 0; i<22; i++){
        personalLapData = {
            lastLapTimeInMS: dataView.getUint32(offset, true), //Last lap time in milliseconds
            currentLapTimeInMS: dataView.getUint32(offset+4, true), //Current time around the lap in milliseconds
            sector1TimeInMS: dataView.getUint16(offset+8, true), //Sector 1 time in milliseconds
            sector2TimeInMS: dataView.getUint16(offset+10, true), //Sector 2 time in milliseconds
            lapDistance: dataView.getFloat32(offset+12, true), //Distance vehicle is around current lap in metres - could be negative if line hasn't been crossed yet
            totalDistance: dataView.getFloat32(offset+16, true), //Total distance travelled in session in metres - could be negative if line hasn't been crossed yet
            safetyCarDelta: dataView.getFloat32(offset+20, true), //Delta in seconds for safety car
            carPosition: dataView.getUint8(offset+24), //Car race position
            currentLapNum: dataView.getUint8(offset+25), //Current lap number
            pitStatus: dataView.getUint8(offset+26), //0 = none, 1 = pitting, 2 = in pit area
            numPitStops: dataView.getUint8(offset+27), //Number of pit stops taken this race
            sector: dataView.getUint8(offset+28), //0 = sector 1, 1 = sector 2, 2 = sector 3
            currentLapInvalid: dataView.getUint8(offset+29), //0 = valid, 1 = invalid
            penalties: dataView.getUint8(offset+30), //Accumulated time penalties in seconds to be added
            totalWarnings: dataView.getUint8(offset+31), //Accumulated number of warnings issued
            cornerCuttingWarnings: dataView.getUint8(offset+32), //Accumulated number of corner cutting warnings issued
            numUnservedDrivethroughPenalties: dataView.getUint8(offset+33), //Number of drivethrough penalties left to serve
            numUnservedStopAndGoPenalties: dataView.getUint8(offset+34), //Number of stop and go penalties left to server
            gridPosition: dataView.getUint8(offset+35), //Grid position the vehicle started the race in 
            driverStatus: dataView.getUint8(offset+36), //0 = in garage, 1 = flying lap, 2 = in lap, 3 = out lap, 4 = on track
            resultsStatus: dataView.getUint8(offset+37), //0 = invalid, 1 = inactive, 2 = active, 3 = finished, 4 = didnotfinish, 5 = disqualified, 6 = not classified, 7 = retired
            pitLaneTimerActive: dataView.getUint8(offset+38), //0 = inactive, 1 = active
            pitLaneTimeInLaneInMS: dataView.getUint16(offset+39, true), //If active, the current time spent in the pit lane in milliseconds
            pitstopTimerInMS: dataView.getUint16(offset+41, true), //Time of the actual pitstop in milliseconds
            pitstopShouldServePenalty: dataView.getUint8(offset+43), //Whether the car should serve a penalty at this stop
        }
        lapData.carLapData.push(personalLapData);
        offset += 44; //Size of personal lap data
    }

    lapData.timeTrial = {
        timeTrialPersonalBestCarIndex: dataView.getUint8(offset), //Index of personal best car in time trial (255 if invalid)
        timeTrialRivalCarIndex: dataView.getUint8(offset+1), //Index of rival car in time trial (255 if invalid)
    }

    return lapData;
}