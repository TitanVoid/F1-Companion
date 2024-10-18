/*
The motion packet gives physics data for all the cars being driven.
N.B. For the normalised vectors below, to convert to float values divide by 32767.0f – 16-bit signed
values are used to pack the data and on the assumption that direction values are always between -1.0f
and 1.0f.
Frequency: Rate as specified in menus
Size: 1349 bytes
Version: 1
*/

module.exports.decodeMotion = async (header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29; //Header is 29 bytes
    carMotionPacket = {
        header: header,
        carMotionData: [],
    }
    for (i = 0; i<22; i++){
        var carData = {
            worldPositionX: dataView.getFloat32(offset, true), //World Space X position - metres
            worldPositionY: dataView.getFloat32(offset+4, true), //World Space Y position - metres
            worldPositionZ: dataView.getFloat32(offset+8, true), //World Space Z position - metres
            worldVelocityX: dataView.getFloat32(offset+12, true), //Velocity in world space X - metres/s
            worldVelocityY: dataView.getFloat32(offset+16, true), //Velocity in world space Y - metres/s
            worldVelocityZ: dataView.getFloat32(offset+20, true), //Velocity in world space Z - metres/s
            worldForwardDirectionX: dataView.getInt16(offset+24, true), //World space forward X direction (normalised)
            worldForwardDirectionY: dataView.getInt16(offset+26, true), //World space forward Y direction (normalised)
            worldForwardDirectionZ: dataView.getInt16(offset+28, true), //World space forward Z direction (normalised)
            worldRightDirectionX: dataView.getInt16(offset+30, true), //World space right X direction (normalised)
            worldRightDirectionY: dataView.getInt16(offset+32, true), //World space right Y direction (normalised)
            worldRightDirectionZ: dataView.getInt16(offset+34, true), //World space right Z direction (normalised)
            gForceLateral: dataView.getFloat32(offset+36, true), //Lateral G-Force component
            gForceLongitudinal: dataView.getFloat32(offset+40, true), //Longitudinal G-Force component
            gForceVeritcal: dataView.getFloat32(offset+44, true), //Vertical G-Force component
            yawAngle: dataView.getFloat32(offset+48, true), //Yaw angle in radians
            pitchAngle: dataView.getFloat32(offset+52, true), //Pitch angle in radians
            rollAngle: dataView.getFloat32(offset+56, true) //Roll angle in radians
        }
        carMotionPacket.carMotionData.push(carData);
        offset += 60;
    }

    return carMotionPacket;
}