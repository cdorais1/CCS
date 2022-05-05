cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
segModule = cornerstoneTools.getModule('segmentation');

var currentTool = '';
var image1;
var brush = 0;

function onDragOver(event) {

    // stop browser processing right away
    event.stopPropagation();
    event.preventDefault();

};

function onDrop(event) {

    // stop browser processing right away
    event.stopPropagation();
    event.preventDefault();

    imageIds = [];

    for (var i = 0; i < event.dataTransfer.files.length; i++) {

        var file = event.dataTransfer.files[i];
        imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(file));

    }

    cornerstone.loadImage(imageIds[0]).then(function (image) {

        image1 = image;
        console.log('Loaded', image);

        cornerstoneTools.init();

        var viewer = document.getElementById('viewer');

        cornerstone.enable(viewer);
        cornerstone.displayImage(viewer, image);
        cornerstone.getViewport(viewer).labelmap = true;


        var stack = { currentImageIdIndex: 0, imageIds: imageIds };
        cornerstoneTools.addStackStateManager(viewer, ["stack"]);
        cornerstoneTools.addToolState(viewer, "stack", stack);

        cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
        cornerstoneTools.addTool(ThresholdsBrushTool);
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
        cornerstoneTools.addTool(cornerstoneTools.PanTool);

        // This tool allows you to get the area of a circled area using a brush.
        cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);

        // Activate tools as needed; default active tool is brush and stack scroll.
        cornerstoneTools.setToolPassive('ThresholdsBrush', { mouseButtonMask: 1 });
        cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
        cornerstoneTools.setToolPassive('Zoom', { mouseButtonMask: 1 });
        cornerstoneTools.setToolPassive('FreehandRoi', { mouseButtonMask: 1 });
        cornerstoneTools.setToolPassive('Pan', { mouseButtonMask: 1 });
        currentTool = 'ThresholdsBrush';

    });

};


window.onload = function () {

    document.body.addEventListener('dragover', onDragOver);
    document.body.addEventListener('drop', onDrop);
};
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
window.onkeyup = function (event) {

    //if (event.key == '-') {
    //    cornerstoneTools.store.state.tools[1].decreaseBrushSize();
    //} else if (event.key == '=') {
    //    cornerstoneTools.store.state.tools[1].increaseBrushSize();
    //}


    //else if (event.key == '0') {

    //    segModule.setters.decrementActiveSegmentIndex(viewer);

    //    if (segModule.getters.activeSegmentIndex(viewer) == 4) {
    //        segModule.setters.decrementActiveSegmentIndex(viewer);

    //    }

    //    if (segModule.getters.activeSegmentIndex(viewer) == 65535) {
    //        segModule.setters.activeSegmentIndex(viewer, 6);

    //    }
    //}
    //else if (event.key == '9') {


    //    segModule.setters.incrementActiveSegmentIndex(viewer);

    //    if (segModule.getters.activeSegmentIndex(viewer) == 4) {
    //        segModule.setters.incrementActiveSegmentIndex(viewer);
    //    }
    //    if (segModule.getters.activeSegmentIndex(viewer) > 6) {
    //        segModule.setters.activeSegmentIndex(viewer, 1);
    //    }
    //}
    //else if (event.key == '1') {

    //    cornerstoneTools.setToolDisabled(currentTool);
    //    cornerstoneTools.setToolActive('ThresholdsBrush', { mouseButtonMask: 1 });
    //    currentTool = 'ThresholdsBrush';

    //}
    //else if (event.key == '2') {
    //    cornerstoneTools.setToolDisabled(currentTool);
    //    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
    //    currentTool = 'Zoom';
    //}
    // cornerstoneTools.getModule('segmentation').setters.incrementActiveSegmentIndex(viewer);

    // this was an else if now it is just an if in case we want to change it back to keys on keyboard
    if (event.key == '0') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 });
        currentTool = 'FreehandRoi';
    }
    else if (event.key == '4') {

        var labelMap2D = segModule.getters.labelmap2D(viewer).labelmap2D;
        var image = cornerstone.getImage(viewer);

        var areas = getBrushArea(labelMap2D, image);

        var output1 = document.getElementById("output1");
        var output2 = document.getElementById("output2");
        var output3 = document.getElementById("output3");
        var output4 = document.getElementById("output4");
        var output5 = document.getElementById("output5");

        if (areas.red != null) {
            output1.innerHTML = "red brush: " + areas.red + 'mm\u00B2';
        }
        if (areas.blue != null) {
            output2.innerHTML = "blue brush: " + areas.blue + 'mm\u00B2';
        }
        if (areas.green != null) {
            output3.innerHTML = "green brush: " + areas.green + 'mm\u00B2';
        }
        if (areas.purple != null) {
            output4.innerHTML = "purple brush: " + areas.purple + 'mm\u00B2';
        }
        if (areas.fuchsia != null) {
            output5.innerHTML = "pink brush: " + areas.fuchsia + 'mm\u00B2';
        }

        console.log("red brush: " + areas.red + 'mm\u00B2');
        console.log("blue brush: " + areas.blue + 'mm\u00B2');
        console.log("green brush: " + areas.green + 'mm\u00B2');
        console.log("purple brush: " + areas.purple + 'mm\u00B2');
        console.log("pink brush: " + areas.fuchsia + 'mm\u00B2');
    }
    else if (event.key == '5') {
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
    else if (event.key == '1') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 });
        currentTool = 'Pan';
    }
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
    //undo
    else if (event.key == '6') {
        segModule.setters.undo(viewer);
    }
    //redo
    else if (event.key == '7') {
        segModule.setters.redo(viewer);
    }
    //clear
    else if (event.key == '8') {
        segModule.setters.deleteSegment(viewer, 1);
        segModule.setters.deleteSegment(viewer, 2);
        segModule.setters.deleteSegment(viewer, 3);
        segModule.setters.deleteSegment(viewer, 4);
    }
};

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