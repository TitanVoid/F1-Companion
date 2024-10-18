var yes = false
module.exports.decodeMotion = async (header, msg) => {

    const dataView = new DataView(msg.buffer)
    var offset = 21; //Header is 21 bytes
    const carMotionData = [];
    for (i = 0; i < 20; i++){
        var carData = {
            worldPositionX: dataView.getFloat32(offset, true),
            worldPositionY: dataView.getFloat32(offset+4, true),
            worldPositionZ: dataView.getFloat32(offset+8, true),
            worldVelocityX: dataView.getFloat32(offset+12, true),
            worldVelocityY: dataView.getFloat32(offset+16, true),
            worldVelocityZ: dataView.getFloat32(offset+20, true),
            worldForwardDirectionX: dataView.getInt16(offset+24, true),
            worldForwardDirectionY: dataView.getInt16(offset+26, true),
            worldForwardDirectionZ: dataView.getInt16(offset+28, true),
            worldRightDirectionX: dataView.getInt16(offset+30, true),
            worldRightDirectionY: dataView.getInt16(offset+32, true),
            worldRightDirectionZ: dataView.getInt16(offset+34, true),
            gForceLateral: dataView.getFloat32(offset+36, true),
            gForceLongitudinal: dataView.getFloat32(offset+40, true),
            gForceVeritcal: dataView.getFloat32(offset+44, true),
            yawAngle: dataView.getFloat32(offset+48, true),
            pitchAngle: dataView.getFloat32(offset+52, true),
            rollAngle: dataView.getFloat32(offset+56, true)
        }
        if (header.playerCarIndex == i){
            carData = {
                carData,
                selfCarExtraData: {
                    //Wheel arrays are in the following order: [RL, RR, FL, FR]
                    suspensionPosition: [dataView.getFloat32(offset+60), dataView.getFloat32(offset+64), dataView.getFloat32(offset+68), dataView.getFloat32(offset+72)],
                    suspensionVelocity: [dataView.getFloat32(offset+76), dataView.getFloat32(offset+80), dataView.getFloat32(offset+84), dataView.getFloat32(offset+88)],
                    suspensionAcceleration: [dataView.getFloat32(offset+92), dataView.getFloat32(offset+96), dataView.getFloat32(offset+100), dataView.getFloat32(offset+104)],
                    wheelSpeed: [dataView.getFloat32(offset+108), dataView.getFloat32(offset+112), dataView.getFloat32(offset+116), dataView.getFloat32(offset+120)],
                    wheelSlip: [dataView.getFloat32(offset+124), dataView.getFloat32(offset+128), dataView.getFloat32(offset+132), dataView.getFloat32(offset+136)],
                    localVelocityX: dataView.getFloat32(offset+140),
                    localVelocityY: dataView.getFloat32(offset+144),
                    localVelocityZ: dataView.getFloat32(offset+148),
                    angularVelocityX: dataView.getFloat32(offset+152),
                    angularVelocityY: dataView.getFloat32(offset+156),
                    angularVelocityZ: dataView.getFloat32(offset+160),
                    angularAccelerationX: dataView.getFloat32(offset+164),
                    angularAccelerationY: dataView.getFloat32(offset+168),
                    angularAccelerationZ: dataView.getFloat32(offset+172),
                    frontWheelsAngle: dataView.getFloat32(offset+176)
                }
            }
            offset += 120
        }
        carMotionData.push(carData)
        offset += 60
    }
    if (yes == false){
        console.log(carMotionData)
        //Seems like a problem with the last two cars in the array, getting anomalous results for certain fields
    }
    yes = true
}