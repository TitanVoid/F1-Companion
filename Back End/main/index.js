/*const dgram = require('node:dgram');
const server = dgram.createSocket('udp4');
const packetFormats = require("./packetformat")

server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got a message of ${rinfo.size} bytes from ${rinfo.address}:${rinfo.port}`);
  packetFormats.getPacketFormat(msg, rinfo)
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(20777, "127.0.0.1");*/

const fs = require('fs')
const F1 = require('./F1')
const f1 = new F1({ version: 'v2023'})

const packet = fs.readFileSync('./motionPacket.bin')
f1.handlePacket(Buffer.from(packet))

//Start Listening
f1.listenForPackets();

f1.on('carDamagePacket', (packet) => {
    console.log(packet)
})