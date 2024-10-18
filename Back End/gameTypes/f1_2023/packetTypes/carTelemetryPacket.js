/*
This packet details telemetry for all the cars in the race. It details various values that would be
recorded on the car such as speed, throttle application, DRS etc. Note that the rev light configurations
are presented separately as well and will mimic real life driver preferences.
Frequency: Rate as specified in menus
Size: 1352 bytes
Version: 1
*/
module.exports.decodeCarTelemetry = async(header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29; //size of header
    carTelemetryPacket = {
        header: header,
        carTelemetryData: [], 
        mfdPanelIndex: dataView.getUint8(offset+1320), //255 = MFD closed, Single player race – 0 = Car setup, 1 = Pits, 2 = Damage, 3 = Engine, 4 = Temperatures (May vary depending on game mode)
        mfdPanelIndexSecondaryPlayer: dataView.getUint8(offset+1321), //Same as above
        suggestedGear: dataView.getInt8(offset+1322) //Suggested gear for the player (1-8), 0 if no gear suggested
    }  

    for (i = 0; i < 22; i++){

        singleCarTelemetry = {
            speed: dataView.getUint16(offset, true), //Speed of car in kilometres per hour
            throttle: dataView.getFloat32(offset+2, true), //Amount of throttle applied (0.0 to 1.0)
            steer: dataView.getFloat32(offset+6, true), //Steering (-1.0 (full left lock) to 1.0 (full right lock))
            brake: dataView.getFloat32(offset+10, true), //Amount of brake applied (0.0 to 1.0)
            clutch: dataView.getUint8(offset+14), //Amount of clutch applied (0 to 100)
            gear: dataView.getInt8(offset+15), //Gear selected (1-8, 0 = Neutral, -1 = Reverse)
            engineRPM: dataView.getUint16(offset+16, true), //Engine RPM
            drs: dataView.getUint8(offset+18), //0 = Off, 1 = On
            revLightsPercent: dataView.getUint8(offset+19), //Rev lights indicator (percentage)
            revLightsBitValue: dataView.getUint16(offset+20, true), //bit 0 = leftmost LED, bit 1 = rightmost LED
            brakesTemperature: [dataView.getUint16(offset+22, true), dataView.getUint16(offset+24, true), dataView.getUint16(offset+26, true), dataView.getUint16(offset+28, true)], //Brake temperatures (celsius)
            tyresSurfaceTemperature: [dataView.getUint8(offset+30), dataView.getUint8(offset+31), dataView.getUint8(offset+32), dataView.getUint8(offset+33)], //Tyres surface temperature (celsius)
            tyresInnerTemperature: [dataView.getUint8(offset+34), dataView.getUint8(offset+35), dataView.getUint8(offset+36), dataView.getUint8(offset+37)], //Tyres inner temperature (celsius)
            engineTemperature: dataView.getUint16(offset+38, true), //Engine temperature (celsius)
            tyresPressure: [dataView.getFloat32(offset+40, true), dataView.getFloat32(offset+44, true), dataView.getFloat32(offset+48, true), dataView.getFloat32(offset+52, true)], //Tyres Pressure (PSI)
            surfaceType: [dataView.getUint8(offset+56), dataView.getUint8(offset+57), dataView.getUint8(offset+58), dataView.getUint8(offset+59)] //See below for surface types
        }
        offset += 60;
        carTelemetryPacket.carTelemetryData.push(singleCarTelemetry);
    }

    return carTelemetryPacket;
}