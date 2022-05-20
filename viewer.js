cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
segModule = cornerstoneTools.getModule('segmentation');

var currentTool = '';



function onDragOver(event) {

    // stop browser processing right away
    event.stopPropagation();
    event.preventDefault();

};

function onDrop(event) {

    // stop browser processing right away
    event.stopPropagation();
    event.preventDefault();

    console.log(event.dataTransfer.files);
    var file = event.dataTransfer.files[0];

    //checks if the file is a json file
    if (file.name.includes('.json') == true) {
        // If DICOM was not previously dragged and dropped, the viewer element
        // will not be enabled and an error will display.Catch error and give
        // an alert to the user that they must drop a DICOM first,
        // and do not allow it to reach updateFromJSON() function.

        try {
            cornerstone.getEnabledElement(viewer);
        }
        catch (error) {
            console.log(error);
            console.log("You cannot upload a json file without first uploading a DICOM.");
            alert("You cannot upload a json file without first uploading a DICOM.");
            return;
        }

        // Otherwise, call function.
        updateFromJSON(file);
        return;
    }

    else {
        // array of DICOM ImageIds
        imageIds = [];
        
        //adds all files to an array of ImageIds for the Stack Manager.
        for (let i = 0; i < event.dataTransfer.files.length; i++) {
            file = event.dataTransfer.files[i];
            imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(file));
        }
        
        console.log(imageIds);

        cornerstone.loadImage(imageIds[0]).then(function (image) {

            console.log('Loaded', image);

            cornerstoneTools.init();
            
            // viewer variable
            var viewer = document.getElementById('viewer');

            cornerstone.enable(viewer);
            cornerstone.displayImage(viewer, image);

            //enables stack state for image viewer
            var stack = { currentImageIdIndex: 0, imageIds: imageIds };
            cornerstoneTools.addStackStateManager(viewer, ["stack"]);
            cornerstoneTools.addToolState(viewer, "stack", stack);

            //adds cornerstone tools
            cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
            cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
            cornerstoneTools.addTool(cornerstoneTools.PanTool);
            cornerstoneTools.addTool(cornerstoneTools.LengthTool);
            cornerstoneTools.addTool(ThresholdsBrushTool);

            // Activate tools as needed; default active tool is brush and stack scroll.
            cornerstoneTools.setToolPassive('ThresholdsBrush', { mouseButtonMask: 1 });
            cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
            cornerstoneTools.setToolPassive('Zoom', { mouseButtonMask: 1 });
            cornerstoneTools.setToolPassive('Pan', { mouseButtonMask: 1 });
            cornerstoneTools.setToolPassive('Length', { mouseButtonMask: 1 });
            currentTool = 'ThresholdsBrush';

        });

    };
};

// initiallizes drag and drop on load 
window.onload = function () {

    document.body.addEventListener('dragover', onDragOver);
    document.body.addEventListener('drop', onDrop);
};
// function brushbutton that will allow the onclick event when the user is pressing the brush button

window.onkeyup = function (event) {

    // this was an else if now it is just an if in case we want to change it back to keys on keyboard
    if (event.key == '0') {
        //cornerstoneTools.setToolDisabled(currentTool);
        //cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 });
        //currentTool = 'FreehandRoi';
        let dataSet = dicomParser.parseDicom(cornerstone.getImage(viewer).data.byteArray);
        console.log("dataset: ");
        console.log(dataSet);
        console.log("Instance Number: ");
        console.log(dataSet.uint16('x00200013'));
        console.log("Study Instance UID: ");
        console.log(dataSet.string('x0020000d'));
    }

    // press b to get the brush
    else if (event.key == 'b') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('ThresholdsBrush', { mouseButtonMask: 1 });
        currentTool = 'ThresholdsBrush';
    }
    // press - to decrease brush size
    else if (event.key == '-') {
        cornerstoneTools.store.state.tools[4].decreaseBrushSize();
    }
    // press = to increase brush size
    else if (event.key == '=') {
        cornerstoneTools.store.state.tools[4].increaseBrushSize();
    }
    // press z for zoom
    else if (event.key == 'z') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
        currentTool = 'Zoom';
    }
    // press l for length tool
    else if (event.key == 'l') {
        //cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
        currentTool = 'Length';
    }
    // press p for pan
    else if (event.key == 'p') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
        currentTool = 'Pan';
    }

    
    //discrete calcifications 
    else if (event.key == '2') {
        var labelMap2D = segModule.getters.labelmap2D(viewer).labelmap2D;
        var image = cornerstone.getImage(viewer);
        var counts = discreteCount(labelMap2D, image);

        var output1 = document.getElementById("output1");
        var output2 = document.getElementById("output2");
        var output3 = document.getElementById("output3");
        var output4 = document.getElementById("output4");
        var output5 = document.getElementById("output5");

        if (counts.red != null) {
            output1.innerHTML = "red: " + counts.red;
        }
        if (counts.blue != null) {
            output2.innerHTML = "blue: " + counts.blue;
        }
        if (counts.green != null) {
            output3.innerHTML = "green: " + counts.green;
        }
        if (counts.purple != null) {
            output4.innerHTML = "purple: " + counts.purple;
        }
        if (counts.fuchsia != null) {
            output5.innerHTML = "pink: " + counts.fuchsia;
        }
        console.log("red: " + counts.red);
        console.log("blue: " + counts.blue);
        console.log("green: " + counts.green);
        console.log("purple: " + counts.purple);
        console.log("pink: " + counts.fuchsia);
    }
    
    //displays all statistics
    else if (event.key == '3') {

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

        console.log("red brush: " + areas.red + 'mm\u00B2');
        console.log("blue brush: " + areas.blue + 'mm\u00B2');
        console.log("green brush: " + areas.green + 'mm\u00B2');
        console.log("purple brush: " + areas.purple + 'mm\u00B2');
        console.log("pink brush: " + areas.fuchsia + 'mm\u00B2');
    }
    
    // press 4 for display statistics (densities)
    else if (event.key == '4') {

        var labelMap2D = segModule.getters.labelmap2D(viewer).labelmap2D;
        var image = cornerstone.getImage(viewer);
        var densities = getDensity(labelMap2D, image);

        var output1 = document.getElementById("output1");
        var output2 = document.getElementById("output2");
        var output3 = document.getElementById("output3");
        var output4 = document.getElementById("output4");
        var output5 = document.getElementById("output5");

        if (densities.red != null) {
            output1.innerHTML = "red: " + densities.red;
        }
        if (densities.blue != null) {
            output2.innerHTML = "blue: " + densities.blue;
        }
        if (densities.green != null) {
            output3.innerHTML = "green: " + densities.green;
        }
        if (densities.purple != null) {
            output4.innerHTML = "purple: " + densities.purple;
        }
        if (densities.fuchsia != null) {
            output5.innerHTML = "pink: " + densities.fuchsia;
        }
        console.log("red: " + densities.red);
        console.log("blue: " + densities.blue);
        console.log("green: " + densities.green);
        console.log("purple: " + densities.purple);
        console.log("pink: " + densities.fuchsia);
    }
    
    //press u for undo
    else if (event.key == 'u') {
        segModule.setters.undo(viewer);
    }
    
    //press r for redo
    else if (event.key == 'r') {
        segModule.setters.redo(viewer);
    }
    
    //press c for clear

    else if (event.key == 'c') {

        clearBrushes(viewer);
    }
    
    //press q for json download
    else if (event.key == 'q') {
        var image = cornerstone.getImage(viewer);
        convertToJSON(image);
    }
};
