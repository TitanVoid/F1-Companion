//Receive a generic packet 
module.exports.getPacketScheme = (packet) => {
    //Check the packet type
    gameVersion = packet.header.packetFormat;
    
    switch (packet.header.packetId) {
        case 0: //Motion Packet
            return require('./packetSchemes/MotionPacketScheme.js')[gameVersion];
        case 1: //Session Packet
            return require('./packetSchemes/SessionPacketScheme.js')[gameVersion];
        case 2: //Lap Data Packet
            return require('./packetSchemes/LapDataPacketScheme.js')[gameVersion];
        case 3: //Event Packet
            return require('./packetSchemes/EventPacketScheme.js')[gameVersion];
        case 4: //Participants Packet
            return require('./packetSchemes/ParticipantsPacketScheme.js')[gameVersion];
        case 5: //Car Setups Packet
            return require('./packetSchemes/CarSetupPacketScheme.js')[gameVersion];
        case 6: //Car Telemetry Packet
            return require('./packetSchemes/CarTelemetryPacketScheme.js')[gameVersion];
        case 7: //Car Status Packet
            return require('./packetSchemes/CarStatusPacketScheme.js')[gameVersion];
        case 8: //Final Classification Packet
            return require('./packetSchemes/FinalClassificationPacketScheme.js')[gameVersion];
        case 9: //Lobby Info Packet
            return require('./packetSchemes/LobbyInfoPacketScheme.js')[gameVersion];
        case 10: //Car Damage Packet
            return require('./packetSchemes/CarDamagePacketScheme.js')[gameVersion];
        case 11: //Session History Packet
            return require('./packetSchemes/SessionHistoryPacketScheme.js')[gameVersion];
        case 12: //Tyre Sets Packet
            return require('./packetSchemes/TyreSetsPacketScheme.js')[gameVersion];
        case 13: //Extended Motion Packet
            return require('./packetSchemes/ExtendedMotionPacketScheme.js')[gameVersion];
        default:
            return null;
    }
}
//Return that packet scheme
