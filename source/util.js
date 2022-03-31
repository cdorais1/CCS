////'use strict';
////var http = require('http');
////var port = process.env.PORT || 1337;

////http.createServer(function (req, res) {
////    res.writeHead(200, { 'Content-Type': 'text/plain' });
////    res.end('We can totally do this guys, I have total faith even through this is all new stuff. \n');
////}).listen(port);
import assert from 'assert';
import * as cornerstone from cornerstone-core;

const realFileBtn = document.getElementById("user-file");
const customTxt = document.getElementById("custom-text");
const file; 
realFileBtn.addEventListener("change", function () {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value;
//        file = document.getElementById('user-file').files; trying to figure out how to get files from html 
    } else {
        customTxt.innerHTML = "No file chosen, yet";
    }
});

// Program steps 
/* 1. File is uploaded. Data is parsed into a dataSet object, which is then used to populated the dataManager class.*/
function loadFile(file) {
    var reader = new FileReader();
    reader.onload = function (file) {
        var arrayBuffer = reader.result;
        // Here we have the file data as an ArrayBuffer.  dicomParser requires as input a
        // Uint8Array so we create that here
        var byteArray = new Uint8Array(arrayBuffer);
        parseByteArray(byteArray);
    }
    reader.readAsArrayBuffer(file);
}

