'use strict';
console.log("this is working.")

import assert from 'assert';
const parser = require('dicom-parser');
const cornerstone = require('cornerstone');
const viewer = require('cornerstone-wado-image-loader');

const realFileBtn = document.getElementById("user-file");
const customTxt = document.getElementById("custom-text");
const file;
realFileBtn.addEventListener("change", function () {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value;
        file = document.getElementById('user-file').files; // trying to figure out how to get files from html 
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
        var dataSet = dicomParser.parseDicom(byteArray);
    }
    reader.readAsArrayBuffer(file);
    return dataSet;
}

var ds = loadFile(file);
var dM = new dataManager(ds);

/* 2. Parsed information is passed to the Dicom Viewer to be displayed on ThirdPage.html. */

/* 3. User interacts with the image and a tool is called, affecting the image or calling the controller for calculations. */

// If stack scroll

// If pan 

// If brush

// If zoom

// If clear 