/*
This packet details the car setups for each vehicle in the session. Note that in multiplayer games, other
player cars will appear as blank, you will only be able to see your own car setup, regardless of the
“Your Telemetry” setting. Spectators will also not be able to see any car setups.
Frequency: 2 per second
Size: 1107 bytes
Version: 1
*/

module.exports.decodeCarSetup = async (header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29; //size of header
    carSetupPacket = {
        header: header,
        carSetups: [], //Array of car setups of all participants
    }
    for (i = 0; i < 22; i++){
        carSetupData = {
            frontWing: dataView.getUint8(offset), //Front wing aero
            rearWing: dataView.getUint8(offset+1), //Rear wing aero
            onThrottle: dataView.getUint8(offset+2), //Differential adjustment on throttle (percentage)
            offThrottle: dataView.getUint8(offset+3), //Differential adjustment off throttle (percentage)
            frontCamber: dataView.getFloat32(offset+4, true), //Front camber angle (suspension geometry)
            rearCamber: dataView.getFloat32(offset+8, true), //Rear camber angle (suspension geometry)
            frontToe: dataView.getFloat32(offset+12, true), //Front toe angle (suspension geometry)
            rearToe: dataView.getFloat32(offset+16, true), //Rear toe angle (suspension geometry)
            frontSuspension: dataView.getUint8(offset+20), //Front suspension
            rearSuspension: dataView.getUint8(offset+21), //Rear suspension
            frontAntiRollBar: dataView.getUint8(offset+22), //Front anti-roll bar
            rearAntiRollBar: dataView.getUint8(offset+23), //Rear anti-roll bar
            frontSuspensionHeight: dataView.getUint8(offset+24), //Front ride height
            rearSuspensionHeight: dataView.getUint8(offset+25), //Rear ride height
            brakePressure: dataView.getUint8(offset+26), //Brake Pressure (percentage)
            brakeBias: dataView.getUint8(offset+27), //Brake Bias (percentage)
            rearLeftTyrePressure: dataView.getFloat32(offset+28, true), //Rear left tyre pressure (PSI)
            rearRightTyrePressure: dataView.getFloat32(offset+32, true), //Rear right tyre pressure (PSI)
            frontLeftTyrePressure: dataView.getFloat32(offset+36, true), //Front left tyre pressure (PSI)
            frontRightTyrePressure: dataView.getFloat32(offset+40, true), //Front right tyre pressure (PSI)
            ballast: dataView.getUint8(offset+44), //Ballast
            fuelLoad: dataView.getFloat32(offset+45, true) //Fuel Load
        }
        carSetupPacket.carSetups.push(carSetupData);
        offset += 49;
    }

    return carSetupPacket;
}