function sortImages(files) {
    let allfiles = [...files].map(file => {
        const reader = new FileReader();
        return new Promise(resolve => {
            reader.onload = () => resolve(reader.result);
            reader.readAsArrayBuffer(file);
        });
    });
    console.log(allfiles);
    console.log(Promise.all(allfiles));
    let allfiles1 = Promise.all(allfiles);
    let byteArrays = [];
    for (let i = 0; i < allfiles.length; i++)
    {
        console.log("contents of allfiles1[" + i + "]")
        console.log(allfiles1[i]);
        byteArrays.push(new Uint8Array(allfiles1[i]));
    }
    console.log(byteArrays);
}
 


// Turn off brush tools.
function disable() {
    document.getElementById("Color").disabled = true;
    document.getElementById("Pplus").disabled = true;
    document.getElementById("Mminus").disabled = true;
}

// Turn on brush tools.
function enable() {
    document.getElementById("Color").disabled = false;
    document.getElementById("Pplus").disabled = false;
    document.getElementById("Mminus").disabled = false;
}

// Enables pan tool to allow users to move image in viewport.
function panbutton() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
    currentTool = 'Pan';
}

// Clears all brush strokes on the currently displayed image.
function clearbutton() {
    if (confirm("Are you sure you would like to clear all annotations? This cannot be undone.")) {
        clearBrushes(viewer);
    } 
}

// Enables brush tool when clicked.
function brushbutton() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('ThresholdsBrush', { mouseButtonMask: 1 });
    currentTool = 'ThresholdsBrush';
    Seg_or_Ano = "seg";
}
// Allows the user to decrease the size of the brush when clicking on the - button.
function decreasebrush() {
    cornerstoneTools.store.state.tools[4].decreaseBrushSize();
}
// Allows the user to increase the size of the brush when clicking on the + button.
function increasebrush() {
    cornerstoneTools.store.state.tools[4].increaseBrushSize();
}

// Add comment here later lol
function updateTextInput(val) {
    document.getElementById('textInput').value = val;
}

function sortImages(files) {
    let allfiles = [...files].map(file => {
        const reader = new FileReader();
        return new Promise(resolve => {
            reader.onload = () => resolve(reader.result);
            reader.readAsArrayBuffer(file);
        });
    });
    console.log(allfiles);
    console.log(Promise.all(allfiles));
    let allfiles1 = Promise.all(allfiles);
    let byteArrays = [];
    for (let i = 0; i < allfiles.length; i++)
    {
        console.log("contents of allfiles1[" + i + "]")
        console.log(allfiles1[i]);
        byteArrays.push(new Uint8Array(allfiles1[i]));
    }
    console.log(byteArrays);
}
 


// Turn off brush tools.
function disable() {
    document.getElementById("Color").disabled = true;
    document.getElementById("Pplus").disabled = true;
    document.getElementById("Mminus").disabled = true;
}

// Turn on brush tools.
function enable() {
    document.getElementById("Color").disabled = false;
    document.getElementById("Pplus").disabled = false;
    document.getElementById("Mminus").disabled = false;
}

// Enables pan tool to allow users to move image in viewport.
function panbutton() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
    currentTool = 'Pan';
}

// Clears all brush strokes on the currently displayed image.
function clearbutton() {
    if (confirm("Are you sure you would like to clear all annotations? This cannot be undone.")) {
        clearBrushes(viewer);
    } 
}

// Enables brush tool when clicked.
function brushbutton() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('ThresholdsBrush', { mouseButtonMask: 1 });
    currentTool = 'ThresholdsBrush';
    Seg_or_Ano = "seg";
}
// Allows the user to decrease the size of the brush when clicking on the - button.
function decreasebrush() {
    cornerstoneTools.store.state.tools[4].decreaseBrushSize();
}
// Allows the user to increase the size of the brush when clicking on the + button.
function increasebrush() {
    cornerstoneTools.store.state.tools[4].increaseBrushSize();
}

// Add comment here later lol
function updateTextInput(val) {
    document.getElementById('textInput').value = val;
}

// Allows the user to download a JSON file
function exportJ() {
    var image = cornerstone.getImage(viewer);
    convertToJSON(image);
}

// Enables Zoom tool when clicked.
function zoombutton() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    currentTool = 'Zoom';
}

// Allows users to change brush color.
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

// function undo: press to undo a brush stroke.
function undo(){
    segModule.setters.undo(viewer);
}

// function redo: press to redo a brush stroke.
function redo() {
    segModule.setters.redo(viewer);
}

// Enables tool that will get the length between the calcific plaque and the lumen.
function lengthl() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
    currentTool = 'Length';
    Seg_or_Ano = "ano";
}

// Show the Stats only when pressing the button of Stats
//function showDiv() {
//    document.getElementById('Statistics').style.display = "block";
//}


// Displays statistics captured by paint event data.
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

    // If values exist, show the values in statistics.
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

// Clear all brush annotations.
function clearBrushes(viewer) {
    segModule.setters.deleteSegment(viewer, 1);
    segModule.setters.deleteSegment(viewer, 2);
    segModule.setters.deleteSegment(viewer, 3);
    segModule.setters.deleteSegment(viewer, 68);
    segModule.setters.deleteSegment(viewer, 6);
}

// Calculate area under brush markings using pixel data and pixel dimensions.
function getBrushArea(labelmap2D, image) {
    var areas = {
        red: 0,
        blue: 0,
        green: 0,
        purple: 0,
        fuchsia: 0
    };
    
    // Dimensions for the size of a pixel
    var pixelSize = image.columnPixelSpacing * image.rowPixelSpacing;

    // Counts total pixels for each color.
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

    // Multiply number of pixels by the dimensions of a single pixel.
    areas.red *= pixelSize;
    areas.blue *= pixelSize;
    areas.green *= pixelSize;
    areas.purple *= pixelSize;
    areas.fuchsia *= pixelSize;

    return areas;
}

// Calculate volume of area under paint annotatations using pixel data and pixel dimensions.
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

    var volumes = {
        red: 0,
        green: 0,
        blue: 0,
        purple: 0,
        fuchsia: 0,
    };

    // Counts total pixels for each color.
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
    
    // Multiply # of pixels by the volume of a single pixel.
    volumes.red *= voxelSize;
    volumes.green *= voxelSize;
    volumes.blue *= voxelSize;
    volumes.purple *= voxelSize;
    volumes.fuchsia *= voxelSize;

    return volumes;
}

// Calculate density of the annotated area.
function getDensity(labelmap2D, image) {

    // demensions for the density of a pixel
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
        red: [0, 0],
        green: [0, 0],
        blue: [0, 0],
        purple: [0, 0],
        fuchsia: [0, 0]
    };
    var plaqueID = {
        red: "",
        green: "",
        blue: "",
        purple: "",
        fuchsia: ""
    };
    
    // counts pixels for each color
    for (let i = 0; i < labelmap2D.pixelData.length; i++) {
        if (labelmap2D.pixelData[i] == 1) {
            HUs.red[0] += imagePix[i] * slope + intercept;
            HUs.red[1]++;
        }
        else if (labelmap2D.pixelData[i] == 2) {
            HUs.green[0] += imagePix[i] * slope + intercept;
            HUs.green[1]++;
        }
        else if (labelmap2D.pixelData[i] == 3) {
            HUs.purple[0] += imagePix[i] * slope + intercept;
            HUs.purple[1]++;
        }
        else if (labelmap2D.pixelData[i] == 68) {
            HUs.blue[0] += imagePix[i] * slope + intercept;
            HUs.blue[1]++;
        }
        else if (labelmap2D.pixelData[i] == 6) {
            HUs.fuchsia[0] += imagePix[i] * slope + intercept;
            HUs.fuchsia[1]++;
        }
    }
    // Calculate average HU value.  
    if (HUs.red[1] != 0)
        HUs.red[0] /= HUs.red[1];
    if (HUs.green[1] != 0)
        HUs.green[0] /= HUs.green[1];
    if (HUs.purple[1] != 0)
        HUs.purple[0] /= HUs.purple[1];
    if (HUs.blue[1] != 0)
        HUs.blue[0] /= HUs.blue[1];
    if (HUs.fuchsia[1] != 0)
        HUs.fuchsia[0] /= HUs.fuchsia[1];


    var temp = ["", "", "", "", ""];

    // Add plain English description of the meaning of the HU value for all brush colors.
    if (HUs.red[0] < 101)
        temp[0] = "N/A";
        
    else if  (HUs.red[0] > 100 && HUs.red[0] < 131) {
        temp[0] = "low density plaque";
    }
    else if (HUs.red[0] > 130 && HUs.red[0] < 351) {
        temp[0] = "high density plaque";
    }
    else if (HUs.red[0] > 350 && HUs.red[0] < 701) {
        temp[0] = "low density calcified plaque";
    }
    else if (HUs.red[0] > 700 && HUs.red[0] < 1001) {
        temp[0] = "high density calcified plaque";
    }
    else if (HUs.red[0] > 1000) {
        temp[0] = "1K calcified plaque";
    }

    if (HUs.green[0] < 101)
        temp[1] = "N/A";

    else if (HUs.green[0] > 100 && HUs.green[0] < 131) {
        temp[1] = "low density plaque";
    }
    else if (HUs.green[0] > 130 && HUs.green[0] < 351) {
        temp[1] = "high density plaque";
    }
    else if (HUs.green[0] > 350 && HUs.green[0] < 701) {
        temp[1] = "low density calcified plaque";
    }
    else if (HUs.green[0] > 700 && HUs.green[0] < 1001) {
        temp[1] = "high density calcified plaque";
    }
    else if (HUs.green[0] > 1000) {
        temp[1] = "1K calcified plaque";
    }

    if (HUs.blue[0] < 101)
        temp[2] = "N/A";
    else if (HUs.blue[0] > 100 && HUs.blue[0] < 131) {
        temp[2] = "low density plaque";
    }
    else if (HUs.blue[0] > 130 && HUs.blue[0] < 351) {
        temp[2] = "high density plaque";
    }
    else if (HUs.blue[0] > 350 && HUs.blue[0] < 701) {
        temp[2] = "low density calcified plaque";
    }
    else if (HUs.blue[0] > 700 && HUs.blue[0] < 1001) {
        temp[2] = "high density calcified plaque";
    }
    else if (HUs.blue[0] > 1000) {
        temp[2] = "1K calcified plaque";
    }
    if (HUs.purple[0] < 101)
        temp[3] = "N/A";

    else if (HUs.purple[0] > 100 && HUs.purple[0] < 131) {
        temp[3] = "low density plaque";
    }
    else if (HUs.purple[0] > 130 && HUs.purple[0] < 351) {
        temp[3] = "high density plaque";
    }
    else if (HUs.purple[0] > 350 && HUs.purple[0] < 701) {
        temp[3] = "low density calcified plaque";
    }
    else if (HUs.purple[0] > 700 && HUs.purple[0] < 1001) {
        temp[3] = "high density calcified plaque";
    }
    else if (HUs.purple[0] > 1000) {
        temp[3] = "1K calcified plaque";
    }

    if (HUs.fuchsia[0] < 101)
        temp[4] = "N/A";
    else if (HUs.fuchsia[0] > 100 && HUs.fuchsia[0] < 131) {
        temp[4] = "low density plaque";
    }
    else if (HUs.fuchsia[0] > 130 && HUs.fuchsia[0] < 351) {
        temp[4] = "high density plaque";
    }
    else if (HUs.fuchsia[0] > 350 && HUs.fuchsia[0] < 701) {
        temp[4] = "low density calcified plaque";
    }
    else if (HUs.fuchsia[0] > 700 && HUs.fuchsia[0] < 1001) {
        temp[4] = "high density calcified plaque";
    }
    else if (HUs.fuchsia[0] > 1000) {
        temp[4] = "1K calcified plaque";
    }

    plaqueID.red = HUs.red[0] + " HU: " + temp[0];
    plaqueID.green = HUs.green[0] + " HU: " + temp[1];
    plaqueID.blue = HUs.blue[0] + " HU: " + temp[2];
    plaqueID.purple = HUs.purple[0] + " HU: " + temp[3];
    plaqueID.fuchsia = HUs.fuchsia[0] + " HU: " + temp[4];

    return plaqueID;
}

//For discrete count statistics
function discreteCount(labelmap2D, image) {

    var counts =
    {
        red: 0,
        green: 0,
        blue: 0,
        purple: 0,
        fuchsia: 0
    };

    // If color exists on labelmap, increment count to 1.
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

// Allows the user to eraser either brush or length annotations.
// However, it only erases the markings of the last tool used.
function eraser() {
    if (Seg_or_Ano == 'ano') {
        cornerstoneTools.setToolPassive(currentTool);
        cornerstoneTools.setToolActive('Eraser', { mouseButtonMask: 1 });
        currentTool = 'Eraser';
    }
    else if (Seg_or_Ano == 'seg') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('EraserBrush', { mouseButtonMask: 1 });
        currentTool = 'EraserBrush';
    }
}

// Allows the user to download a JSON file
function exportJ() {
    var image = cornerstone.getImage(viewer);
    convertToJSON(image);
}

// Enables Zoom tool when clicked.
function zoombutton() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    currentTool = 'Zoom';
}

// Allows users to change brush color.
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

// function undo: press to undo a brush stroke.
function undo(){
    segModule.setters.undo(viewer);
}

// function redo: press to redo a brush stroke.
function redo() {
    segModule.setters.redo(viewer);
}

// Enables tool that will get the length between the calcific plaque and the lumen.
function lengthl() {
    cornerstoneTools.setToolDisabled(currentTool);
    cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
    currentTool = 'Length';
    Seg_or_Ano = "ano";
}

// Displays statistics captured by paint event data.
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

    // If values exist, show the values in statistics.
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

// Clear all brush annotations.
function clearBrushes(viewer) {
    segModule.setters.deleteSegment(viewer, 1);
    segModule.setters.deleteSegment(viewer, 2);
    segModule.setters.deleteSegment(viewer, 3);
    segModule.setters.deleteSegment(viewer, 68);
    segModule.setters.deleteSegment(viewer, 6);
}

// Calculate area under brush markings using pixel data and pixel dimensions.
function getBrushArea(labelmap2D, image) {
    var areas = {
        red: 0,
        blue: 0,
        green: 0,
        purple: 0,
        fuchsia: 0
    };
    
    // Dimensions for the size of a pixel
    var pixelSize = image.columnPixelSpacing * image.rowPixelSpacing;

    // Counts total pixels for each color.
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

    // Multiply number of pixels by the dimensions of a single pixel.
    areas.red *= pixelSize;
    areas.blue *= pixelSize;
    areas.green *= pixelSize;
    areas.purple *= pixelSize;
    areas.fuchsia *= pixelSize;

    return areas;
}

// Calculate volume of area under paint annotatations using pixel data and pixel dimensions.
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

    var volumes = {
        red: 0,
        green: 0,
        blue: 0,
        purple: 0,
        fuchsia: 0,
    };

    // Counts total pixels for each color.
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
    
    // Multiply # of pixels by the volume of a single pixel.
    volumes.red *= voxelSize;
    volumes.green *= voxelSize;
    volumes.blue *= voxelSize;
    volumes.purple *= voxelSize;
    volumes.fuchsia *= voxelSize;

    return volumes;
}

// Calculate density of the annotated area.
function getDensity(labelmap2D, image) {

    // demensions for the density of a pixel
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
        red: [0, 0],
        green: [0, 0],
        blue: [0, 0],
        purple: [0, 0],
        fuchsia: [0, 0]
    };
    var plaqueID = {
        red: "",
        green: "",
        blue: "",
        purple: "",
        fuchsia: ""
    };
    
    // counts pixels for each color
    for (let i = 0; i < labelmap2D.pixelData.length; i++) {
        if (labelmap2D.pixelData[i] == 1) {
            HUs.red[0] += imagePix[i] * slope + intercept;
            HUs.red[1]++;
        }
        else if (labelmap2D.pixelData[i] == 2) {
            HUs.green[0] += imagePix[i] * slope + intercept;
            HUs.green[1]++;
        }
        else if (labelmap2D.pixelData[i] == 3) {
            HUs.purple[0] += imagePix[i] * slope + intercept;
            HUs.purple[1]++;
        }
        else if (labelmap2D.pixelData[i] == 68) {
            HUs.blue[0] += imagePix[i] * slope + intercept;
            HUs.blue[1]++;
        }
        else if (labelmap2D.pixelData[i] == 6) {
            HUs.fuchsia[0] += imagePix[i] * slope + intercept;
            HUs.fuchsia[1]++;
        }
    }
    // Calculate average HU value.  
    if (HUs.red[1] != 0)
        HUs.red[0] /= HUs.red[1];
    if (HUs.green[1] != 0)
        HUs.green[0] /= HUs.green[1];
    if (HUs.purple[1] != 0)
        HUs.purple[0] /= HUs.purple[1];
    if (HUs.blue[1] != 0)
        HUs.blue[0] /= HUs.blue[1];
    if (HUs.fuchsia[1] != 0)
        HUs.fuchsia[0] /= HUs.fuchsia[1];


    var temp = ["", "", "", "", ""];

    // Add plain English description of the meaning of the HU value for all brush colors.
    if (HUs.red[0] < 101)
        temp[0] = "N/A";
        
    else if  (HUs.red[0] > 100 && HUs.red[0] < 131) {
        temp[0] = "low density plaque";
    }
    else if (HUs.red[0] > 130 && HUs.red[0] < 351) {
        temp[0] = "high density plaque";
    }
    else if (HUs.red[0] > 350 && HUs.red[0] < 701) {
        temp[0] = "low density calcified plaque";
    }
    else if (HUs.red[0] > 700 && HUs.red[0] < 1001) {
        temp[0] = "high density calcified plaque";
    }
    else if (HUs.red[0] > 1000) {
        temp[0] = "1K calcified plaque";
    }

    if (HUs.green[0] < 101)
        temp[1] = "N/A";

    else if (HUs.green[0] > 100 && HUs.green[0] < 131) {
        temp[1] = "low density plaque";
    }
    else if (HUs.green[0] > 130 && HUs.green[0] < 351) {
        temp[1] = "high density plaque";
    }
    else if (HUs.green[0] > 350 && HUs.green[0] < 701) {
        temp[1] = "low density calcified plaque";
    }
    else if (HUs.green[0] > 700 && HUs.green[0] < 1001) {
        temp[1] = "high density calcified plaque";
    }
    else if (HUs.green[0] > 1000) {
        temp[1] = "1K calcified plaque";
    }

    if (HUs.blue[0] < 101)
        temp[2] = "N/A";
    else if (HUs.blue[0] > 100 && HUs.blue[0] < 131) {
        temp[2] = "low density plaque";
    }
    else if (HUs.blue[0] > 130 && HUs.blue[0] < 351) {
        temp[2] = "high density plaque";
    }
    else if (HUs.blue[0] > 350 && HUs.blue[0] < 701) {
        temp[2] = "low density calcified plaque";
    }
    else if (HUs.blue[0] > 700 && HUs.blue[0] < 1001) {
        temp[2] = "high density calcified plaque";
    }
    else if (HUs.blue[0] > 1000) {
        temp[2] = "1K calcified plaque";
    }
    if (HUs.purple[0] < 101)
        temp[3] = "N/A";

    else if (HUs.purple[0] > 100 && HUs.purple[0] < 131) {
        temp[3] = "low density plaque";
    }
    else if (HUs.purple[0] > 130 && HUs.purple[0] < 351) {
        temp[3] = "high density plaque";
    }
    else if (HUs.purple[0] > 350 && HUs.purple[0] < 701) {
        temp[3] = "low density calcified plaque";
    }
    else if (HUs.purple[0] > 700 && HUs.purple[0] < 1001) {
        temp[3] = "high density calcified plaque";
    }
    else if (HUs.purple[0] > 1000) {
        temp[3] = "1K calcified plaque";
    }

    if (HUs.fuchsia[0] < 101)
        temp[4] = "N/A";
    else if (HUs.fuchsia[0] > 100 && HUs.fuchsia[0] < 131) {
        temp[4] = "low density plaque";
    }
    else if (HUs.fuchsia[0] > 130 && HUs.fuchsia[0] < 351) {
        temp[4] = "high density plaque";
    }
    else if (HUs.fuchsia[0] > 350 && HUs.fuchsia[0] < 701) {
        temp[4] = "low density calcified plaque";
    }
    else if (HUs.fuchsia[0] > 700 && HUs.fuchsia[0] < 1001) {
        temp[4] = "high density calcified plaque";
    }
    else if (HUs.fuchsia[0] > 1000) {
        temp[4] = "1K calcified plaque";
    }

    plaqueID.red = HUs.red[0] + " HU: " + temp[0];
    plaqueID.green = HUs.green[0] + " HU: " + temp[1];
    plaqueID.blue = HUs.blue[0] + " HU: " + temp[2];
    plaqueID.purple = HUs.purple[0] + " HU: " + temp[3];
    plaqueID.fuchsia = HUs.fuchsia[0] + " HU: " + temp[4];

    return plaqueID;
}

//For discrete count statistics
function discreteCount(labelmap2D, image) {

    var counts =
    {
        red: 0,
        green: 0,
        blue: 0,
        purple: 0,
        fuchsia: 0
    };

    // If color exists on labelmap, increment count to 1.
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