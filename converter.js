/* Need to convert typed arrays before adding to json.
 *                                       EXAMPLE
 * const typedArray = cornerstoneTools.getModule('segmentation').getters.labelmap2D(viewer).labelmap2D.pixelData; // This is an Uint16 Array
 * const twoDlab = [...typedArray];
*/
function convertToJSON(/*labelmap2D,*/ image) {
    // Get study instance Universal Identifier from the dicom 
    const dataSet = dicomParser.parseDicom(image.data.byteArray);
    const studyInstanceUIDval = dataSet.string('x0020000d');

    // Set up a variable for when we take apart the array of tool state configurations for json import.
    const toolStates = cornerstoneTools.store.state;

    // All tools but the brush tool can be added to the json with minimal problem due to lack of typed arrays.
    const ToolOne = toolStates.tools[0]; //Stack Scroll Mousewheel Tool
    const ToolTwo = toolStates.tools[1]; // Zoom Tool
    const ToolThree = toolStates.tools[2]; // Pan Tool
    const ToolFour = toolStates.tools[3]; // Length Tool

    // The ThresholdBrushTool has many components that are fine when imported, but has multiple typed arrays that misbehave when passed to json format.
    let ts1 = toolStates.tools[4].activeStrategy;
    let ts2 = toolStates.tools[4].defaultStrategy;
    let ts3 = toolStates.tools[4].element;
    let ts4 = toolStates.tools[4].hideDefaultCursor;
    let ts5 = toolStates.tools[4].initialConfiguration;
    let ts6 = toolStates.tools[4].mode;
    let ts7 = toolStates.tools[4].name;
    // paintEventData goes here in the lineup
    let ts8 = toolStates.tools[4].renderBrush;
    let ts9 = toolStates.tools[4].strategies;
    let ts10 = toolStates.tools[4].supportedInteractionTypes;
    let ts11 = toolStates.tools[4].touchDragCallBack;
    let ts12 = toolStates.tools[4].updateOnMouseMove;
    let ts13 = toolStates.tools[4]._configuration;
    let ts14 = toolStates.tools[4]._cursors;
    let ts15 = toolStates.tools[4]._drawing;
    let ts16 = toolStates.tools[4]._drawingMouseUpCallBack;
    let ts17 = toolStates.tools[4]._lastImageCoords;
    let ts18 = toolStates.tools[4]._mouseUpRender;
    let ts19 = toolStates.tools[4]._options;
    let ts20 = toolStates.tools[4].configuration;
    let ts21 = toolStates.tools[4].options;

    // Dissect the paintEventData and convert all Uint16 arrays.
    if (toolStates.tools[4].paintEventData != undefined) {
        let paintEventData = toolStates.tools[4].paintEventData;
        let v0 = paintEventData.activeLabelMapIndex;
        let v1 = paintEventData.currentImageIdIndex;

        // All aspects of the labelmap2D
        let v20 = paintEventData.labelmap2D.pixelData;
        let v201 = [...v20];
        let v21 = paintEventData.labelmap2D.segmentsOnLabelmap;

        // Converted labelmap2D to be passed into the json file 
        let v2 = {
            pixelData: v201,
            segmentsOnLabelmap: v21
        }

        // All aspects of the labelmap3D
        let v30 = paintEventData.labelmap3D.activeSegmentIndex;
        let v311 = new Uint16Array(paintEventData.labelmap3D.buffer);
        let v31 = [...v311];
        let v32 = paintEventData.labelmap3D.colorLUTIndex;
        let v330 = paintEventData.labelmap3D.labelmaps2D;
        let v33 = []; // labelmaps2D array
        for (let ii = 0; ii < v330.length; ii++) {
            if (v330[ii] != undefined) {
                let typedarray = v330[ii].pixelData;
                let temp = [...typedarray];
                let temp1 = {
                    pixelData: temp,
                    segmentsOnLabelmap: v330[ii].segmentsOnLabelmap
                };
                v33.push(temp1);
            }
            else {
                v33.push(undefined);
            }
        }
        let v34 = paintEventData.labelmap3D.metaData;
        let v35 = paintEventData.labelmap3D.redo;
        let v36 = paintEventData.labelmap3D.segmentsHidden;
        let v37 = paintEventData.labelmap3D.undo;

        
        // Converted labelmap3D to be passed into the json file
        let v3 = {
            activeSegmentIndex: v30,
            buffer: v31,
            colorLUTIndex: v32,
            labelmaps2D: v33,
            metaData: v34,
            redo: v35,
            segmentsHidden: v36,
            undo: v37
        };
        
        let v40 = paintEventData.previousPixelData;
        let v4 = [...v40];
        let v5 = paintEventData.shouldErase;

        var paint_event_data = {
            activeLabelMapIndex: v0,
            currentImageIdIndex: v1,
            labelmap2D: v2,
            labelmap3D: v3,
            previousPixelData: v4,
            shouldErase: v5
        };
    }

    const ToolFive = {
        activeStrategy: ts1,
        defaultStrategy: ts2,
        element: ts3,
        hideDefaultCursor: ts4,
        initialConfiguration: ts5,
        mode: ts6,
        name: ts7,
        paintEventData: paint_event_data,
        renderBrush: ts8,
        strategies: ts9,
        supportedInteractionTypes: ts10,
        touchDragCallback: ts11,
        updateOnMouseMove: ts12,
        _configuration: ts13,
        _cursors: ts14,
        _drawing: ts15,
        _drawingMouseUpCallBack: ts16,
        _lastImageCoords: ts17,
        _mouseUpRender: ts18,
        _options: ts19,
        configuration: ts20,
        options: ts21
    }

    let toolStack = [ToolOne, ToolTwo, ToolThree, ToolFour, ToolFive];

    const structure =
    {
        activeBrushSegment: cornerstoneTools.getModule('segmentation').getters.activeSegmentIndex,
        studyInstanceUID: studyInstanceUIDval,
        tools: toolStack
    };

    var JSONArray = JSON.stringify(structure);

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

function updateFromJSON(jsonfile) {
    var temp;
    console.log(jsonfile);
    let reader = new FileReader();
    console.log(reader);
    reader.readAsText(jsonfile);
    reader.onload = function () {
        var temp1 = reader.result;
        temp = JSON.parse(temp1);



        
    }

    return temp;
}
