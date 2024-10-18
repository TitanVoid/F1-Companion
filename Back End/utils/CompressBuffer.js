const packetSchemes = require("./packetSchemes/!SchemeMap");
const zlib = require("zlib");

//Removes all the 0 values from the packet to reduce the size of the packet
module.exports.compressBuffer = (packetBuffer) => {

    packetScheme = packetSchemes.getPacketScheme(packetBuffer[0]); //Get the packet scheme for this batch based on the packet ID
    const reducedPackets = []; 

    packetBuffer.forEach(packet => {
        const reducedPacket = {};
        let bitmask = "";
        reducePacketSize(packet);
        const reducePacketSize = (packet) => {
            for (const key in packet) { 
                if (typeof packet[key] === 'object' && packet[key] !== null) { // If the value is an object, we call the function recursively
                    reducedPacket[key] = reducePacketSize(packet[key]); 
                } else if (packet[key] !== packetScheme[key][1]) { //If the value is not equal to the default value for that field, we add it to the reduced packet
                    reducedPacket[key] = packet[key];
                    bitmask += "1"; //If the value is not 0, we add a 1 to the bitmask to keep track of the fields that have not been deleted
                } else {
                    bitmask += "0"; //If the value is 0, we add a 0 to the bitmask to keep track of the deleted fields
                }
            }
        }
        
        valuesBuffer = packetToBuffer(reducedPacket); //Transform the packet into a buffer removing field names and keeping only the values
        while (bitmask.length%8 != 0) { //We add 0s to the bitmask to make sure it is a multiple of 8
            bitmask += "0";
        }
    
        bitmaskBuffer = Buffer.from(bitmask, "binary"); //Transform the bitmask into a buffer
        finalBuffer = Buffer.concat([bitmaskBuffer, valuesBuffer]); //Concatenate the bitmask buffer and the values buffer
        reducedPackets.push(finalBuffer); //Add the final buffer to the reduced packets
    });
    
    compressedBuffer = getCompressedBuffer(reducedPacketsBuffer); //Apply compression to the buffer
    return compressedBuffer;
};

//Transform the packet into a buffer removing field names and keeping only the values
module.exports.packetToBuffer = (packet) => {
    const values = [];

    const extractValues = (obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                extractValues(obj[key]);
            } else {
                values.push(obj[key]);
            }
        }
    };

    extractValues(packet);

    return Buffer.from(values);
};

//Apply compression to the buffer
module.exports.getCompressedBuffer = (buffer) => {
    return zlib.deflateSync(buffer);
};

// Packets will be sent in groups corresponding to a single lap being completed (or in the case of a DNF, the lap on which the driver retired).
// The group of packets will be sent to this function to be compressed 
// The compressed packets will then saved as one in the database