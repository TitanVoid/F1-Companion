/**
 * @typedef {Object} LobbyInfoPacket
 * @property {import('./Header')} header - Header
 * @property {Number} numberOfPlayers - Number of players in the lobby
 * @property {LobbyPlayers[]} lobbyPlayers - Players in the lobby
 */

/**
 * @typedef {Object} LobbyPlayers
 * @property {Number} aiControlled - Whether the player is AI controlled
 * @property {Number} teamId - Team ID
 * @property {Number} nationality - Nationality of the driver
 * @property {Number} platform - Platform the player is on - 1 = Steam, 3 = PlayStation, 4 = Xbox, 6 = Origin, 255 = unknown
 * @property {String} name - Name of the driver
 * @property {Number} carNumber - Car number of the player
 * @property {Number} readyStatus - Ready status - 0 = not ready, 1 = ready, 2 = spectating
 */

module.exports = LobbyInfoPacket