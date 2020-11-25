function fetchData() {
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

fetchData();
