const dgram = require('dgram')

class UDPReceiver {

    constructor(port, address) {
        this.port = port
        this.address = address
        this.server = dgram.createSocket('udp4')
    }

    //Start listening for incoming UDP packets
    startListening(callback) {
        this.server.on('listening', (msg, rinfo) => {
            callback(msg, rinfo)
        })

        this.server.bind(this.port, this.address)
    }

    //Stop listening for incoming UDP packets
    stopListening() {
        this.server.close()
    }
}

module.exports = UDPReceiver