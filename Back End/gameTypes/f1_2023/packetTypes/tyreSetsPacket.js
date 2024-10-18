/*
This packets gives a more in-depth details about tyre sets assigned to a vehicle during the session.
Frequency: 20 per second but cycling through cars
Size: 231 bytes
Version: 1
*/
module.exports.decodeTyreSets = async (header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29; //size of header
    tyreSetsPacket = {
        header: header,
        carIndex: dataView.getUint8(offset), //Index of the car this data relates to
        tyreSetData: [], //20 sets, 13 dry and 7 wet
        fittedIndex: dataView.getUint8(offset+230) //Index into array of fitted tyre
    }

    offset += 1;
    for (i = 0; i < 20; i++){
        individualTyreSetData = {
            actualTyreCompound: dataView.getUint8(offset), //Actual tyre compound used
            visualTyreCompound: dataView.getUint8(offset+1), //Visual tyre compound used
            wear: dataView.getUint8(offset+2), //Tyre wear (percentage)
            available: dataView.getUint8(offset+3), //Whether this set is currently available
            recommendedSession: dataView.getUint8(offset+4), //Recommended session for tyre set
            lifeSpan: dataView.getUint8(offset+5), //Laps left in this tyre set
            usableLife: dataView.getUint8(offset+6), //Max number of laps recommended for this compound
            lapDeltaTime: dataView.getInt16(offset+7, true), //Lap delta time in milliseconds compared to fitted set
            fitted: dataView.getUint8(offset+9) //Whether the set is fitted or not
        }

        offset += 10;
        tyreSetsPacket.tyreSetData.push(individualTyreSetData);
    }

    return tyreSetsPacket;
}