var script_url = "https://script.google.com/a/cusur.udg.mx/macros/s/AKfycbyHQxgcqJdsH2jRH0HwhpBtJLG81c45cyesJ-Yg6EY9fPCJ6Os/exec";




// Make an AJAX call to Google Script
function insert_value() {

  $("#re").css("visibility", "hidden");
  document.getElementById("loader").style.visibility = "visible";
  $('#mySpinner').addClass('spinner');
  //creamos variables con los valores que el usuario ingresa en el formulario
  //Se corresponden con los id de los input
  var row1 = $("#code").val();
  var row2 = $("#carrera").val();
  var row3 = $("#e1").val();
  var row4 = $("#e2").val();
  var row5 = $("#e3").val();
  var row6 = $("#e4").val();
  var row7 = $("#aula").val();

  var url = script_url + "?callback=ctrlq&code=" + row1 + "&carrera=" + row2 + "&e1="+ row3 + "&e2=" + row4 +"&e3=" + row5 + "&e4="+ row6 + "&aula="+ row7 +"&action=insert";
  console.log(url);


  var request = jQuery.ajax({

    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp"
  });
  console.log(request);
}







function update_value() {
  $("#re").css("visibility", "hidden");
  document.getElementById("loader").style.visibility = "visible";

  var id1 = $("#id").val();
  var name = $("#name").val();
  var url = script_url + "?callback=ctrlq&name=" + name + "&id=" + id1 + "&action=update";


  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp"
  });


}

function delete_value() {
  $("#re").css("visibility", "hidden");
  document.getElementById("loader").style.visibility = "visible";
  $('#mySpinner').addClass('spinner');
  var id1 = $("#id").val();
  var name = $("#name").val();
  var url = script_url + "?callback=ctrlq&name=" + name + "&id=" + id1 + "&action=delete";


  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp"
  });

}




// print the returned data
function ctrlq(e)
{
  console.log(e);
  $("#re").html(e.result);
  $("#re").css("visibility", "visible");
  read_value();
}




function read_value() {

  $("#re").css("visibility", "hidden");

  document.getElementById("loader").style.visibility = "visible";
  var url = script_url + "?action=read";

  $.getJSON(url, function(json) {

    // Set the variables from the results array

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");



    var header = table.createTHead();
    //Es el correspondiente a una columna en la tabla
    var row = header.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    // Es el Titulo de cada columna
    cell1.innerHTML = "<b>Codigo</b>";
    cell2.innerHTML = "<b>Carrera</b>";
    cell3.innerHTML = "<b>E-1</b>";
    cell4.innerHTML = "<b>E-2</b>";
    cell5.innerHTML = "<b>E-3</b>";
    cell6.innerHTML = "<b>E-4</b>";
    cell7.innerHTML = "<b>Aula</b>";
    cell8.innerHTML = "<b>Hora Inicio</b>";
    cell9.innerHTML = "<b>Hora Fin</b>";

    // ADD JSON DATA TO THE TABLE AS ROWS
    //LOS NOMBRES DEBEN CORRESPONDER AL NOMBRE DE LAS COLUMNAS
    //DEL SHEET
  for (var i = 0; i < json.records.length; i++)
    {
      tr = table.insertRow(-1);

      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = json.records[i].CODIGO;

      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = json.records[i].CARRERA;

      tabCell = tr.insertCell(-1);
      console.log(json);
      tabCell.innerHTML = json.records[i].E1;

      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = json.records[i].E2;

      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = json.records[i].E3;

      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = json.records[i].E4;

      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = json.records[i].AULA;

      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = json.records[i].HORA_INICIO;

      tabCell = tr.insertCell(-1);
      tabCell.innerHTML = json.records[i].HORA_FIN;
    }


    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    document.getElementById("loader").style.visibility = "hidden";
    $("#re").css("visibility", "visible");
  });
}
