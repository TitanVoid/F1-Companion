/**
 * @typedef {Object} ParticipantsDataPacket
 * @property {import('./Header')} header - Header
 * @property {Number} numberActiveCars - Number of active cars in the data
 * @property {ParticipantData[]} participants - Participants data
 */

/**
 * @typedef {Object} ParticipantData
 * @property {Number} aiControlled - Whether the player is AI controlled - 0 = human, 1 = AI
 * @property {Number} driverID - Driver ID - see appendix (255 if network human)
 * @property {Number} networkID - Unique network multiplayer identifier for the player
 * @property {Number} teamID - Team ID - see appendix
 * @property {Number} myTeam - My team flag - 1 = My Team, 0 = Otherwise
 * @property {Number} raceNumber - Race number of the car
 * @property {Number} nationality - Nationality of the driver
 * @property {String} name - Name of participant in UTF-8 format – null terminated
 * @property {Number} yourTelemetry - The player's UDP setting, 0 = restricted, 1 = public
 * @property {Number} showOnlineNames - The player's UDP setting, 0 = off, 1 = on
 * @property {Number} platform - 1 = Steam, 3 = PlayStation, 4 = Xbox, 6 = Origin, 255 = unknown
 */

module.exports = ParticipantsDataPacket

/*
ID - TEAM
0 Mercedes 
1 Ferrari 
2 Red Bull Racing 
3 Williams 
4 Aston Martin 
5 Alpine 
6 Alpha Tauri 
7 Haas 
8 McLaren 
9 Alfa Romeo 
85 Mercedes 2020 
86 Ferrari 2020 
87 Red Bull 2020 
88 Williams 2020 
89 Racing Point 2020 
90 Renault 2020 
91 Alpha Tauri 2020 
92 Haas 2020 
93 McLaren 2020 
94 Alfa Romeo 2020 
95 Aston Martin DB11 V12 
96 Aston Martin Vantage F1 Edition 
97 Aston Martin Vantage Safety Car 
98 Ferrari F8 Tributo
99 Ferrari Roma 
100 McLaren 720S 
101 McLaren Artura 
102 Mercedes AMG GT Black Series Safety Car 
103 Mercedes AMG GTR Pro 
104 F1 Custom Team 
106 Prema ‘21 
107 Uni-Virtuosi ‘21 
108 Carlin ‘21 
109 Hitech ‘21 
110 Art GP ‘21 
111 MP Motorsport ‘21
112 Charouz ‘21
113 Dams ‘21
114 Campos ‘21
115 BWT ‘21
116 Trident ‘21
117 Mercedes AMG GT Black
118 Mercedes ‘22
119 Ferrari ‘22
120 Red Bull Racing ‘22
121 Williams ‘22
122 Aston Martin ‘22
123 Alpine ‘22
124 Alpha Tauri ‘22
125 Haas ‘22
126 McLaren ‘22
127 Alfa Romeo ‘22
128 Konnersport ‘22
129 Konnersport
130 Prema ‘22
131 Virtuosi ‘22
132 Carlin ‘22
133 MP Motorsport ‘22
134 Charouz ‘22
135 Dams ‘22
136 Campos ‘22
137 Van Amersfoort Racing ‘22
138 Trident ‘22
139 Hitech ‘22
140 Art GP ‘22
*/

/*
DRIVER IDS
0 Carlos Sainz 
1 Daniil Kvyat 
2 Daniel Ricciardo 
3 Fernando Alonso 
4 Felipe Massa 
6 Kimi Räikkönen 
7 Lewis Hamilton 
9 Max Verstappen 
10 Nico Hulkenburg 
11 Kevin Magnussen 
12 Romain Grosjean 
13 Sebastian Vettel 
14 Sergio Perez 
15 Valtteri Bottas 
17 Esteban Ocon 
19 Lance Stroll 
20 Arron Barnes 
21 Martin Giles 
22 Alex Murray 
23 Lucas Roth 
24 Igor Correia 
25 Sophie Levasseur 
26 Jonas Schiffer 
27 Alain Forest 
28 Jay Letourneau 
29 Esto Saari 
30 Yasar Atiyeh 
31 Callisto Calabresi 
32 Naota Izum 
33 Howard Clarke 
34 Wilheim Kaufmann 
35 Marie Laursen 
36 Flavio Nieves 
37 Peter Belousov 
38 Klimek Michalski 
39 Santiago Moreno 
40 Benjamin Coppens 
41 Noah Visser 
42 Gert Waldmuller 
43 Julian Quesada 
44 Daniel Jones 
45 Artem Markelov 
46 Tadasuke Makino 
47 Sean Gelael 
48 Nyck De Vries 
49 Jack Aitken 
50 George Russell 
51 Maximilian Günther 
52 Nirei Fukuzumi 
53 Luca Ghiotto 
54 Lando Norris 
55 Sérgio Sette Câmara 
56 Louis Delétraz 
57 Antonio Fuoco 
58 Charles Leclerc 
59 Pierre Gasly 
62 Alexander Albon 
63 Nicholas Latifi 
64 Dorian Boccolacci 
65 Niko Kari 
66 Roberto Merhi 
67 Arjun Maini 
68 Alessio Lorandi 
69 Ruben Meijer 
70 Rashid Nair 
71 Jack Tremblay 
72 Devon Butler 
73 Lukas Weber 
74 Antonio Giovinazzi 
75 Robert Kubica 
76 Alain Prost 
77 Ayrton Senna 
78 Nobuharu Matsushita 
79 Nikita Mazepin 
80 Guanya Zhou 
81 Mick Schumacher 
82 Callum Ilott 
83 Juan Manuel Correa 
84 Jordan King 
85 Mahaveer Raghunathan
86 Tatiana Calderon
87 Anthoine Hubert
88 Guiliano Alesi
89 Ralph Boschung
90 Michael Schumacher
91 Dan Ticktum
92 Marcus Armstrong
93 Christian Lundgaard
94 Yuki Tsunoda
95 Jehan Daruvala
96 Gulherme Samaia
97 Pedro Piquet
98 Felipe Drugovich
99 Robert Schwartzman
100 Roy Nissany
101 Marino Sato
102 Aidan Jackson
103 Casper Akkerman
109 Jenson Button
110 David Coulthard
111 Nico Rosberg
112 Oscar Piastri
113 Liam Lawson
114 Juri Vips
115 Theo Pourchaire
116 Richard Verschoor
117 Lirim Zendeli
118 David Beckmann
121 Alessio Deledda
122 Bent Viscaal
123 Enzo Fittipaldi
125 Mark Webber
126 Jacques Villeneuve
127 Callie Mayer
128 Noah Bell
129 Jake Hughes
130 Frederik Vesti
131 Olli Caldwell
132 Logan Sargeant
133 Cem Bolukbasi
134 Ayumu Iwasa
135 Clement Novalak
136 Jack Doohan
137 Amaury Cordeel
138 Dennis Hauger
139 Calan Williams
140 Jamie Chadwick
141 Kamui Kobayashi
142 Pastor Maldonado
143 Mika Hakkinen
144 Nigel Mansell
*/