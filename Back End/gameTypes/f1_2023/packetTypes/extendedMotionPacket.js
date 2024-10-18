/*
Motion Extra Packet
The motion packet gives extended data for the car being driven with the goal of being able to drive a
motion platform setup.
Frequency: Rate as specified in menus
Size: 217 bytes
Version: 1
*/
module.exports.decodeExtendedMotion = async (header, msg) => {
    
    const dataView = new DataView(msg.buffer);
    var offset = 29; //size of header
    //This data is only transmitted for the player's data
    extendedMotionPacket = {
        header: header,
        suspensionPosition: [dataView.getFloat32(offset), dataView.getFloat32(offset+4), dataView.getFloat32(offset+8), dataView.getFloat32(offset+12)], // Note: All wheel arrays have the following order:
        suspensionVelocity: [dataView.getFloat32(offset+16), dataView.getFloat32(offset+20), dataView.getFloat32(offset+24), dataView.getFloat32(offset+28)], // RL, RR, FL, FR
        suspensionAcceleration: [dataView.getFloat32(offset+32), dataView.getFloat32(offset+36), dataView.getFloat32(offset+40), dataView.getFloat32(offset+44)], // RL, RR, FL, FR
        wheelSpeed: [dataView.getFloat32(offset+48), dataView.getFloat32(offset+52), dataView.getFloat32(offset+56), dataView.getFloat32(offset+60)], // Speed of each wheel
        wheelSlipRatio: [dataView.getFloat32(offset+64), dataView.getFloat32(offset+68), dataView.getFloat32(offset+72), dataView.getFloat32(offset+76)], // Slip ratio for each wheel
        wheelSlipAngle: [dataView.getFloat32(offset+80), dataView.getFloat32(offset+84), dataView.getFloat32(offset+88), dataView.getFloat32(offset+92)], // Slip angles for each wheel
        wheelLatForce: [dataView.getFloat32(offset+96), dataView.getFloat32(offset+100), dataView.getFloat32(offset+104), dataView.getFloat32(offset+108)], // Lateral forces for each wheel
        wheelLongForce: [dataView.getFloat32(offset+112), dataView.getFloat32(offset+116), dataView.getFloat32(offset+120), dataView.getFloat32(offset+124)], // Longitudinal forces for each wheel
        heightOfCOGAboveGround: dataView.getFloat32(offset+128), // Height of centre of gravity above ground
        localVelocityX: dataView.getFloat32(offset+132), // Velocity in local space – metres/s
        localVelocityY: dataView.getFloat32(offset+136), // Velocity in local space
        localVelocityZ: dataView.getFloat32(offset+140), // Velocity in local space
        angularVelocityX: dataView.getFloat32(offset+144), // Angular velocity x-component – radians/s
        angularVelocityY: dataView.getFloat32(offset+148), // Angular velocity y-component
        angularVelocityZ: dataView.getFloat32(offset+152), // Angular velocity z-component
        angularAccelerationX: dataView.getFloat32(offset+156), // Angular acceleration x-component – radians/s/s
        angularAccelerationY: dataView.getFloat32(offset+160), // Angular acceleration y-component
        angularAccelerationZ: dataView.getFloat32(offset+164), // Angular acceleration z-component
        frontWheelsAngle: dataView.getFloat32(offset+168), // Current front wheels angle in radians
        wheelVertForce: [dataView.getFloat32(offset+172), dataView.getFloat32(offset+176), dataView.getFloat32(offset+180), dataView.getFloat32(offset+184)] // Vertical forces for each wheel        
    }

    return extendedMotionPacket;
}