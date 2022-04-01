////'use strict';
////var http = require('http');
////var port = process.env.PORT || 1337;

////http.createServer(function (req, res) {
////    res.writeHead(200, { 'Content-Type': 'text/plain' });
////    res.end('We can totally do this guys, I have total faith even through this is all new stuff. \n');
////}).listen(port);
import assert from 'assert';
import * as "cornerstone-core" from cornerstone-core;

const realFileBtn = document.getElementById("user-file");
const customTxt = document.getElementById("custom-text");

realFileBtn.addEventListener("change", function () {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value;
    } else {
        customTxt.innerHTML = "No file chosen, yet";


    }
});
