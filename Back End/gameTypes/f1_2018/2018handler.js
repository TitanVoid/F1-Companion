const motionPacket = require('./packetTypes/motionPacket')

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
 * @typedef {Object} F1_2018_packet - The F1 2018 packet
 * @property {F1_2018_header} header - The header of the packet
 * @property {Object} data - The data of the packet
 */


/**
 * @description This handler is responsible for handling the data from the F1 2018 game.
 * @param {Buffer} msg - The incoming UDP packet
 * @returns {F1_2018_packet, packetType} - The packet data and the packet type
 */
module.exports.unPack = (msg) => {
    const dataView = new DataView(msg.buffer, msg.byteOffset, msg.byteLength)

    const header = {
        packetFormat: dataView.getUint16(0, true),
        packetVersion: dataView.getUint8(2),
        packetId: dataView.getUint8(3),
        sessionUID: dataView.getBigInt64(4, true),
        sessionTime: dataView.getFloat32(12, true),
        frameIdentifier: dataView.getUint8(16),
        playerCarIndex: dataView.getUint8(17)
    }

    var packetName = undefined
    var packetData = undefined
    console.log(header.packetId)
    switch(header.packetId) {
        case 0:
            packetName = 'motionPacket'
            packetData = motionPacket.extractData(header, dataView); 
        break
    }

    const packet = {
        header: header,
        data: packetData
    }

    return { packet, packetName }
}