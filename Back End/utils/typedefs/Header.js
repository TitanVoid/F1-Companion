/**
 * @typedef {Object} Header
 * // 2018
 * @property {Number} packetFormat - Packet format
 * @property {Number} packetVersion - Version of the packet type, all start from 1
 * @property {Number} packetID - Identifier for the packet type
 * @property {Number} sessionUID - Game session
 * @property {Number} sessionTime - Session timestamp
 * @property {Number} frameIdentifier - Identifier for the frame the data was retrieved on
 * @property {Number} playerCarIndex - Index of player's car in the array
 * 
 * // 2023
 * @property {Number} packetFormat - Packet format
 * @property {Number} gameYear - Year of the game
 * @property {Number} gameMajorVersion - Major version of the game
 * @property {Number} gameMinorVersion - Minor version of the game
 * @property {Number} packetVersion - Version of the packet type, all start from 1
 * @property {Number} packetID - Identifier for the packet type
 * @property {Number} sessionUID - Game session
 * @property {Number} sessionTime - Session timestamp
 * @property {Number} frameIdentifier - Identifier for the frame the data was retrieved on
 * @property {Number} playerCarIndex - Index of player's car in the array
 * @property {Number} secondaryPlayerCarIndex - Index of secondary player's car in the array
 */

module.exports = Header