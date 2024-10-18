const EventEmitter = require('events')
const UDPReceiver = require('./UDPReceiver')

const handler = require('../gameTypes/globalHandler')

/**
 * @typedef {Object} GameVersions
 * @property {String} v2018
 * @property {String} v2023
 */

class F1 extends EventEmitter {
    /**
     * @param {Object} options
     * @param {keyof GameVersions} options.version - The version of the game that is sending the data
     * @param {number} [options.port] - The port to listen for incoming UDP packets (default: 20777)
     * @param {string} [options.address] - The address to listen for incoming UDP packets (default: '127.0.0.1')
     */
    constructor({ version, port, address }) {
        super()
        this.version = version
        this.port = port || 20777
        this.address = address || '127.0.0.1'
        this.receiver = new UDPReceiver(this.port, this.address);
    }

    /**
     * @typedef {import('../utils/typedefs/!EventMap').EventMap} EventMap
     */

    /**
     * @template {keyof EventMap} K
     * @param {K} event
     * @param {(data: EventMap[K]) => void} listener
     */
    on(event, listener) {
        return super.on(event, listener)
    }

    //Start listening for incoming UDP packets
    listenForPackets() {
        this.receiver.startListening((msg) => {
            this.handlePacket(msg)
        })
    }

    //Handle incoming UDP packets
    async handlePacket(rawPacket) {
        const { packet, packetName } = await handler[this.version].unPack(rawPacket)
        this.emitEvent(packet, packetName)
    }

    //Emit an event with the packet data
    emitEvent(packet, packetType) {
        switch(packetType) {
            case 'motionPacket':
                this.emit('motionPacket', packet)
            break
            case 'carDamagePacket':
                this.emit('carDamagePacket', packet)
        }
    }

    //Stop listening for incoming UDP packets
    stopListening() {
        this.receiver.stopListening()
    }
}

module.exports = F1