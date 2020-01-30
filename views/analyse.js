<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>FLO Analize</title>
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
 <style>
  html{
   padding:50px;
  }
 </style>

</head>
<body onload="startSpeed()">
 <div class="container">
  <div class="page-header text-center">
   <h1>New FLO Analysis</h1>
  </div>

  <div class="row">
        
       
            <strong> Logado: </strong> <%= user.username %>,   
            <a href="/logout" class="btn btn-danger btn-sm">Logout</a> <a href="/profile" class="btn btn-default btn-sm">Home</a><br>
           
                <% if (dados){ %>
                  <% for (var j = 0; j < dados.length; j++){ %>
                    <div align="center" class="col-sm-4">
                      <div class="well" style="margin: 5px;">
                        <h3><span class="fa fa-video-camera"></span> Display Control</h3>
                        <button onclick="playVid()" type="button" title="Play"><i class="fa fa-play"></i></button>
                        <button onclick="pauseVid()" type="button" title="Pause"><i class="fa fa-pause"></i></button>
                        <button onclick="minus5()" type="button"><i class="fa fa-step-backward"></i></button>
                        <button onclick="plus5()" type="button"><i class="fa fa-step-forward"></i></button>
                        <button onclick="reduceSpeed()" type="button">-</button>
                        <input type="button" id="bspeed" value="0.0" title="Speed">
                        <button onclick="increaseSpeed()" type="button">+</button>
                      </div>
                    </div>

                    <div align="center" class="col-sm-4">
                        <div class="well" style="margin: 5px;">
                          <h3><span class="fa fa-pie-chart"></span> Analyse</h3>
                          <button class="btn btn-danger btn-sm" id="nva" onClick="getid(this.id);" type="button" title="Click to insert a NVA period">NVA</button>
                          <button class="btn btn-warning btn-sm" id="bva" onClick="getid(this.id);" type="button" title="Click to insert a BVA period">BVA</button>
                          <button class="btn btn-success btn-sm" id="va" onClick="getid(this.id);" type="button" title="Click to insert a VA period">VA</button>
                        </div>
                      </div>

                      <div align="center" class="col-sm-4">
                          <div class="well" style="margin: 5px;">
                            <h3><span class="fa fa-bar-chart"></span> Summary result</h3>
                            <button class="btn btn-danger btn-sm" type="button" title="Click to insert a NVA period">20%</button>
                            <button class="btn btn-warning btn-sm" type="button" title="Click to insert a BVA period">15%</button>
                            <button class="btn btn-success btn-sm" type="button" title="Click to insert a VA period">65%</button>
                          </div>
                        </div>
                        

                    <div class="col-sm-12">
                      <div align="center" class="well" style="margin: 5px;">
                        <video style="margin: 10px;" id="myVideo" width="1000" height="700" controls>
                          <source src="http://10.193.181.26/webflo/public/images//<%= dados[j].movie %>" type="video/mp4" >
                          Your browser does not support HTML5 video.
                        </video>
                      </div>
                    </div>
                  
                    <div class="col-sm-12">
                        <button onclick="tblength()"  class="btn btn-info btn-sm" id="button"> Submit </button>
                        <form action="">
                            <hr> Result Analyzis <br><hr> 
                        <table class="table" id="tbldata">
                          <thead>
                              <tr>
                                  <th>Process</th>
                                  <th>Video Time</th>
                                  <th>Description</th>
                                  <th>Process time</th>
                              </tr>
                          </thead>
                          <tbody  id="myList" >
                            
                          </tbody>
                        </table>
                      </form>
                      </div>
                  <% } %>
                <% } %>
    </div>
 </div>

<script>
var vid = document.getElementById("myVideo");
var lasttime = 0.0;
var lasttimes = 0.0;
    function getid(id)
    {
      
      vid.pause();

      var txt;
      var person = prompt("Please enter the description:", "");
      if (person != null && person != "") {
        txt = person;
          var tr = document.createElement("tr"),
            td = document.createElement("td");
                      tr.appendChild(td);  
          var textnode = document.createTextNode(id);
                              td.appendChild(textnode);

          var td1 = document.createElement("td");
                      tr.appendChild(td1);   
          var textnode1 = document.createTextNode(vid.currentTime.toFixed(2));
                              td1.appendChild(textnode1);

          var td2 =  document.createElement("td");
                      tr.appendChild(td2);
                      var textnode2 = document.createTextNode(txt);
                              td2.appendChild(textnode2);

          lasttimes = vid.currentTime - lasttime;
          

          var td3 =  document.createElement("td");
                      tr.appendChild(td3);
                      var textnode3 = document.createTextNode(lasttimes.toFixed(2));
                              td3.appendChild(textnode3);

          document.getElementById("myList").appendChild(tr);
          lasttime = vid.currentTime;

        }

    }

function plus5() { 
  vid.currentTime= vid.currentTime + 0.1;
}

function minus5() { 
  vid.currentTime= vid.currentTime - 0.1;
}

function getPlaySpeed() { 
  alert(vid.playbackRate);
} 

function increaseSpeed() { 
  vid.playbackRate = vid.playbackRate + 0.1;
  document.getElementById("bspeed").value = "x " + vid.playbackRate.toFixed(1)
} 

function reduceSpeed() { 
  vid.playbackRate = vid.playbackRate - 0.1;
  document.getElementById("bspeed").value = "x " + vid.playbackRate.toFixed(1)
} 

function startSpeed() { 
  document.getElementById("bspeed").value = "x " + vid.playbackRate
} 

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
}

// function tblength() {
//   var nodelist = document.getElementsByTagName("tr").length;
//   console.log(nodelist);
// }
function tblength() {
  var tableToObj = function( table ) {
      var trs = table.rows,
          trl = trs.length,
          i = 0,
          j = 0,
          keys = [],
          obj, ret = [];

      for (; i < trl; i++) {
          if (i == 0) {
              for (; j < trs[i].children.length; j++) {
                  keys.push(trs[i].children[j].innerHTML);
              }
          } else {
              obj = {};
              for (j = 0; j < trs[i].children.length; j++) {
                  obj[keys[j]] = trs[i].children[j].innerHTML;
              }
              ret.push(obj);
          }
      }
      
      return ret;
  };
  // xhr = new XMLHttpRequest();
  // var url = "/save_analyse";
  // xhr.open("POST", url, true);
  // xhr.setRequestHeader("Content-type", "application/json");
  // xhr.onreadystatechange = function () { 
  //     if (xhr.readyState == 4 && xhr.status == 200) {
  //         var json = JSON.parse(xhr.responseText);
  //     }
  // }
  // var data = JSON.stringify(tableToObj(document.getElementsByTagName('table')[0]));
  // xhr.send(data);

 console.log(JSON.stringify(tableToObj(document.getElementsByTagName('table')[0])))

 //$.post("/save_analyse", { json_string:JSON.stringify(tableToObj(document.getElementsByTagName('table')[0])) });
  var tab = tableToObj(document.getElementsByTagName('table')[0]);
  $.post({
        traditional: true,
        url: '/save_analyse',
        contentType: 'application/json',
        data: JSON.stringify(tab),
        dataType: 'json',
        success: function(response){ console.log( response ); }
    });

}

</script> 

</body>
</html>
