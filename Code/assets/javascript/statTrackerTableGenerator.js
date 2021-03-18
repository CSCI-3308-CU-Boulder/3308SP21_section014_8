function addRow() {
   "use strict";

    var table = document.getElementById("statsTable");
    var row= document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");

    td1.innerHTML = document.getElementById("field_resort_name").value;
    td2.innerHTML  = document.getElementById("field_resort_days").value;
    td3.innerHTML  = document.getElementById("field_runs").value;
    td4.innerHTML = document.getElementById("field_runs_beginner").value;
    td5.innerHTML  = document.getElementById("field_runs_intermediate").value;
    td6.innerHTML  = document.getElementById("field_runs_advanced").value;
    td7.innerHTML  = document.getElementById("field_runs_expert").value;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    row.appendChild(td7);

    table.children[0].appendChild(row);
}