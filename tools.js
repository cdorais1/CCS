import * as cornerstone from "cornerstone-core";

//•••1.) A panning tool to move around the selected image (click and hold to move around) •••

// Init cornerstone tools
cornerstoneTools.init();

// Enable any elements, and display images
// ...

// Add our tool, and set it's mode
const PanTool = cornerstoneTools.PanTool;

cornerstoneTools.addTool(PanTool)
cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 })


//•••2.) A zoom tool to magnify or reduce the image. (click down for zoom in, click up for zoom out)•••

// Init cornerstone tools
cornerstoneTools.init();

// Enable any elements, and display images
// ...

// Add our tool, and set it's mode
const ZoomTool = cornerstoneTools.ZoomTool;

cornerstoneTools.addTool(cornerstoneTools.ZoomTool, {
    // Optional configuration
    configuration: {
        invert: false,
        preventZoomOutsideImage: false,
        minScale: .1,
        maxScale: 20.0,
    }
});

cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 })


//•••3.) A brush tool to annotate the image. (seems kinda crappy to me ngl)•••

const element = document.querySelector('.cornerstone-element');

// Init CornerstoneTools
cornerstoneTools.init();
cornerstone.enable(element);

const toolName = 'Brush';
const imageId = 'wadouri:https://example.com/assets/dicom/bellona/chest_lung/1.dcm';

// Display our Image
cornerstone.loadImage(imageId).then(function (image) {
    cornerstone.displayImage(element, image);
});

// Add the tool
const apiTool = cornerstoneTools[`${toolName}Tool`];
cornerstoneTools.addTool(apiTool);
cornerstoneTools.setToolActive(toolName, { mouseButtonMask: 1 });

//•••4.) A clearing tool to remove user annotations •••

//EXAMPLE NOT YET COMPLETE




//NOT ON WRITE UP, MIGHT BE USEFUL CORNERSTONE FUNCTIONS

//•5.) Stack Scroll MouseWheel Tool (for sifting through all images, scroll up for top pics, down for bottom pics) •

// Init cornerstone tools
cornerstoneTools.init()

const scheme = 'wadouri';
const baseUrl = 'https://mypacs.com/dicoms/';
const series = [
    'image_1.dcm',
    'image_2.dcm'
]

const imageIds = series.map(seriesImage => `${scheme}:${baseUrl}${seriesImage}`

// Add our tool, and set it's mode
const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;

//define the stack
const stack = {
    currentImageIdIndex: 0,
    imageIds
}

// load images and set the stack
cornerstone.loadImage(imageIds[0]).then((image) => {
    cornerstone.displayImage(element, image)
    cornerstoneTools.addStackStateManager(element, ['stack'])
    cornerstoneTools.addToolState(element, 'stack', stack)
})

cornerstoneTools.addTool(StackScrollMouseWheelTool)
cornerstoneTools.setToolActive('StackScrollMouseWheel', {})


//•6.) WWWC Tool (brightining tool, click and scroll up for light, down for dark) •

// Init cornerstone tools
cornerstoneTools.init();

// Enable any elements, and display images
// ...

// Add our tool, and set it's mode
const WwwcTool = cornerstoneTools.WwwcTool;

cornerstoneTools.addTool(WwwcTool)
cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })