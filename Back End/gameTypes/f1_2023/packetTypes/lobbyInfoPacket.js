/*
This packet details the players currently in a multiplayer lobby. It details each player’s selected car, any
AI involved in the game and also the ready status of each of the participants.
Frequency: Two every second when in the lobby
Size: 1218 bytes
Version: 1
*/
module.exports.decodeLobbyInfo = async (header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 30;
    lobbyInfoPacket = {
        header: header,
        numberOfPlayers: dataView.getUint8(offset-1), //Number of players in the lobby data
        lobbyPlayers: []
    }

    for (i = 0; i < 22; i++){

        singlePlayerInfo = {
            aiControlled: dataView.getUint8(offset), // Whether the vehicle is AI (1) or Human (0) controlled
            teamId: dataView.getUint8(offset+1), // Team id - see appendix (255 if no team currently selected)
            nationality: dataView.getUint8(offset+2), // Nationality of the driver
            platform: dataView.getUint8(offset+3), // 1 = Steam, 3 = PlayStation, 4 = Xbox, 6 = Origin, 255 = unknown
            name: msg.buffer.toString("utf8", offset+4, offset+51).replace(/\0/g, ""), // Name of participant in UTF-8 format – null terminated. Will be truncated with ... (U+2026) if too long
            carNumber: dataView.getUint8(offset+52), // Car number of the player
            readyStatus: dataView.getUint8(offset+53), // 0 = not ready, 1 = ready, 2 = spectating
        }

        offset += 54;
        lobbyInfoPacket.lobbyPlayers.push(singlePlayerInfo);
    }

    return lobbyInfoPacket
}