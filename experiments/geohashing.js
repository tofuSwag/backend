var geohash = require('ngeohash');


            

// console.log("Encoding 28.451590, 77.521505", geohash.encode(28.451590, 77.521505));

// var latlon = geohash.decode('ttp1u53qtbz9');
// console.log("\ndecoding ttp1u53qtbz9")
// console.log(latlon.latitude);
// console.log(latlon.longitude);


// rahul's home address: 28.572011, 77.332162
let greaternoida = geohash.encode(28.451590, 77.521505)
let rahul = geohash.encode(28.570612, 77.332341)
let tgip = geohash.encode(28.566849, 77.324900);
let khanm = geohash.encode(28.600241, 77.227168)
let kailash = geohash.encode(28.577195, 77.331072);

console.log("rahul's home address", rahul);
console.log("TGIP address", tgip);
console.log("khan market address", khanm);
console.log("kailash", kailash)
console.log("greater noida", greaternoida)

console.log("\nrahul's neighbours")
console.log(geohash.neighbors(rahul))

/*
Findings: Will search for 4 char match, but hash the whole location


rahul's home address ttnfx9pey
TGIP address ttnfx86mb
khan market address ttnftqe07
kailash ttnfxdqf0
greater noida ttp1u53qt

rahul's neighbours
[
  'ttnfx9psn',
  'ttnfx9psp',
  'ttnfx9pez',
  'ttnfx9pex',
  'ttnfx9pew',
  'ttnfx9pet',
  'ttnfx9pev',
  'ttnfx9psj'
]
*/