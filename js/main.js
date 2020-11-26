function fetchCoreData() {
  fetch("http://dummy.restapiexample.com/api/v1/employees")
    .then((res) => res.json())
    .then((out) => {
      out.data.reverse().forEach((element) => {
        var x = document.getElementById("POITable").insertRow(1);
        var c1 = x.insertCell(0);
        var c2 = x.insertCell(1);
        var c3 = x.insertCell(2);
        var c4 = x.insertCell(3);
        c1.innerHTML = element.id;
        c2.innerHTML = element.employee_name;
        c3.innerHTML = accounting.formatMoney(element.employee_salary, "£ ", 0);
        c4.innerHTML = element.employee_age;
      });
    });
}

function fetchSalaryData() {
  fetch("https://randomuser.me/api/?results=24")
    .then((res) => res.json())
    .then((out) => {
      out.results.forEach((element) => {
        var x = document.getElementById("EmployeeTable").insertRow(1);
        var c1 = x.insertCell(0);
        var c2 = x.insertCell(1);
        var c3 = x.insertCell(2);
        var c4 = x.insertCell(3);
        var c5 = x.insertCell(4);
        var c6 = x.insertCell(5);
        var c7 = x.insertCell(6);
        if (element.id.value == null) {
          c1.innerHTML =
            '<span style="background-color: black; color: bisque; font-size: 16px">*** Missing ***</span>';
        } else {
          c1.innerHTML = element.id.value;
        }

        c2.innerHTML = element.name.title;
        c3.innerHTML = element.name.first;
        c4.innerHTML = element.name.last;
        c5.innerHTML = element.email;

        c6.innerHTML = new Date(element.dob.date).toLocaleDateString("en-GB");

        c7.innerHTML =
          "<img onclick=displayEmployee('" +
          element.picture.large +
          "'," +
          element.location.coordinates.latitude +
          "," +
          element.location.coordinates.longitude +
          ") src='" +
          element.picture.thumbnail +
          "'</img>";
      });
    });
}

function displayEmployee(urlEmployeePic, lati, longi) {
  try {
    document.getElementById("EmployeePic").deleteRow(1);
  } catch {
    // NOP
  }

  var x = document.getElementById("EmployeePic").insertRow(1);

  x.innerHTML =
    "<img  src='" + urlEmployeePic + "'  width='400' height='380' </img>";

  $(".map").remove();
  $("#mapWrapper").append('<div id="map" class="map"></div>');

  processMap(lati, longi);

 
}

var map;
function processMap(lati, longi) {
  map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([longi, lati]),
      zoom: 16,
    }),
  });
  add_map_point(lati, longi);
}

function add_map_point(lat, lng) {
  var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [
        new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.transform(
              [parseFloat(lng), parseFloat(lat)],
              "EPSG:4326",
              "EPSG:3857"
            )
          ),
        }),
      ],
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg",
      }),
    }),
  });

  map.addLayer(vectorLayer);
}

fetchCoreData();

fetchSalaryData();
