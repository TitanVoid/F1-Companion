const motionPacket = require("./packetTypes/motionPacket");
const sessionPacket = require("./packetTypes/sessionPacket");
const lapDataPacket = require("./packetTypes/lapDataPacket");
const eventDataPacket = require("./packetTypes/eventDataPacket");
const participantsDataPacket = require("./packetTypes/participantsDataPacket");
const carSetupsPacket = require("./packetTypes/carSetupPacket");
const carTelemetryPacket = require("./packetTypes/carTelemetryPacket");
const carStatusPacket = require("./packetTypes/carStatusPacket");
const finalClassificationPacket = require("./packetTypes/finalClassificationPacket");
const lobbyInfoPacket = require("./packetTypes/lobbyInfoPacket");
const carDamagePacket = require("./packetTypes/carDamagePacket");
const sessionHistoryPacket = require("./packetTypes/sessionHistoryPacket");
const tyreSetsPacket = require("./packetTypes/tyreSetsPacket");
const extendedMotionPacket = require("./packetTypes/extendedMotionPacket");


const compressBuffer = require("../../utils/CompressBuffer");

//TESTING
/*
const fs = require('fs');
const path = require('path');

// Define directories for saving files
const rawPacketDir = path.join(__dirname, 'rawPackets');
const decodedPacketDir = path.join(__dirname, 'decodedPackets');

// Ensure the directories exist
if (!fs.existsSync(rawPacketDir)) {
    fs.mkdirSync(rawPacketDir, { recursive: true });
}

if (!fs.existsSync(decodedPacketDir)) {
    fs.mkdirSync(decodedPacketDir, { recursive: true });
}

// Memory buffers to store packet data temporarily
const buffers = {
    raw: {},
    decoded: {}
};

// Settings for batching and flushing
const MAX_PACKET_COUNT = 100;  // Max packets before flushing
const FLUSH_INTERVAL = 1000;   // Time interval to flush in milliseconds (1 second)

// Initialize buffers for packet types
const initBuffer = (packetName) => {
    buffers.raw[packetName] = [];      // Buffer for raw packets
    buffers.decoded[packetName] = [];  // Buffer for decoded packets
};

// Flush function to write buffered packets to disk
const flushBuffer = (packetName) => {
    if (buffers.raw[packetName].length > 0) {
        const rawFilePath = path.join(rawPacketDir, `${packetName}.bin`);
        const rawData = Buffer.concat(buffers.raw[packetName]);
        fs.appendFileSync(rawFilePath, rawData);  // Append raw packet data to file
        buffers.raw[packetName] = [];  // Clear the raw buffer
    }

    if (buffers.decoded[packetName].length > 0) {
        const decodedFilePath = path.join(decodedPacketDir, `${packetName}.json`);

        // Load existing data if the file exists, otherwise start a new array
        let existingDecodedData = [];
        if (fs.existsSync(decodedFilePath)) {
            existingDecodedData = JSON.parse(fs.readFileSync(decodedFilePath, 'utf-8'));
        }

        // Append new decoded packets
        existingDecodedData.push(...buffers.decoded[packetName]);
        fs.writeFileSync(decodedFilePath, JSON.stringify(existingDecodedData, null, 2));

        buffers.decoded[packetName] = [];  // Clear the decoded buffer
    }
};

setInterval(() => {
    Object.keys(buffers.raw).forEach((packetName) => flushBuffer(packetName));
}, FLUSH_INTERVAL);
*/

//////////////////////////////////

let buffer = [];

module.exports.unPack = async (msg, rinfo) => {
    const dataView = new DataView(msg.buffer, msg.byteOffset, msg.byteLength);
    
    const packetFormat = dataView.getUint16(0, true); //in this case 2023
    const gameYear = dataView.getUint8(2); //Last two digits of the game year - 23 in this case
    const gameMajorVersion = dataView.getUint8(3); //Game Major Version - "X.00"
    const gameMinorVersion = dataView.getUint8(4); //Game Minor Version - "1.XX"
    const packetVersion = dataView.getUint8(5); //Version of this packet type, all start from 1
    const packetID = dataView.getUint8(6); //ID for the packet type
    const sessionUID = dataView.getBigUint64(7, true); //Unique identifier for the session
    const sessionTime = dataView.getFloat32(15, true); //Session Timestamp
    const frameIdentifier = dataView.getUint32(19, true); //Identifier for the frame the data was received on
    const overallFrameIdentifier = dataView.getUint32(23, true); //Overall identifier for the frame the data was received on (doesn't reset with flashbacks)
    const playerCarIndex = dataView.getUint8(27); //Index of the player's car in the array
    const secondaryCarIndex = dataView.getUint8(28); //Index of secondary player's car in the array (splitscreen), set to 255 if no second player

    //Create an unpacked header
    const header = {packetFormat, gameYear, gameMajorVersion, gameMinorVersion, packetVersion, packetID, sessionUID, sessionTime, frameIdentifier, overallFrameIdentifier, playerCarIndex, secondaryCarIndex};
    
    var decodedPacket = undefined;
    var packetName = undefined;                                                                                                                         

    switch(packetID){
        case 0:
            packetName = 'motionPacket';
            decodedPacket = await motionPacket.decodeMotion(header, msg);
        break
        case 1:
            packetName = 'sessionPacket';
            decodedPacket = await sessionPacket.decodeSession(header, msg);
        break
        case 2:
            packetName = 'lapDataPacket';
            decodedPacket = await lapDataPacket.decodeLap(header, msg);
        break
        case 3:
            packetName = 'eventDataPacket';
            decodedPacket = await eventDataPacket.decodeEvent(header, msg);
        break
        case 4:
            packetName = 'participantsPacket';
            decodedPacket = await participantsDataPacket.decodeParticipants(header, msg);
        break
        case 5:
            packetName = 'carSetupPacket';
            decodedPacket = await carSetupsPacket.decodeCarSetup(header, msg);
        break
        case 6:
            packetName = 'carTelemetryPacket';
            decodedPacket = await carTelemetryPacket.decodeCarTelemetry(header, msg);
        break
        case 7:
            packetName = 'carStatusPacket';
            decodedPacket = await carStatusPacket.decodeCarStatus(header, msg);
        break
        case 8:
            packetName = 'finalClassificationPacket';
            decodedPacket = await finalClassificationPacket.decodeFinalClassification(header, msg);
        break
        case 9:
            packetName = 'lobbyInfoPacket';
            decodedPacket = await lobbyInfoPacket.decodeLobbyInfo(header, msg);
        break
        case 10:
            packetName = 'carDamagePacket';
            decodedPacket = await carDamagePacket.decodeCarDamage(header, msg);
        break
        case 11:
            packetName = 'sessionHistoryPacket';
            decodedPacket = await sessionHistoryPacket.decodeSessionHistory(header, msg);
        break
        case 12:
            packetName = 'tyreSetsPacket';
            decodedPacket = await tyreSetsPacket.decodeTyreSets(header, msg);
        break
        case 13:
            packetName = 'extendedMotionPacket';
            decodedPacket = await extendedMotionPacket.decodeExtendedMotion(header, msg);
        break
    }

    const packet = {
        header: header,
        data: decodedPacket
    }
    console.log(packetName, packet)
    buffer.push(packet);
    if (buffer.length >= 100) {
        const compressedBuffer = compressBuffer.compressBuffer(buffer);
        console.log(compressedBuffer);
        console.log(compressedBuffer.length);
        buffer = [];
    }
    return { packet, packetName }

    //TESTING
    /*
    if (!buffers.raw[packetName]) {
        initBuffer(packetName);  // Initialize buffer if it doesn't exist
    }

    // Add raw packet data to the buffer
    buffers.raw[packetName].push(Buffer.from(msg.buffer));

    // Add decoded packet to the decoded buffer
    buffers.decoded[packetName].push(decodedPacket);

    // Check if buffer reached max packet count and flush
    if (buffers.raw[packetName].length >= MAX_PACKET_COUNT) {
        flushBuffer(packetName);
    }
    */
}