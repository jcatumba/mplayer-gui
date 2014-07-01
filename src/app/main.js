global.$ = $;

//var folder_view = require('folder_view');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var spawn = require('child_process').spawn;

// Variables and Objects
var container = document.getElementById("files");

function mimeChoose(filepath){
    var result = {
        name: path.basename(filepath),
        path: filepath
    };

    try {
        var stat = fs.statSync(filepath);
        if (stat.isDirectory()){
            result.type = "folder";
        } else {
            result.type = mime.lookup(filepath);
            if (!result.type) {
                result.type = "unknown";
            }
        }
    }
    catch (e) {
        window.alert(e);
    }

    return result;
}

function gen_file_view(filepath){
    file = mimeChoose(filepath);
    var icoPath = "";

    // Assign the path to the icon
    if (file.type == "folder"){
        icoPath = "img/folder.ico";
    } else if (file.type.indexOf("audio")>-1) {
        icoPath = "img/music.ico";
    } else {
        icoPath = "img/other.ico";
    }

    // Set up HTML
    var liContent = document.createElement("li");
    var divContent = document.createElement("div");
    var image = document.createElement("img");
    image.setAttribute('id', file.name);
    image.setAttribute('src', icoPath);
    image.setAttribute('class', 'icon');
    var text = document.createTextNode(file.name);

    // Add content to their parents
    divContent.appendChild(image);
    divContent.appendChild(text);
    liContent.appendChild(divContent);
    
    return liContent;
}

function Folder(htmlObj){
    this.open = function(dir){
        container.innerHTML = "";
        fs.readdir(dir, function(error,files){
            if (error){
                console.log(error);
                window.alert(error);
                return;
            }
            
            for (var i=0;i<files.length;i++){
                htmlFileView = gen_file_view(path.join(dir, files[i]));
                container.appendChild(htmlFileView);
            }
        });
    }
}

var folder = new Folder(container);
folder.open('/home/jorge/Música');
