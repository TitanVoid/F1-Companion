/**
 * @typedef {Object} F1_2018_header - The header of the F1 2018 packet
 * @property {Number} packetFormat - 2018
 * @property {Number} packetVersion - Version of the packet type, all start from 1
 * @property {Number} packetId - Identifier for the packet type, see below
 * @property {Number} sessionUID - Game session
 * @property {Number} sessionTime - Session timestamp
 * @property {Number} frameIdentifier - Identifier for the frame the data was retrieved on
 * @property {Number} playerCarIndex - Index of player's car in the array
 */

/**
 * Extracts the data from the motion packet
 * @param {F1_2018_header} header - The header of the packet
 * @param {DataView} packet - The incoming UDP packet
 * @returns {Object} - The extracted data from the packet 
 */
module.exports.extractData = (header, packet) => {
    var offset = 21 //Header is 21 bytes long
    var carMotionData = []
    const singleCarMotion = {}

    for (var i = 0; i < 20; i++) {
        singleCarMotion.worldPositionX = packet.getFloat32(offset, true)
        singleCarMotion.worldPositionY = packet.getFloat32(offset + 4, true)
        singleCarMotion.worldPositionZ = packet.getFloat32(offset + 8, true)
        singleCarMotion.worldVelocityX = packet.getFloat32(offset + 12, true)
        singleCarMotion.worldVelocityY = packet.getFloat32(offset + 16, true)
        singleCarMotion.worldVelocityZ = packet.getFloat32(offset + 20, true)
        singleCarMotion.worldForwardDirectionX = packet.getInt16(offset + 24, true)
        singleCarMotion.worldForwardDirectionY = packet.getInt16(offset + 26, true)
        singleCarMotion.worldForwardDirectionZ = packet.getInt16(offset + 28, true)
        singleCarMotion.worldRightDirectionX = packet.getInt16(offset + 30, true)
        singleCarMotion.worldRightDirectionY = packet.getInt16(offset + 32, true)
        singleCarMotion.worldRightDirectionZ = packet.getInt16(offset + 34, true)
        singleCarMotion.gForceLateral = packet.getFloat32(offset + 36, true)
        singleCarMotion.gForceLongitudinal = packet.getFloat32(offset + 40, true)
        singleCarMotion.gForceVeritcal = packet.getFloat32(offset + 44, true)
        singleCarMotion.yawAngle = packet.getFloat32(offset + 48, true)
        singleCarMotion.pitchAngle = packet.getFloat32(offset + 52, true)
        singleCarMotion.rollAngle = packet.getFloat32(offset + 56, true)
        singleCarMotion.selfCarExtraData = null
        
        if (header.playerCarIndex == i) {
            //Wheel arrays are in the following order: [RL, RR, FL, FR]
            singleCarMotion.selfCarExtraData = {}
            singleCarMotion.selfCarExtraData.suspensionPosition = [packet.getFloat32(offset + 60, true), packet.getFloat32(offset + 64, true), packet.getFloat32(offset + 68, true), packet.getFloat32(offset + 72, true)]
            singleCarMotion.selfCarExtraData.suspensionVelocity = [packet.getFloat32(offset + 76, true), packet.getFloat32(offset + 80, true), packet.getFloat32(offset + 84, true), packet.getFloat32(offset + 88, true)]
            singleCarMotion.selfCarExtraData.suspensionAcceleration = [packet.getFloat32(offset + 92, true), packet.getFloat32(offset + 96, true), packet.getFloat32(offset + 100, true), packet.getFloat32(offset + 104, true)]
            singleCarMotion.selfCarExtraData.wheelSpeed = [packet.getFloat32(offset + 108, true), packet.getFloat32(offset + 112, true), packet.getFloat32(offset + 116, true), packet.getFloat32(offset + 120, true)]
            singleCarMotion.selfCarExtraData.wheelSlip = [packet.getFloat32(offset + 124, true), packet.getFloat32(offset + 128, true), packet.getFloat32(offset + 132, true), packet.getFloat32(offset + 136, true)]
            singleCarMotion.selfCarExtraData.localVelocityX = packet.getFloat32(offset + 140, true)
            singleCarMotion.selfCarExtraData.localVelocityY = packet.getFloat32(offset + 144, true)
            singleCarMotion.selfCarExtraData.localVelocityZ = packet.getFloat32(offset + 148, true)
            singleCarMotion.selfCarExtraData.angularVelocityX = packet.getFloat32(offset + 152, true)
            singleCarMotion.selfCarExtraData.angularVelocityY = packet.getFloat32(offset + 156, true)
            singleCarMotion.selfCarExtraData.angularVelocityZ = packet.getFloat32(offset + 160, true)
            singleCarMotion.selfCarExtraData.angularAccelerationX = packet.getFloat32(offset + 164, true)
            singleCarMotion.selfCarExtraData.angularAccelerationY = packet.getFloat32(offset + 168, true)
            singleCarMotion.selfCarExtraData.angularAccelerationZ = packet.getFloat32(offset + 172, true)
            singleCarMotion.selfCarExtraData.frontWheelsAngle = packet.getFloat32(offset + 176, true)
            offset += 120
        }

        carMotionData.push(singleCarMotion)
        offset += 60
    }

    return carMotionData
}