cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

const realFileBtn = document.getElementById("user-file");
const customTxt = document.getElementById("custom-text");
const file;

realFileBtn.addEventListener("change", function () {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value;
        file = evt.dataTransfer.files; // trying to figure out how to get files from html
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
        var dataSet = parseDicom(byteArray);
    }
    reader.readAsArrayBuffer(file);
}


cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

// Viewport is enabled. Scale is zoom in of pixel, translation is (x,y) 
// properties, default is(0, 0), VOI is Values of Interest, i.e. window width
// and center, invert is to flip the image and pixel replication is 
// for smoother zooming(I think).
const viewportOptions = {
    scale: 1,
    translation: { x: 0, y: 0 },
    voi: { windowWidth: 400, windowCenter: 200 },
    invert: false,
    pixelReplication: true
};

const element = document.getElementById("viewport");


/* 2. Parsed information is passed to the Dicom Viewer to be displayed on ThirdPage.html. */

/* 3. User interacts with the image and a tool is called, affecting the image or calling the controller for calculations. */

// If stack scroll

// If pan 

// If brush

// If zoom

// If clear 