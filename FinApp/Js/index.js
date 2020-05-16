
$('#submit').click(function() {
  console.log(editor.getValue())
    $.ajax({
        url: 'http://localhost:3000/upLoadFile',
        type: 'POST',
        data: {
            language: 'Pyhton',
            code: editor.getValue()
        },
        success : function(response){

          console.log(response)
          // var node = document.createElement("span");                 // Create a <li> node
          // var textnode = document.createTextNode(response);         // Create a text node
          // node.appendChild(textnode);                              // Append the text to <li>
          // document.getElementById("graph").appendChild(node);     // Append <li> to <ul> with id="myList"
          var ifrm = document.createElement("iframe");
          ifrm.setAttribute("src", "http://localhost:3000/graph");
          ifrm.style.width = "100%";
          ifrm.style.height = "500px";
          //document.getElementById("graph").appendChild(ifrm);

          document.getElementById("graph").innerHTML = ' <iframe src="http://localhost:3000/graph" style="width: 100%; height: 500px;"></iframe>';
          document.getElementById("evalTitle").innerHTML = "Evaluation Suite";
          document.getElementById("eval").innerHTML = "Sharpe Ratio = " + response;
          document.getElementById("debug").innerHTML = "Debug Information = 0";
         },

    });
});









function test1(){
  const fetchPromise = fetch("http://localhost:3000/test?x=2&type=0");
  fetchPromise.then(response => {
    console.log(response);
     response.json().then((s) => {console.log(s)
       console.log(s.host)
     });
  });
}

function test2(){
  const fetchPromise = fetch("http://localhost:3000/SMP500");
  fetchPromise.then(response => {
    console.log(response);
     response.json().then((s) => {
       console.log(s[0])
       Object.keys(s[0]).forEach(function(key,index) {
         console.log(key)
    // key: the name of the object key
    // index: the ordinal position of the key within the object
        });
     });
  });
}

function test3(){
  const fetchPromise = fetch("http://localhost:3000/getGraph?ticker=A&type=0");
  fetchPromise.then(response => {
    console.log(response);
     response.json().then((s) => {console.log(s)
       console.log(s.host)
     });
  });
}



function verify1(){
  const fetchPromise = fetch("http://localhost:3000/upLoadFile");
  fetchPromise.then(response => {
    //console.log(response);
    console.log("elo")
    var node = document.createElement("LI");                 // Create a <li> node
var textnode = document.createTextNode("Water");         // Create a text node
node.appendChild(textnode);                              // Append the text to <li>
document.getElementById("myList").appendChild(node);     // Append <li> to <ul> with id="myList"
console.log("elo2")
    //  response.json().then((s) => {
    //    console.log(s[0])
    //    Object.keys(s[0]).forEach(function(key,index) {
    //      console.log(key)
    // // key: the name of the object key
    // // index: the ordinal position of the key within the object
    //     });
    //  });
  });
}



function verify1_old() {
    jQuery.ajax({
        type: 'GET',
        url:"http://localhost:3000/upLoadFile",
        data: "print('yo yo')"
    });
}
selectTheme('darcula')

// $(document).ready(function(){
// 	//code here...
//
// 	var code = $(".codemirror-textarea")[0];
// 	var editor = CodeMirror.fromTextArea(code, {
//     mode: {name: "python",
//               version: 3,
//               singleLineStringErrors: false},
//        lineNumbers: true,
//        indentUnit: 4,
//        matchBrackets: true
// 	});
//   var input = document.getElementById("select");
//   console.log('elo')
//   function selectTheme() {
//     var theme = input.options[input.selectedIndex].textContent;
//     editor.setOption("theme", theme);
//     location.hash = "#" + theme;
//   }
//   var choice = (location.hash && location.hash.slice(1)) ||
//                (document.location.search &&
//                 decodeURIComponent(document.location.search.slice(1)));
//   if (choice) {
//     input.value = choice;
//     editor.setOption("theme", choice);
//   }
//   CodeMirror.on(window, "hashchange", function() {
//     var theme = location.hash.slice(1);
//     if (theme) { input.value = theme; selectTheme(); }
//   });
//
//
//   $("#garry").click(function(){
//     $.get("http://localhost:3000/upLoadFile"),
//     {
//       name: "Donald Duck",
//       city: "Duckburg"
//     }
//
//   });
//
//
// });
