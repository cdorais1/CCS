////cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
////cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
////cornerstoneTools.external.Hammer = Hammer;
////cornerstoneTools.external.cornerstone = cornerstone;
////cornerstoneTools.external.cornerstoneMath = cornerstoneMath;


function disable() {
    document.getElementById("Color").disabled = true;
    document.getElementById("Pplus").disabled = true;
    document.getElementById("Mminus").disabled = true;
}
function enable() {
    document.getElementById("Color").disabled = false;
    document.getElementById("Pplus").disabled = false;
    document.getElementById("Mminus").disabled = false;
}

// function panbutton that will allow the panning of the image when user zooms in and out
function panbutton() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
    currentTool = 'Pan';
}

// function clearbutton that will clear or the the brushstrokes the users has taken
function clearbutton() {
    clearBrushes(viewer);
}

// function brushbutton that will allow the onclick event when the user is pressing the brush button
function brushbutton() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('ThresholdsBrush', { mouseButtonMask: 1 });
    currentTool = 'ThresholdsBrush';
}
// function decreasebrush that will allow the user to decrease the size of the brush when clicking on the - button
function decreasebrush() {
    cornerstoneTools.store.state.tools[1].decreaseBrushSize();
}
// function increase brush that will allow the user to increase the size of the brush when clicking on the + button
function increasebrush() {
    cornerstoneTools.store.state.tools[1].increaseBrushSize();
}
// function zoombutton that will allow the onclick event when the user is pressing the zoom button
function zoombutton() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    currentTool = 'Zoom';
}
// function changecolor that will allow the brush to change color as the user desires
function changecolor() {
    var select = document.getElementById('Color');
    var option = select.options[select.selectedIndex].value;
    // option == 1 is red
    if (option == 1) {
        segModule.setters.activeSegmentIndex(viewer, 1);
        // option == 2 is green
    } else if (option == 2) {
        segModule.setters.activeSegmentIndex(viewer, 2);
        // option == 3 is purple
    } else if (option == 3) {
        segModule.setters.activeSegmentIndex(viewer, 3);
        // option == 5 is blue
    } else if (option == 68) {
        segModule.setters.activeSegmentIndex(viewer, 68);
        // option == 6 is pink
    } else if (option == 6) {
        segModule.setters.activeSegmentIndex(viewer, 6);
    }
}

// function undo, press to undo a brush stroke
function undo(){
    segModule.setters.undo(viewer);
}

// function redo, press to redo a brush stroke
function redo() {
    segModule.setters.redo(viewer);
}

//function lengthl, button that will get the length between the calcific plaque and the lumen
function lengthl() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
    currentTool = 'Length';
}
// function diplaystats, by pressing this button the stats are being displayed
function displaystats() {
    var labelMap2D = segModule.getters.labelmap2D(viewer).labelmap2D;
    var image = cornerstone.getImage(viewer);

    var areas = getBrushArea(labelMap2D, image);
    var densities = getDensity(labelMap2D, image);
    var counts = discreteCount(labelMap2D, image);
    var simpleVolumes = getVolume(labelMap2D, image);

    var output1a = document.getElementById("output1a");
    var output1v = document.getElementById("output1v");
    var output1d = document.getElementById("output1d");
    var output1c = document.getElementById("output1c");

    var output2a = document.getElementById("output2a");
    var output2d = document.getElementById("output2d");
    var output2c = document.getElementById("output2c");
    var output2v = document.getElementById("output2v");

    var output3a = document.getElementById("output3a");
    var output3d = document.getElementById("output3d");
    var output3c = document.getElementById("output3c");
    var output3v = document.getElementById("output3v");

    var output4a = document.getElementById("output4a");
    var output4d = document.getElementById("output4d");
    var output4c = document.getElementById("output4c");
    var output4v = document.getElementById("output4v");

    var output5a = document.getElementById("output5a");
    var output5d = document.getElementById("output5d");
    var output5c = document.getElementById("output5c");
    var output5v = document.getElementById("output5v");

    if (areas.red != null && simpleVolumes.red != null && densities.red != null && counts.red != null) {
        output1c.innerHTML = "Count: " + counts.red;
        output1a.innerHTML = "Area: " + areas.red + 'mm\u00B2';
        output1d.innerHTML = "Density: " + densities.red;
        output1v.innerHTML = "Volume: " + simpleVolumes.red + 'mm\u00B3';
    }
    if (areas.blue != null && simpleVolumes.blue != null && densities.blue != null && counts.blue != null) {
        output2c.innerHTML = "Count: " + counts.blue;
        output2a.innerHTML = "Area: " + areas.blue + 'mm\u00B2';
        output2d.innerHTML = "Density: " + densities.blue;
        output2v.innerHTML = "Volume: " + simpleVolumes.blue + 'mm\u00B3';
    }
    if (areas.green != null && simpleVolumes.green != null && densities.green != null && counts.green != null) {
        output3c.innerHTML = "Count: " + counts.green;
        output3a.innerHTML = "Area: " + areas.green + 'mm\u00B2';
        output3d.innerHTML = "Density: " + densities.green;
        output3v.innerHTML = "Volume: " + simpleVolumes.green + 'mm\u00B3';
    }
    if (areas.purple != null && simpleVolumes.purple != null && densities.purple != null && counts.purple != null) {
        output4c.innerHTML = "Count: " + counts.purple;
        output4a.innerHTML = "Area: " + areas.purple + 'mm\u00B2';
        output4d.innerHTML = "Density: " + densities.purple;
        output4v.innerHTML = "Volume: " + simpleVolumes.purple + 'mm\u00B3';
    }
    if (areas.fuchsia != null && simpleVolumes.fuchsia != null && densities.fuchsia != null && counts.fuchsia != null) {
        output5c.innerHTML = "Count: " + counts.fuchsia;
        output5a.innerHTML = "Area: " + areas.fuchsia + 'mm\u00B2';
        output5d.innerHTML = "Density: " + densities.fuchsia;
        output5v.innerHTML = "Volume: " + simpleVolumes.fuchsia + 'mm\u00B3';
    }
}
function clearBrushes(viewer) {

    // Taken from Marc's code, put here so people looking at the source don't see this haha.
    segModule.setters.deleteSegment(viewer, 1);
    segModule.setters.deleteSegment(viewer, 2);
    segModule.setters.deleteSegment(viewer, 3);
    segModule.setters.deleteSegment(viewer, 68);
    segModule.setters.deleteSegment(viewer, 6);
}


function getBrushArea(labelmap2D, image) {
    var areas = {
        red: 0,
        blue: 0,
        green: 0,
        purple: 0,
        fuchsia: 0
    };
    var pixelSize = image.columnPixelSpacing * image.rowPixelSpacing;

    for (let i = 0; i < labelmap2D.pixelData.length; i++) {
        if (labelmap2D.pixelData[i] == 1) {
            areas.red++;
        }
        else if (labelmap2D.pixelData[i] == 2) {
            areas.green++;
        }
        else if (labelmap2D.pixelData[i] == 3) {
            areas.purple++;
        }
        else if (labelmap2D.pixelData[i] == 68) {
            areas.blue++;
        }
        else if (labelmap2D.pixelData[i] == 6) {
            areas.fuchsia++;
        }
    }

    areas.red *= pixelSize;
    areas.blue *= pixelSize;
    areas.green *= pixelSize;
    areas.purple *= pixelSize;
    areas.fuchsia *= pixelSize;

    return areas;
}

function getVolume(labelmap2D, image) {
    const dataSet = dicomParser.parseDicom(image.data.byteArray);
    /* 
     * (0018, 0050) is the tag associated with "slice thickness"
     * (0020, 0032) is the tag associated with the "image position", which is 
     * an x, y, z coordinate of the upper left hand corner of the image. 
     * (0018, 0088) is the tag associated with "spacing between slices", which is not mandatory to include.
    */


    const sliceString = dataSet.string('x00180050');
    const dicomDepth = parseFloat(sliceString);


    const voxelSize = dicomDepth * image.columnPixelSpacing * image.rowPixelSpacing;
    //    const voxelSize = image.columnPixelSpacing * image.rowPixelSpacing * 1.5;

    var volumes = {
        red: 0,
        green: 0,
        blue: 0,
        purple: 0,
        fuchsia: 0,
    };

    for (let i = 0; i < labelmap2D.pixelData.length; i++) {
        if (labelmap2D.pixelData[i] == 1) {
            volumes.red++;
        }
        else if (labelmap2D.pixelData[i] == 2) {
            volumes.green++;
        }
        else if (labelmap2D.pixelData[i] == 3) {
            volumes.purple++;
        }
        else if (labelmap2D.pixelData[i] == 68) {
            volumes.blue++;
        }
        else if (labelmap2D.pixelData[i] == 6) {
            volumes.fuchsia++;
        }
    }

    volumes.red *= voxelSize;
    volumes.green *= voxelSize;
    volumes.blue *= voxelSize;
    volumes.purple *= voxelSize;
    volumes.fuchsia *= voxelSize;

    return volumes;
}


function getDensity(labelmap2D, image) {

    const imagePix = image.getPixelData();
    const slope = image.slope;
    const intercept = image.intercept;

    /* 
     * Four strata of density in calcified plaque:
     * < 130 HU: low density plaque
     * 351 - 700: low density calcified plaque
     * 701 - 1000: medium density calcified plaque
     * > 1000: high density calcified plaque, or 1K plaque 
     */


    var HUs =
    {
        red: [],
        green: [],
        blue: [],
        purple: [],
        fuchsia: []
    };
    var plaqueID = {
        red: "",
        green: "",
        blue: "",
        purple: "",
        fuchsia: ""
    };
    
    for (let i = 0; i < labelmap2D.pixelData.length; i++) {
        if (labelmap2D.pixelData[i] == 1) {
            HUs.red.push(imagePix[i] * slope + intercept);
        }
        else if (labelmap2D.pixelData[i] == 2) {
            HUs.green.push(imagePix[i] * slope + intercept);
        }
        else if (labelmap2D.pixelData[i] == 3) {
            HUs.purple.push(imagePix[i] * slope + intercept);
        }
        else if (labelmap2D.pixelData[i] == 68) {
            HUs.blue.push(imagePix[i] * slope + intercept);
        }
        else if (labelmap2D.pixelData[i] == 6) {
            HUs.fuchsia.push(imagePix[i] * slope + intercept);
        }
    }

    var temp = ["", "", "", "", ""];

    for (let j = 0; j < HUs.red.length; j++) {
        
        if (HUs.red[j] > 100 && HUs.red[j] < 131 &&
            temp[0] != "high density plaque" &&
            temp[0] != "low density calcified plaque" &&
            temp[0] != "high density calcified plaque" &&
            temp[0] != '1K calcified plaque') {
            temp[0] = "low density plaque";
        }
        else if (HUs.red[j] > 130 && HUs.red[j] < 351 &&
            temp[0] != "low density calcified plaque" &&
            temp[0] != "high density calcified plaque" &&
            temp[0] != '1K calcified plaque') {
            temp[0] = "high density plaque";
        }
        else if (HUs.red[j] > 350 && HUs.red[j] < 701 &&
            temp[0] != "high density calcified plaque" &&
            temp[0] != '1K calcified plaque') {
            temp[0] = "low density calcified plaque";
        }
        else if (HUs.red[j] > 700 && HUs.red[j] < 1001 &&
            temp[0] != '1K calcified plaque') {
            temp[0] = "high density calcified plaque";
        }
        else if (HUs.red[j] > 1000) {
            temp[0] = "1K calcified plaque";
        }
    }

    for (let j = 0; j < HUs.green.length; j++) {
        if (HUs.green[j] > 100 && HUs.green[j] < 131 &&
            temp[1] != "high density plaque" &&
            temp[1] != "low density calcified plaque" &&
            temp[1] != "high density calcified plaque" &&
            temp[1] != '1K calcified plaque') {
            temp[1] = "low density plaque";
        }
        else if (HUs.green[j] > 130 && HUs.green[j] < 351 &&
            temp[1] != "low density calcified plaque" &&
            temp[1] != "high density calcified plaque" &&
            temp[1] != '1K calcified plaque') {
            temp[1] = "high density plaque";
        }
        else if (HUs.green[j] > 350 && HUs.green[j] < 701 &&
            temp[1] != "high density calcified plaque" &&
            temp[1] != '1K calcified plaque') {
            temp[1] = "low density calcified plaque";
        }
        else if (HUs.green[j] > 700 && HUs.green[j] < 1001 &&
            temp[1] != '1K calcified plaque') {
            temp[1] = "high density calcified plaque";
        }
        else if (HUs.green[j] > 1000) {
            temp[1] = "1K calcified plaque";
        }
    }

    for (let j = 0; j < HUs.blue.length; j++) {
        if (HUs.blue[j] > 100 && HUs.blue[j] < 131 &&
            temp[2] != "high density plaque" &&
            temp[2] != "low density calcified plaque" &&
            temp[2] != "high density calcified plaque" &&
            temp[2] != '1K calcified plaque') {
            temp[2] = "low density plaque";
        }
        else if (HUs.blue[j] > 130 && HUs.blue[j] < 351 &&
            temp[2] != "low density calcified plaque" &&
            temp[2] != "high density calcified plaque" &&
            temp[2] != '1K calcified plaque') {
            temp[2] = "high density plaque";
        }
        else if (HUs.blue[j] > 350 && HUs.blue[j] < 701 &&
            temp[2] != "high density calcified plaque" &&
            temp[2] != '1K calcified plaque') {
            temp[2] = "low density calcified plaque";
        }
        else if (HUs.blue[j] > 700 && HUs.blue[j] < 1001 &&
            temp[2] != '1K calcified plaque') {
            temp[2] = "high density calcified plaque";
        }
        else if (HUs.blue[j] > 1000) {
            temp[2] = "1K calcified plaque";
        }
    }

    for (let j = 0; j < HUs.purple.length; j++) {
        if (HUs.purple[j] > 100 && HUs.purple[j] < 131 &&
            temp[3] != "high density plaque" &&
            temp[3] != "low density calcified plaque" &&
            temp[3] != "high density calcified plaque" &&
            temp[3] != '1K calcified plaque') {
            temp[3] = "low density plaque";
        }
        else if (HUs.purple[j] > 130 && HUs.purple[j] < 351 &&
            temp[3] != "low density calcified plaque" &&
            temp[3] != "high density calcified plaque" &&
            temp[3] != '1K calcified plaque') {
            temp[3] = "high density plaque";
        }
        else if (HUs.purple[j] > 350 && HUs.purple[j] < 701 &&
            temp[3] != "high density calcified plaque" &&
            temp[3] != '1K calcified plaque') {
            temp[3] = "low density calcified plaque";
        }
        else if (HUs.purple[j] > 700 && HUs.purple[j] < 1001 &&
            temp[3] != '1K calcified plaque') {
            temp[3] = "high density calcified plaque";
        }
        else if (HUs.purple[j] > 1000) {
            temp[3] = "1K calcified plaque";
        }
    }

    for (let j = 0; j < HUs.fuchsia.length; j++) {
        if (HUs.fuchsia[j] > 100 && HUs.fuchsia[j] < 131 &&
            temp[4] != "high density plaque" &&
            temp[4] != "low density calcified plaque" &&
            temp[4] != "high density calcified plaque" &&
            temp[4] != '1K calcified plaque') {
            temp[4] = "low density plaque";
        }
        else if (HUs.fuchsia[j] > 130 && HUs.fuchsia[j] < 351 &&
            temp[4] != "low density calcified plaque" &&
            temp[4] != "high density calcified plaque" &&
            temp[4] != '1K calcified plaque') {
            temp[4] = "high density plaque";
        }
        else if (HUs.fuchsia[j] > 350 && HUs.fuchsia[j] < 701 &&
            temp[4] != "high density calcified plaque" &&
            temp[4] != '1K calcified plaque') {
            temp[4] = "low density calcified plaque";
        }
        else if (HUs.fuchsia[j] > 700 && HUs.fuchsia[j] < 1001 &&
            temp[4] != '1K calcified plaque') {
            temp[4] = "high density calcified plaque";
        }
        else if (HUs.fuchsia[j] > 1000) {
            temp[4] = "1K calcified plaque";
        }
    }

    plaqueID.red = temp[0];
    plaqueID.green = temp[1];
    plaqueID.blue = temp[2];
    plaqueID.purple = temp[3];
    plaqueID.fuchsia = temp[4];

    return plaqueID;
}


function discreteCount(labelmap2D, image) {

    var counts =
    {
        red: 0,
        green: 0,
        blue: 0,
        purple: 0,
        fuchsia: 0
    };

    for (let i = 0; i < labelmap2D.pixelData.length; i++) {
        if (labelmap2D.pixelData[i] == 1 && counts.red == 0) {
            counts.red++;
        }
        else if (labelmap2D.pixelData[i] == 2 && counts.green == 0) {
            counts.green++;
        }
        else if (labelmap2D.pixelData[i] == 3 && counts.purple == 0) {
            counts.purple++;
        }
        else if (labelmap2D.pixelData[i] == 68 && counts.blue == 0) {
            counts.blue++;
        }
        else if (labelmap2D.pixelData[i] == 6 && counts.fuchsia == 0) {
            counts.fuchsia++;
        }
    }
    
    return counts;
}

function convertToJSON(labelmap2D, image)
{
    const dataSet = dicomParser.parseDicom(image.data.byteArray);
    const studyInstanceUIDval = dataSet.string('x0020000d');
    const toolStatesval = cornerstoneTools.store.state.tools;
    const currentBrushval = cornerstoneTools.getModule('segmentation').getters.activeSegmentIndex(viewer);

    const structure =
    {
        studyInstanceUID: studyInstanceUIDval,
        ToolsStates: toolStatesval,
        currentBrush: currentBrushval,
        LabelMap2D: labelmap2D.pixelData
    };

    var baseArray = structure;

    var JSONArray = JSON.stringify(baseArray);


    JSONArray = [JSONArray];
    var a = document.createElement("a");
    var blob1 = new Blob(JSONArray, { type: "text/plain; charset=utf-8" });
    var url = window.URL || window.webkitURL;
    var link = url.createObjectURL(blob1);
    a.download = "annotations.json";
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return JSONArray;
}

function updateFromJSON(jsonfile)
{
    console.log(jsonfile);
    let reader = new FileReader();
    console.log(reader);
    reader.readAsArrayBuffer(jsonfile);
    var elements = {
        studyinstanceuid: '',
        toolsstates: {},
        currentbrush: 0,
        labelmap2d: []
    }
    var tempo = JSON.stringify(reader);
    console.log(tempo);
    var temp = JSON.parse(tempo);

    return temp;
}
