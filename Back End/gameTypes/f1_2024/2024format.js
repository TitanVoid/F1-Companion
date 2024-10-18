const motionPacket = require("./packetTypes/motionPacket")

module.exports.unPack = async (msg, rinfo) => {
    const dataView = new DataView(msg.buffer, msg.byteOffset, msg.byteLength);
    
    const packetFormat = dataView.getUint16(0, true)
    const packetVersion = dataView.getUint8(2);
    const packetID = dataView.getUint8(3);
    const sessionUID = dataView.getBigUint64(4, true)
    const sessionTime = dataView.getFloat32(12, true)
    const frameIdentifier = dataView.getUint32(16)
    const playerCarIndex = dataView.getUint8(20)

    //Create an unpacked header
    const header = {packetFormat, packetVersion, packetID, sessionUID, sessionTime, frameIdentifier, playerCarIndex}
    switch(packetID){
        case 0:
            motionPacket.decodeMotion(header, msg)
        break
        case 1:

        break
        case 2:

        break
        case 3:

        break
        case 4:

        break
        case 5:

        break
        case 6:

        break
        case 7:

        break
    }
}