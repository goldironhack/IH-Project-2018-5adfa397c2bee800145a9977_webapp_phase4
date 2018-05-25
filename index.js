const API_KEY = "AIzaSyAmsoNWToucbKC9uArndPzSpqS15bITqTM";
const DISTRICTS_URL = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
const CENTER_URL = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const HOUSING_URL = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
const CRIMES_URL = "https://data.cityofnewyork.us/api/views/qgea-i56i/rows.json?accessType=DOWNLOAD";
const MUSEUMS_URL = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
const GALLERIES_URL = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD";
var count2=1;
var count=0;
var bronxCount=1;
var brooklynCount=1;
var manhattanCount=1;
var queensCount=1;
var stIslandCount=1;

var disPicker;

var bronxMCount=1;
var brooklynMCount=1;
var manhattanMCount=1;
var queensMCount=1;
var stIslandMCount=1;
var newCount=1;

var bronxGCount=1;
var brooklynGCount=1;
var manhattanGCount=1;
var queensGCount=1;
var stIslandGCount=1;

var ver;
var verBronx;
var verBrooklyn;
var verManhattan;
var verQueens;
var verStIsland;

var verBronxM;
var verBrooklynM;
var verManhattanM;
var verQueensM;
var verStIslandM;
var verNew;

var verBronxG;
var verBrooklynG;
var verManhattanG;
var verQueensG;
var verStIslandG;

var map;

var ny_coordinates = {lat:40.703092,lng:-73.989741};
var u_coordinates = {lat:40.7291,lng:-73.9965};
var u_marker;

var centroides = [];
var housing = [];
var museums = [];
var galleries = [];
var markers = [];
var crimes = [];

var latV=[];
var longV=[];
var latVMuseum=[];
var longVMuseum=[];
var latVGalleries=[];
var longVGalleries=[];
var latVHouses = [];
var longVHouses = [];

var alterable;
var nei_coordinates;
var mark_coordinates;

var bronx = [];
var brooklyn = [];
var manhattan = [];
var queens = [];
var stIsland = [];

var bronxM = [];
var brooklynM = [];
var manhattanM = [];
var queensM = [];
var stIslandM = [];
var newYorkM = [];

var bronxG = [];
var brooklynG = [];
var manhattanG = [];
var queensG = [];
var stIslandG = [];

var bronxNei = [];
var brooklynNei = [];
var manhattanNei = [];
var queensNei = [];
var stIslandNei = [];
// var markerNei;
var museumsBronx = [];
var museumsBrooklyn = []
var museumsManhattan = [];
var museumsQueens = [];
var museumsStIsland = [];
var museumsNewYork = [];

var markerBronx = [];
var markerBrooklyn = [];
var markHoodsBrooklynx;
var markerManhattan = [];
var markHoodsManhattan;
var markerQueens = [];
var markHoodsQueens;
var markerStIsland = [];
var markHoodsStIsland;

var markerBronxM = [];
var markerBrooklynM = [];
var markerManhattanM = [];
var markerQueensM = [];
var markerStIslandM = [];
var markerNewYorkM = [];

var markerBronxH = [];
var markerBrooklynH = [];
var markerManhattanH = [];
var markerQueensH = [];
var markerStIslandH = [];

var housingBronx = [];
var housingBrooklyn = [];
var housingManhattan = [];
var housingQueens = [];
var housingStIsland = [];

var bronxH = [];
var brooklynH = [];
var manhattanH = [];
var queensH = [];
var stIslandH = [];

function getHousingData() {
  var data = $.get(HOUSING_URL, function(){})
    .done(function () {
    //console.log(data.responseJSON.data);
    for (var i = 0; i < data.responseJSON.data.length; i++) {
      if(data.responseJSON.data[i][9]!="CONFIDENTIAL"){
        var disAlterable = data.responseJSON.data[i][19];
        disAlterable=disAlterable.slice(3,7);
        housing.push([data.responseJSON.data[i][15],Number(disAlterable),data.responseJSON.data[i][9],data.responseJSON.data[i][14],data.responseJSON.data[i][23],data.responseJSON.data[i][24]]);
      }
    }

    for (var j = 0; j < housing.length; j++) {
      //console.log(housing[j]);
      if(housing[j][0]=="Bronx"){
        bronxH.push(j)
        housingBronx.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
        latVHouses.push(housing[j][4]);
        longVHouses.push(housing[j][5]);
      }else if(housing[j][0]=="Brooklyn"){
        brooklynH.push(j)
        housingBrooklyn.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
        latVHouses.push(housing[j][4]);
        longVHouses.push(housing[j][5]);
      }else if(housing[j][0]=="Manhattan"){
        manhattanH.push(j)
        housingManhattan.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
        latVHouses.push(housing[j][4]);
        longVHouses.push(housing[j][5]);
      }else if(housing[j][0]=="Queens"){
        queensH.push(j)
        housingQueens.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
        latVHouses.push(housing[j][4]);
        longVHouses.push(housing[j][5]);
      }else if(housing[j][0]=="Staten Island"){
        stIslandH.push(j)
        housingStIsland.push([housing[j][0],housing[j][1],housing[j][2],housing[j][3]]);
        latVHouses.push(housing[j][4]);
        longVHouses.push(housing[j][5]);
      }
    }

    // for (var v = 0; v < housingBronx.length; v++) {
    //     console.log(housingBronx[v]);
    //
    // }

    })
    .fail(function(error) {
      console.log(error);
    })
}

function tableHousing(){

  tableReference = $("#tableH")[0];
  var newRow, boro, dis, name, street;

  for (var i = 0; i < housingBronx.length; i++) {
    newRow = tableReference.insertRow(tableReference.rows.length);
    boro = newRow.insertCell();
    dis = newRow.insertCell();
    name = newRow.insertCell();
    street = newRow.insertCell();
    boro.innerHTML = "Bronx";
    dis.innerHTML = housingBronx[i][1];
    name.innerHTML = housingBronx[i][2];
    street.innerHTML = housingBronx[i][3];

  }
}

function showHousingBronx() {

    for (var i = 0; i < bronxH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[bronxH[i]]), lng:Number(longVHouses[bronxH[i]])},
        map: map
        })

        markerBronxH.push(markHouses);
    }

}

function showHousingBrooklyn() {

    for (var i = 0; i < brooklynH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[brooklynH[i]]), lng:Number(longVHouses[brooklynH[i]])},
        map: map
        })

        markerBrooklynH.push(markHouses);
    }

}

function showHousingManhattan() {

    for (var i = 0; i < manhattanH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[manhattanH[i]]), lng:Number(longVHouses[manhattanH[i]])},
        map: map
        })

        markerManhattanH.push(markHouses);
    }

}

function showHousingQueens() {

    for (var i = 0; i < queensH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[queensH[i]]), lng:Number(longVHouses[queensH[i]])},
        map: map
        })

        markerQueensH.push(markHouses);
    }

}

function showHousingStIsland() {

    for (var i = 0; i < stIslandH.length; i++) {
        var markHouses = new google.maps.Marker({
        position: {lat:Number(latVHouses[stIslandH[i]]), lng:Number(longVHouses[stIslandH[i]])},
        map: map
        })

        markerStIslandH.push(markHouses);
    }

}

function getMuseumsData() {
  var data = $.get(MUSEUMS_URL, function(){})
    .done(function () {

      var alterableM;

      //console.log(data.responseJSON.data);

      for (var i = 0; i < data.responseJSON.data.length; i++) {
        museums.push([data.responseJSON.data[i][9],data.responseJSON.data[i][12],data.responseJSON.data[i][14],data.responseJSON.data[i][10],data.responseJSON.data[i][11],data.responseJSON.data[i][8]]);
      }

      for (var j = 0; j < museums.length; j++) {

        alterableM=museums[j][5];
      //  console.log(alterableM);
        latVMuseum[j]=alterableM.toString().slice(alterableM.length-19,alterableM.length-2);

        if (latVMuseum[j].charAt(0)=="0") {
          latVMuseum[j] = 4 + latVMuseum[j];
        }

        longVMuseum[j]=alterableM.toString().substring(7,24);

        if (museums[j][2]=="Bronx") {
          bronxM.push(j);
          museumsBronx.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        //  console.log(museumsBronx[j]);
      }else if (museums[j][2]=="Brooklyn"/*||museums[j][2]=="Kings"*/) {
          brooklynM.push(j);
          museumsBrooklyn.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        // console.log(museumsBrooklyn[j]);
        }else if (museums[j][2]=="Manhattan") {
          manhattanM.push(j);
          museumsManhattan.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        // console.log(museumsManhattan[j]);
        }else if (museums[j][2]=="Queens") {
          queensM.push(j);
          museumsQueens.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        //  console.log(museumsQueens[j]);
        }else if (museums[j][2]=="Staten Island") {
          stIslandM.push(j);
          museumsStIsland.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
        // console.log(museumsStIsland[j]);
      }else if (museums[j][2]=="New York") {
          newYorkM.push(j)
          museumsNewYork.push(museums[j][0],museums[j][1],museums[j][2],museums[j][3],museums[j][4]);
      }
        //console.log(museumsManhattan[j]);
      }
    })

    .fail(function(error){
      console.log(error);
    })

}

function showMBronx() {

  if (verBronxM!=0) {
    for (var i = 0; i < bronxM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[bronxM[i]]), lng:Number(longVMuseum[bronxM[i]])},
      map: map
      })

      markerBronxM.push(markMuseums);
    }

  }
  else if (verBronxM==0) {
    for (var i = 0; i < markerBronxM.length; i++) {
        markerBronxM[i].setMap(null);
      }
    }

    bronxMCount=bronxMCount+1;
    verBronxM=bronxMCount%2;

}

function showMBrooklyn() {

  if (verBrooklynM!=0) {
    for (var i = 0; i < bronxM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[brooklynM[i]]), lng:Number(longVMuseum[brooklynM[i]])},
      map: map
      })

      markerBrooklynM.push(markMuseums);
    }

  }
  else if (verBrooklynM==0) {
    for (var i = 0; i < markerBrooklynM.length; i++) {
        markerBrooklynM[i].setMap(null);
      }
    }

    brooklynMCount=brooklynMCount+1;
    verBrooklynM=brooklynMCount%2;

}

function showMNew() {

  if (verNew!=0) {
    for (var i = 0; i < newYorkM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[newYorkM[i]]), lng:Number(longVMuseum[newYorkM[i]])},
      map: map
      })

      markerNewYorkM.push(markMuseums);
    }

  }
  else if (verNew==0) {
    for (var i = 0; i < markerNewYorkM.length; i++) {
        markerNewYorkM[i].setMap(null);
      }
    }

    newCount=newCount+1;
    verNew=newCount%2;

}

function showMQueens() {

  if (verQueensM!=0) {
    for (var i = 0; i < queensM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[queensM[i]]), lng:Number(longVMuseum[queensM[i]])},
      map: map
      })

      markerQueensM.push(markMuseums);
    }

  }
  else if (verQueensM==0) {
    for (var i = 0; i < markerQueensM.length; i++) {
        markerQueensM[i].setMap(null);
      }
    }

    queensMCount=queensMCount+1;
    verQueensM=queensMCount%2;

}


function showMStIsland() {

  if (verStIslandM!=0) {
    for (var i = 0; i < stIslandM.length; i++) {
      var markMuseums = new google.maps.Marker({
      position: {lat:Number(latVMuseum[stIslandM[i]]), lng:Number(longVMuseum[stIslandM[i]])},
      map: map
      })

      markerStIslandM.push(markMuseums);
    }

  }
  else if (verStIslandM==0) {
    for (var i = 0; i < markerStIslandM.length; i++) {
        markerStIslandM[i].setMap(null);
      }
    }

    stIslandMCount=stIslandMCount+1;
    verStIslandM=stIslandMCount%2;

}




function getGalleriesData() {
  var data = $.get(GALLERIES_URL, function(){})
    .done(function () {
//    console.log(data.responseJSON.data);
    for (var i = 0; i < data.responseJSON.data.length; i++) {
      galleries.push([data.responseJSON.data[i]]);
    }
    })
}

function getCrimesData() {
  var data = $.get(CRIMES_URL, function(){})
    .done(function () {
      console.log(data.responseJSON.data);
      for (var i = 0; i < data.responseJSON.data.length; i++) {
        crimes.push([data.responseJSON.data[i]]);
      }
      for (var j = 0; j < array.length; j++) {
        console.log(crimes[j]);
      }
    })
}

function getCenterData() {
  var data = $.get(CENTER_URL, function (){})
    .done(function (){
    //  console.log(data.responseJSON.data);
      for(var i=0; i< data.responseJSON.data.length; i++){
        centroides.push([data.responseJSON.data[i][16],data.responseJSON.data[i][10],data.responseJSON.data[i][9]]);
      }

      for (var j = 0; j < data.responseJSON.data.length; j++) {
        alterable=centroides[j][2];
        //console.log(alterable);
        latV[j]=alterable.toString().slice(alterable.length-19,alterable.length-2);
        /*if ((latV.charAt(0)==4)&&(latV.charAt(1)==" ")) {
          latV.slice(2,latV.length);
        }*/
        if (latV[j].charAt(0)=="0") {
          latV[j] = 4 + latV[j];
        }
        //console.log(latV);
        longV[j]=alterable.toString().substring(7,24);
        //console.log(longV);
        nei_coordinates="{lat:"+Number(latV)+", lng:"+Number(longV)+"}";
        //console.log(nei_coordinates);
        markers.push(nei_coordinates);

        if (centroides[j][0]=="Bronx") {
          bronx.push(j);
          bronxNei.push(centroides[j][1]);
          //console.log(bronxNei[j]);
        }else if (centroides[j][0]=="Brooklyn") {
          brooklyn.push(j);
          brooklynNei.push(centroides[j][1]);
        //  console.log(brooklynNei[j]);
        }else if (centroides[j][0]=="Manhattan") {
          manhattan.push(j);
          manhattanNei.push(centroides[j][1]);
        //  console.log(manhattanNei[j]);
        }else if (centroides[j][0]=="Queens") {
          queens.push(j);
          queensNei.push(centroides[j][1]);
          //console.log(queensNei[j]);
        }else if (centroides[j][0]=="Staten Island") {
          stIsland.push(j);
          stIslandNei.push(centroides[j][1]);
        //  console.log(stIslandNei[j]);
        }


        /*var markerNei = new google.maps.Marker({
        position: {lat:Number(latV), lng:Number(longV)},
        map: map
      });*/



      }

      // for (var j = 0; j < brooklynNei.length; j++) {
      //   console.log(bronxNei[j]);
      //   console.log(brooklynNei[j]);
      //   console.log(manhattanNei[j]);
      //   console.log(queensNei[j]);
      //   console.log(stIslandNei[j]);
      // }
      })
    .fail(function(error){
      console.log(error);
    })
}

//35




function coloresRandom(){
  var color = ["#023fa5", "#7d87b9", "#bec1d4", "#d6bcc0", "#bb7784", "#8e063b", "#4a6fe3", "#8595e1", "#b5bbe3", "#e6afb9", "#e07b91", "#d33f6a", "#11c638", "#8dd593", "#c6dec7", "#ead3c6", "#f0b98d", "#ef9708", "#0fcfc0"];
  return color[Math.floor(Math.random()*color.length)];
}
function uMarker(){
  // var image ={
  //   url: "https://png.icons8.com/metro/1600/university.png",
  //   size: new google.maps.Size(20, 32),
  //   origin: new google.maps.Point(0, 0),
  //   anchor: new google.maps.Point(0, 32)
  // }
  if (ver!=0) {
      u_marker = new google.maps.Marker({
      position: u_coordinates,
      map: map,
      icon : "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });

  }
  else if (ver==0) {
      u_marker.setMap(null);

  }
    count2=count2+1;
    ver=count2%2;

}

// function getDistrictsData() {
//   var data = $.get(DISTRICTS_URL, function(){})
//     .done(function () {
//     console.log(data.responseJSON.data);
//     /*for (var i = 0; i < data.responseJSON.data.length; i++) {
//       housing.push([data.responseJSON.data[i]]);
//     } */
//     })
// }

function districts() {
  if (count==0) {
    map.data.loadGeoJson(DISTRICTS_URL);
    map.data.setStyle(function(feature) {
      var color = coloresRandom();
      return {
        fillColor: color,
        strokeWeight: 1
      };
    });
  }
  count=+1;
}

function markerEvents(marker) {
  if(marker!="undefined"){
    marker.addListener("click",function () {
      getRoute();
    });
  }
}

function getRoute() {
  var request = {
    origin: ny_marker.position,
    destination: bro_marker.position,
    travelMode: 'DRIVING'
  }
  directionsRenderer.setMap(map);
  directionsService.route(request, function(result,status){
    if(status=="OK"){
      directionsRenderer.setDirections(result);
    }
  })
}

/*$("document").ready(function(){
  $("#showU").on("click",uMarker)
  $("#showDistricts").on("click",districts)
  $("#getCenterData").on("click",getCenterData)
  //$("#getNei").on("click",showNei)
});*/

function showNeiBronx() {

  if (verBronx!=0) {
    for (var i = 0; i < bronx.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[bronx[i]]), lng:Number(longV[bronx[i]])},
      map: map
      })
      markerBronx.push(markHoods);
    }

  }
  else if (verBronx==0) {
    for (var i = 0; i < markerBronx.length; i++) {
        markerBronx[i].setMap(null);
      }
    }

    bronxCount=bronxCount+1;
    verBronx=bronxCount%2;
}

function showNeiBrooklyn() {

  if (verBrooklyn!=0) {
    for (var i = 0; i < brooklyn.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[brooklyn[i]]), lng:Number(longV[brooklyn[i]])},
      map: map
      })
      markerBrooklyn.push(markHoods);
    }

  }
  else if (verBrooklyn==0) {
    for (var i = 0; i < markerBrooklyn.length; i++) {
        markerBrooklyn[i].setMap(null);
      }
    }

    brooklynCount=brooklynCount+1;
    verBrooklyn=brooklynCount%2;
  /*for (var i = 0; i < bronx.length; i++) {
    var markerNei = new google.maps.Marker({
    position: {lat:Number(latV[brooklyn[i]]), lng:Number(longV[brooklyn[i]])},
    map: map
    })
  }*/
}

function showNeiManhattan() {

  if (verManhattan!=0) {
    for (var i = 0; i < manhattan.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[manhattan[i]]), lng:Number(longV[manhattan[i]])},
      map: map
      })
      markerManhattan.push(markHoods);
    }

  }
  else if (verManhattan==0) {
    for (var i = 0; i < markerManhattan.length; i++) {
        markerManhattan[i].setMap(null);
      }
    }

    manhattanCount=manhattanCount+1;
    verManhattan=manhattanCount%2;
  /*for (var i = 0; i < manhattan.length; i++) {
    var markerNei = new google.maps.Marker({
    position: {lat:Number(latV[manhattan[i]]), lng:Number(longV[manhattan[i]])},
    map: map
    })
  }*/
}

function showNeiQueens() {

  if (verQueens!=0) {
    for (var i = 0; i < queens.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[queens[i]]), lng:Number(longV[queens[i]])},
      map: map
      })
      markerQueens.push(markHoods);
    }

  }
  else if (verQueens==0) {
    for (var i = 0; i < markerQueens.length; i++) {
        markerQueens[i].setMap(null);
      }
    }

    queensCount=queensCount+1;
    verQueens=queensCount%2;
  /*for (var i = 0; i < queens.length; i++) {
    var markerNei = new google.maps.Marker({
    position: {lat:Number(latV[queens[i]]), lng:Number(longV[queens[i]])},
    map: map
    })
  }*/
}

function showNeiStIsland() {

  if (verStIsland!=0) {
    for (var i = 0; i < stIsland.length; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(latV[stIsland[i]]), lng:Number(longV[stIsland[i]])},
      map: map
      })
      markerStIsland.push(markHoods);
    }

  }
  else if (verStIsland==0) {
    for (var i = 0; i < markerStIsland.length; i++) {
        markerStIsland[i].setMap(null);
      }
    }

    stIslandCount=stIslandCount+1;
    verStIsland=stIslandCount%2;
/*  for (var i = 0; i < stIsland.length; i++) {
    var markerNei = new google.maps.Marker({
    position: {lat:Number(latV[stIsland[i]]), lng:Number(longV[stIsland[i]])},
    map: map
    })
  }*/
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10.7,
    center: u_coordinates
  });

  getCenterData();
  getHousingData();
  //wgetCrimesData();
  getMuseumsData();
  getGalleriesData();
  // getDistrictsData();
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

$("document").ready(function(){
  $("#showU").on("click",uMarker)
  $("#showDistricts").on("click",districts)
  $("#getNeiBronx").on("click",showNeiBronx)
  $("#getNeiBrooklyn").on("click",showNeiBrooklyn)
  $("#getNeiManhattan").on("click",showNeiManhattan)
  $("#getNeiQueens").on("click",showNeiQueens)
  $("#getNeiStIsland").on("click",showNeiStIsland)
  $("#showMuseumsBronx").on("click",showMBronx)
  $("#showMuseumsBrooklyn").on("click",showMBrooklyn)
  $("#showMuseumsManhattan").on("click",showMNew)
  $("#showMuseumsQueens").on("click",showMQueens)
  $("#showMuseumsSt").on("click",showMStIsland)
  $("#bronxHouses").on("click",tableHousing)
  $("#bthbronx").on("click",showHousingBronx)
  $("#bthbrooklyn").on("click",showHousingBrooklyn)
  $("#bthmanhattan").on("click",showHousingManhattan)
  $("#bthqueens").on("click",showHousingQueens)
  $("#bthstisland").on("click",showHousingStIsland)


});
/*function drawPolygon(polygon,color) {
  polygon = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35
});
  polygon.setMap(map);
}*/
