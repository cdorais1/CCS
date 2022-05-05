cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
segModule = cornerstoneTools.getModule('segmentation');

var currentTool = '';
var image1;

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
//        cornerstone.getViewport(viewer).labelmap = true;


        var stack = { currentImageIdIndex: 0, imageIds: imageIds };
        cornerstoneTools.addStackStateManager(viewer, ["stack"]);
        cornerstoneTools.addToolState(viewer, "stack", stack);

        cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
        cornerstoneTools.addTool(ThresholdsBrushTool);
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
        cornerstoneTools.addTool(cornerstoneTools.PanTool);
        cornerstoneTools.addTool(cornerstoneTools.LengthTool);

        // This tool allows you to get the area of a circled area using a brush.
        cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);

        // Activate tools as needed; default active tool is brush and stack scroll.
        cornerstoneTools.setToolPassive('ThresholdsBrush', { mouseButtonMask: 1 });
        cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
        cornerstoneTools.setToolPassive('Zoom', { mouseButtonMask: 1 });
        cornerstoneTools.setToolPassive('FreehandRoi', { mouseButtonMask: 1 });
        cornerstoneTools.setToolPassive('Pan', { mouseButtonMask: 1 });
        cornerstoneTools.setToolPassive('Length', { mouseButtonMask: 1 });
        currentTool = 'ThresholdsBrush';

    });

};


window.onload = function () {

    document.body.addEventListener('dragover', onDragOver);
    document.body.addEventListener('drop', onDrop);
};
// function brushbutton that will allow the onclick event when the user is pressing the brush button

window.onkeyup = function (event) {

    // this was an else if now it is just an if in case we want to change it back to keys on keyboard
    if (event.key == '0') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 });
        currentTool = 'FreehandRoi';
    }
    else if (event.key == '1') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('Length', { mouseButtonMask: 1 });
        currentTool = 'Length';
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
    else if (event.key == '3') {

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
    else if (event.key == '4') {
        var image = cornerstone.getImage(viewer);
        var labelMap2D = segModule.getters.labelmap2D(viewer).labelmap2D;
        var simpleVolumes = getVolume(labelMap2D, image);
        console.log("red: " + simpleVolumes.red + 'mm\u00B3');
        console.log("blue: " + simpleVolumes.blue + 'mm\u00B3');
        console.log("green: " + simpleVolumes.green + 'mm\u00B3');
        console.log("purple: " + simpleVolumes.purple + 'mm\u00B3');
        console.log("pink: " + simpleVolumes.fuchsia + 'mm\u00B3');
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
        clearBrushes(viewer);
    }
    else if (event.key == 'q') {
        var labelMap2D = segModule.getters.labelmap2D(viewer).labelmap2D;
        var image = cornerstone.getImage(viewer);
        convertToJSON(labelMap2D, image);
    }


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

};