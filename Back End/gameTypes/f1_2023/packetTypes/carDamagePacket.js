/*
This packet details car damage parameters for all the cars in the race.
Frequency: 10 per second
Size: 953 bytes
Version: 1
*/
module.exports.decodeCarDamage = async (header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29; //size of header
    carDamagePacket = {
        header: header,
        carDamageData: []
    }

    for (i = 0; i < 22; i++){

        singleCarDamage = {
            tyresWear: [dataView.getFloat32(offset, true), dataView.getFloat32(offset+4, true), dataView.getFloat32(offset+8, true), dataView.getFloat32(offset+12, true)], // Tyre wear (percentage)
            tyresDamage: [dataView.getUint8(offset+16), dataView.getUint8(offset+17), dataView.getUint8(offset+18), dataView.getUint8(offset+19)], // Tyre damage (percentage)
            brakesDamage: [dataView.getUint8(offset+20), dataView.getUint8(offset+21), dataView.getUint8(offset+22), dataView.getUint8(offset+23)], // Brakes damage (percentage)
            frontLeftWingDamage: dataView.getUint8(offset+24), // Front left wing damage (percentage)
            frontRightWingDamage: dataView.getUint8(offset+25), // Front right wing damage (percentage)
            rearWingDamage: dataView.getUint8(offset+26), // Rear wing damage (percentage)
            floorDamage: dataView.getUint8(offset+27), // Floor damage (percentage)
            diffuserDamage: dataView.getUint8(offset+28), // Diffuser damage (percentage)
            sidepodDamage: dataView.getUint8(offset+29), // Sidepod damage (percentage)
            drsFault: dataView.getUint8(offset+30), // Indicator for DRS fault, 0 = OK, 1 = fault
            ersFault: dataView.getUint8(offset+31), // Indicator for ERS fault, 0 = OK, 1 = fault
            gearBoxDamage: dataView.getUint8(offset+32), // Gear box damage (percentage)
            engineDamage: dataView.getUint8(offset+33), // Engine damage (percentage)
            engineMGUHWear: dataView.getUint8(offset+34), // Engine wear MGU-H (percentage)
            engineESWear: dataView.getUint8(offset+35), // Engine wear ES (percentage)
            engineCEWear: dataView.getUint8(offset+36), // Engine wear CE (percentage)
            engineICEWear: dataView.getUint8(offset+37), // Engine wear ICE (percentage)
            engineMGUKWear: dataView.getUint8(offset+38), // Engine wear MGU-K (percentage)
            engineTCWear: dataView.getUint8(offset+39), // Engine wear TC (percentage)
            engineBlown: dataView.getUint8(offset+40), // Engine blown, 0 = OK, 1 = fault
            engineSeized: dataView.getUint8(offset+41) // Engine seized, 0 = OK, 1 = fault
        }

        offset += 42;
        carDamagePacket.carDamageData.push(singleCarDamage);
    }

    return carDamagePacket
}