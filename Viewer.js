cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;


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

    imageIds = [];

    for (var i = 0; i < event.dataTransfer.files.length; i++) {

        var file = event.dataTransfer.files[i];
        imageIds.push(cornerstoneWADOImageLoader.wadouri.fileManager.add(file));

    }

    cornerstone.loadImage(imageIds[0]).then(function (image) {

        console.log('Loaded', image);

        cornerstoneTools.init();

        var viewer = document.getElementById('viewer');
        var drawingCanvas = document.getElementById('drawingCanvas');

        cornerstone.enable(viewer);
        cornerstone.displayImage(viewer, image);


        var stack = { currentImageIdIndex: 0, imageIds: imageIds };
        cornerstoneTools.addStackStateManager(viewer, ["stack"]);
        cornerstoneTools.addToolState(viewer, "stack", stack);

        cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
        cornerstoneTools.addTool(ThresholdsBrushTool);
        cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
        cornerstoneTools.addTool(cornerstoneTools.FreehandRoiTool);

        console.log(image.minPixelValue);
        console.log(image.maxPixelValue);

        cornerstone
        // Brush is right click, zoom is left click.
        cornerstoneTools.setToolActive('ThresholdsBrush', { mouseButtonMask: 1 });
        cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
        cornerstoneTools.setToolPassive('Zoom', { mouseButtonMask: 1 });
        // This tool allows you to get the area of a circled area using a brush.
        cornerstoneTools.setToolPassive('FreehandRoi', { mouseButtonMask: 1 });
        currentTool = 'ThresholdsBrush';

        // this adds a new layer to the cornerstone element viewer.
        var layerId = cornerstone.addLayer(viewer);
        console.log(layerId);
        console.log(cornerstone.setActiveLayer(layerId));

    });

};

window.onload = function () {

    document.body.addEventListener('dragover', onDragOver);
    document.body.addEventListener('drop', onDrop);
};

window.onkeyup = function (event) {

    if (event.key == '-') {
        cornerstoneTools.store.state.tools[1].decreaseBrushSize();
    } else if (event.key == '=') {
        cornerstoneTools.store.state.tools[1].increaseBrushSize();
    }

    else if (event.key == '0') {
        cornerstoneTools.getModule('segmentation').setters.decrementActiveSegmentIndex(viewer);
    } else if (event.key == '1') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('ThresholdsBrush', { mouseButtonMask: 1 });
        currentTool = 'ThresholdsBrush';
    }
    else if (event.key == '2') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 });
        currentTool = 'Zoom';
    }
    // cornerstoneTools.getModule('segmentation').setters.incrementActiveSegmentIndex(viewer);
    else if (event.key == '3') {
        cornerstoneTools.setToolDisabled(currentTool);
        cornerstoneTools.setToolActive('FreehandRoi', { mouseButtonMask: 1 });
        currentTool = 'FreehandRoi';
    }
};
