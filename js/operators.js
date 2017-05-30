var myOps = 
[
{"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_id":2,"oper_desc":"> (Greater Than)","sql_oper":">"},
{"oper_id":3,"oper_desc":"< (Less Than)","sql_oper":"<"},
{"oper_id":4,"oper_desc":">= (Grtr or Eql)","sql_oper":">="},
{"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_id":7,"oper_desc":"Between","sql_oper":"Between"}
];


var myMap = new Map();

myMap.set("1", myOps);

myMap.get("1");

var iterable = new Map(
[
  ['a',1],
  ['b',2],
  ['c',3]
]
);


var myMap2 = new Map( [
["1",
[ 
{"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_id":2,"oper_desc":"> (Greater Than)","sql_oper":">"},
{"oper_id":3,"oper_desc":"< (Less Than)","sql_oper":"<"},
{"oper_id":4,"oper_desc":">= (Grtr or Eql)","sql_oper":">="},
{"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_id":7,"oper_desc":"Between","sql_oper":"Between"}
]],
["2",
[
{"oper_grp_id":2,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":2,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"}
]],
["3",
[
{"oper_grp_id":3,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":3,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_grp_id":3,"oper_id":7,"oper_desc":"Between","sql_oper":"Between"}
]],
["4",  
[
{"oper_grp_id":4,"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_grp_id":4,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="}
]],
["5",
[
{"oper_grp_id":5,"oper_id":9,"oper_desc":"Has","sql_oper":"HAS"}
]], 
["6",
[
{"oper_grp_id":6,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="}
]],
["7",
[
{"oper_grp_id":7,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":7,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_grp_id":7,"oper_id":7,"oper_desc":"Between","sql_oper":"Between"}
]],
["8",
[
{"oper_grp_id":8,"oper_id":8,"oper_desc":"Like","sql_oper":"Like"},
{"oper_grp_id":8,"oper_id":10,"oper_desc":"Not Like","sql_oper":"Not Like"}
]],
[
"9",
[
{"oper_grp_id":9,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":9,"oper_id":2,"oper_desc":"> (Greater Than)","sql_oper":">"},
{"oper_grp_id":9,"oper_id":3,"oper_desc":"< (Less Than)","sql_oper":"<"},
{"oper_grp_id":9,"oper_id":4,"oper_desc":">= (Grtr or Eql)","sql_oper":">="},
{"oper_grp_id":9,"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_grp_id":9,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_grp_id":9,"oper_id":7,"oper_desc":"Between","sql_oper":"Between"},
{"oper_grp_id":9,"oper_id":11,"oper_desc":"Is Null","sql_oper":"IS NULL"},
{"oper_grp_id":9,"oper_id":12,"oper_desc":"Is Not Null","sql_oper":"IS NOT NULL"}
]],
["10",
[
{"oper_grp_id":10,"oper_id":13,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},

{"oper_grp_id":11,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":11,"oper_id":2,"oper_desc":"> (Greater Than)","sql_oper":">"},
{"oper_grp_id":11,"oper_id":3,"oper_desc":"< (Less Than)","sql_oper":"<"},
{"oper_grp_id":11,"oper_id":4,"oper_desc":">= (Grtr or Eql)","sql_oper":">="},
{"oper_grp_id":11,"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_grp_id":11,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_grp_id":12,"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_grp_id":12,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":12,"oper_id":7,"oper_desc":"Between","sql_oper":"Between"}
]
]
  ]);


myMap2.get("9");

var opermap = JSON.stringify( myMap2 );
window.localStorage.setItem("gqas.operators", opermap );

var myMap = {
"1":
[ 
{"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_id":2,"oper_desc":"> (Greater Than)","sql_oper":">"},
{"oper_id":3,"oper_desc":"< (Less Than)","sql_oper":"<"},
{"oper_id":4,"oper_desc":">= (Grtr or Eql)","sql_oper":">="},
{"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_id":7,"oper_desc":"Between","sql_oper":"Between"}
],
"2":
[
{"oper_grp_id":2,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":2,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"}
],
"3":
[
{"oper_grp_id":3,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":3,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_grp_id":3,"oper_id":7,"oper_desc":"Between","sql_oper":"Between"}
],
"4":
[
{"oper_grp_id":4,"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_grp_id":4,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="}
],
"5":
[
{"oper_grp_id":5,"oper_id":9,"oper_desc":"Has","sql_oper":"HAS"}
], 
"6":
[
{"oper_grp_id":6,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="}
],
"7":
[
{"oper_grp_id":7,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":7,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_grp_id":7,"oper_id":7,"oper_desc":"Between","sql_oper":"Between"}
],
"8":
[
{"oper_grp_id":8,"oper_id":8,"oper_desc":"Like","sql_oper":"Like"},
{"oper_grp_id":8,"oper_id":10,"oper_desc":"Not Like","sql_oper":"Not Like"}
],
"9":
[
{"oper_grp_id":9,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":9,"oper_id":2,"oper_desc":"> (Greater Than)","sql_oper":">"},
{"oper_grp_id":9,"oper_id":3,"oper_desc":"< (Less Than)","sql_oper":"<"},
{"oper_grp_id":9,"oper_id":4,"oper_desc":">= (Grtr or Eql)","sql_oper":">="},
{"oper_grp_id":9,"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_grp_id":9,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_grp_id":9,"oper_id":7,"oper_desc":"Between","sql_oper":"Between"},
{"oper_grp_id":9,"oper_id":11,"oper_desc":"Is Null","sql_oper":"IS NULL"},
{"oper_grp_id":9,"oper_id":12,"oper_desc":"Is Not Null","sql_oper":"IS NOT NULL"}
],
"10":
[
{"oper_grp_id":10,"oper_id":13,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_grp_id":11,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":11,"oper_id":2,"oper_desc":"> (Greater Than)","sql_oper":">"},
{"oper_grp_id":11,"oper_id":3,"oper_desc":"< (Less Than)","sql_oper":"<"},
{"oper_grp_id":11,"oper_id":4,"oper_desc":">= (Grtr or Eql)","sql_oper":">="},
{"oper_grp_id":11,"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_grp_id":11,"oper_id":6,"oper_desc":"<> (Not Equal)","sql_oper":"<>"},
{"oper_grp_id":12,"oper_id":5,"oper_desc":"<= (Less or Eql)","sql_oper":"<="},
{"oper_grp_id":12,"oper_id":1,"oper_desc":"= (Equals)","sql_oper":"="},
{"oper_grp_id":12,"oper_id":7,"oper_desc":"Between","sql_oper":"Between"}
]
};

myMap["9"];

window.localStorage.setItem("gqas.operators", JSON.stringify( myMap ));

//window.localStorage;

var opermap = JSON.parse( window.localStorage.getItem("gqas.operators") );

opermap["9"];
opermap["8"];

