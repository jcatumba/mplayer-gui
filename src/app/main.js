global.$ = $;

//var folder_view = require('folder_view');
var fs = require('fs');
var spawn = require('child_process').spawn;

//function Folder(html-container){}

var files = fs.readdirSync('/home/jorge/Música');
var container = document.getElementById("files");
for (i=0;i<files.length;i++){
    var element = document.createElement("li");
    element.innerHTML = files[i];
    container.appendChild(element);
}

/*var folder = new folder_view.Folder($("#files"));
folder.open(process.cwd());
folder.on('navigate', function(dir, mime){
    console.log(mime.type);
    if (mime.type == 'folder'){
        folder.open(dir);
    } else {
        alert(mime.type);
    }
});*/
