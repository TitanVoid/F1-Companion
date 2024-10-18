/*
This packet gives details of events that happen during the course of a session.
Frequency: When the event occurs
Size: 45 bytes
Version: 1
*/

module.exports.decodeEvent = async(header, msg) => {

    const dataView = new DataView(msg.buffer);
    var offset = 29; //Size of header
    var eventData = {
        header: header,
        eventStringCode: `${dataView.getUint8(offset)}${dataView.getUint8(offset+1)}${dataView.getUint8(offset+2)}${dataView.getUint8(offset)+3}`
    } 
    switch(eventData.eventStringCode){
        case "SSTA": //Sent when the session starts
            //No additional information 
        break
        case "SEND": //Sent when the session ends
            //No additional information
        break
        case "FTLP": //When a driver achieves the fastest lap
            eventData.vehicleIndex = dataView.getUint8(offset+4); //Vehicle index of the car achieving the fastest lap
            eventData.lapTime = dataView.getFloat32(offset+5, true); //Lap time in seconds
        break
        case "RTMT": //When a driver retires
            eventData.vehicleIndex = dataView.getUint8(offset+4); //Vehicle index of car retiring
        break
        case "DRSE": //Race control have enabled DRS
            //No additional Information
        break
        case "DRSD": //Race control have disabled DRS
            //No additional Information
        break
        case "TMPT": //Your team mate has entered the pits
            eventData.vehicleIndex = dataView.getUint8(offset+4); //Vehicle index of team mate's car
        break
        case "CHQF": //The chequered flag has been waved
            //No additional Information
        break
        case "RCWN": //The race winner is announceed
            eventData.vehicleIndex = dataView.getUint8(offset+4); //Vehicle index of race winner's car
        break
        case "PENA": //A penalty has been issued
            eventData.penalty = dataView.getUint8(offset+4); //Penalty type - see below for specifics
            eventData.infringementType = dataView.getUint8(offset+5); //Infringement type - see below for specifics
            eventData.vehicleIndex = dataView.getUint8(offset+6); //Vehicle index of the car the penalty is applied to
            eventData.otherVehicleIndex = dataView.getUint8(offset+7); //Vehicle index of the other car involved
            eventData.time = dataView.getUint8(offset+8); //Time gained, or time spent doing action in seconds
            eventData.lapNumber = dataView.getUint8(offset+9); //Lap the penalty occurred on
            eventData.placesGained = dataView.getUint8(offset+10); //Number of places gained by this
        break
        case "SPTP": //Speed trap has been triggered by fastest speed
            eventData.vehicleIndex = dataView.getUint8(offset+4); //Vehicle index of the car triggering speed trap
            eventData.speed = dataView.getFloat32(offset+5, true); //Top speed achieved in kilometres per hour
            eventData.isOverallFastestInSession = dataView.getUint8(offset+9); //1 = Fastest, 0 = Not fastest
            eventData.isDriverFastestInSession = dataView.getUint8(offset+10); //1 = Fastest speed for the driver this session, 0 = not fastest
            eventData.fastestSpeedInSession = dataView.getFloat32(offset+11, true); //Speed of the vehicle that is the fastest in this session
        break
        case "STLG": //Start Lights - number showed
            eventData.numberLights = dataView.getUint8(offset+4); //Number of lights showing
        break
        case "LGOT": //Lights Out (Start of race)
            //No additional Information
        break
        case "DTSV": //Drive through penalty served
            eventData.vehicleIndex = dataView.getUint8(offset+4); //Vehicle index of car serving drive through penalty
        break
        case "SGSV": //Stop And Go Penalty served
            eventData.vehicleIndex = dataView.getUint8(offset+4); //Vehicle index of car serving stop and go penalty
        break
        case "FLBK": //Flashback activated
            eventData.flashbackFrameIdentifier = dataView.getUint32(offset+4, true); //Frame identifier flashed back to
            eventData.flashbackSessionTime = dataView.getFloat32(offset+8, true); //Session time flashed back to
        break
        case "BUTN": //Button Status Changed
            eventData.buttonStatus = dataView.getUint32(offset+4, true); //Bit flags specifying which buttons are being pressed currently - see below for details
        break
        case "RDFL": //Red Flag showed
            //No additional Information
        break
        case "OVTK": //Overtake occurred
            eventData.overtakingVehicleIndex = dataView.getUint8(offset+4); //Vehicle index of the car overtaking
            eventData.beingOvertakenVehicleIndex = dataView.getUint8(offset+5); //Vehicle index of the car being overtaken
        break
    }

    return eventData;
}

/*
PENALTY TYPES
0 Drive through
1 Stop Go
2 Grid penalty
3 Penalty reminder
4 Time penalty
5 Warning
6 Disqualified
7 Removed from formation lap
8 Parked too long timer
9 Tyre regulations
10 This lap invalidated
11 This and next lap invalidated
12 This lap invalidated without reason
13 This and next lap invalidated without reason
14 This and previous lap invalidated
15 This and previous lap invalidated without reason
16 Retired
17 Black flag timer
*/

/*
ID Infringement meaning
0 Blocking by slow driving
1 Blocking by wrong way driving
2 Reversing off the start line
3 Big Collision
4 Small Collision
5 Collision failed to hand back position single
6 Collision failed to hand back position multiple
7 Corner cutting gained time
8 Corner cutting overtake single
9 Corner cutting overtake multiple
10 Crossed pit exit lane
11 Ignoring blue flags
12 Ignoring yellow flags
13 Ignoring drive through
14 Too many drive throughs
15 Drive through reminder serve within n laps
16 Drive through reminder serve this lap
17 Pit lane speeding
18 Parked for too long
19 Ignoring tyre regulations
20 Too many penalties
21 Multiple warnings
22 Approaching disqualification
23 Tyre regulations select single
24 Tyre regulations select multiple
25 Lap invalidated corner cutting
26 Lap invalidated running wide
27 Corner cutting ran wide gained time minor
28 Corner cutting ran wide gained time significant
29 Corner cutting ran wide gained time extreme
30 Lap invalidated wall riding
31 Lap invalidated flashback used
32 Lap invalidated reset to track
33 Blocking the pitlane
34 Jump start
35 Safety car to car collision
36 Safety car illegal overtake
37 Safety car exceeding allowed pace
38 Virtual safety car exceeding allowed pace
39 Formation lap below allowed speed
40 Formation lap parking
41 Retired mechanical failure
42 Retired terminally damaged
43 Safety car falling too far back
44 Black flag timer
45 Unserved stop go penalty
46 Unserved drive through penalty
47 Engine component change
48 Gearbox change
49 Parc Fermé change
50 League grid penalty
51 Retry penalty
52 Illegal time gain
53 Mandatory pitstop
54 Attribute assigned
*/

/*
Bit Flag Button
0x00000001 Cross or A
0x00000002 Triangle or Y
0x00000004 Circle or B
0x00000008 Square or X
0x00000010 D-pad Left
0x00000020 D-pad Right
0x00000040 D-pad Up
0x00000080 D-pad Down
0x00000100 Options or Menu
0x00000200 L1 or LB
0x00000400 R1 or RB
0x00000800 L2 or LT
0x00001000 R2 or RT
0x00002000 Left Stick Click
0x00004000 Right Stick Click
0x00008000 Right Stick Left
0x00010000 Right Stick Right
0x00020000 Right Stick Up
0x00040000 Right Stick Down
0x00080000 Special
0x00100000 UDP Action 1
0x00200000 UDP Action 2
0x00400000 UDP Action 3
0x00800000 UDP Action 4
0x01000000 UDP Action 5
0x02000000 UDP Action 6
0x04000000 UDP Action 7
0x08000000 UDP Action 8
0x10000000 UDP Action 9
0x20000000 UDP Action 10
0x40000000 UDP Action 11
0x80000000 UDP Action 12
*/