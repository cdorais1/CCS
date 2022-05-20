/* Need to convert typed arrays before adding to json.
 *                                       EXAMPLE
 * const typedArray = cornerstoneTools.getModule('segmentation').getters.labelmap2D(viewer).labelmap2D.pixelData; // This is an Uint16 Array
 * const twoDlab = [...typedArray];
*/

// Convert annotation data to json format and export a json file with tool configurations.
function convertToJSON(image) {
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
//    let ts3 = toolStates.tools[4].element;
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
    // Reassemble the ThresholdBrushTool in a json-friendly format.
    const ToolFive = {
        activeStrategy: ts1,
        defaultStrategy: ts2,
        element: cornerstone.getEnabledElement(viewer),
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

    // Create structure for json upload.
    const structure =
    {
        activeBrushSegment: cornerstoneTools.getModule('segmentation').getters.activeSegmentIndex,
        studyInstanceUID: studyInstanceUIDval,
        tools: toolStack
    };

    // Make structure json-acceptable. 
    var JSONArray = JSON.stringify(structure);
    console.log("Brush: ");
    console.log(ToolFive);


    JSONArray = [JSONArray];

    // Create element for downloading json file.
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

// Allow users to resume annotations from a previous save state.
function updateFromJSON(jsonfile) {

    let temp;
    console.log(jsonfile);
    let reader = new FileReader();

    // Get contents of passed in json file.
    reader.readAsText(jsonfile);
    reader.onload = function () {
        let result = reader.result;
        temp = JSON.parse(result);
        
        if (dicomParser.parseDicom(cornerstone.getImage(viewer).data.byteArray).string('x0020000d') == temp.studyInstanceUID) {
            console.log("Study Instance UIDs match!");
            console.log(dicomParser.parseDicom(cornerstone.getImage(viewer).data.byteArray).string('x0020000d'));
            console.log(temp.studyInstanceUID);

            // All tools but the brush tool can be added to the json with minimal problem due to lack of typed arrays.
            const ToolOne = temp.tools[0]; //Stack Scroll Mousewheel Tool
            const ToolTwo = temp.tools[1]; // Zoom Tool
            const ToolThree = temp.tools[2]; // Pan Tool
            const ToolFour = temp.tools[3]; // Length Tool

            // The ThresholdBrushTool has many components that are fine when imported, but has multiple typed arrays that misbehave when passed to json format.
            let ts1 = temp.tools[4].activeStrategy;
            let ts2 = temp.tools[4].defaultStrategy;
            let ts3 = temp.tools[4].element;
            let ts4 = temp.tools[4].hideDefaultCursor;
            let ts5 = temp.tools[4].initialConfiguration;
            let ts6 = temp.tools[4].mode;
            let ts7 = temp.tools[4].name;
            // paintEventData goes here in the lineup
            let ts8 = temp.tools[4].renderBrush;
            let ts9 = temp.tools[4].strategies;
            let ts10 = temp.tools[4].supportedInteractionTypes;
            let ts11 = temp.tools[4].touchDragCallBack;
            let ts12 = temp.tools[4].updateOnMouseMove;
            let ts13 = temp.tools[4]._configuration;
            let ts14 = temp.tools[4]._cursors;
            let ts15 = temp.tools[4]._drawing;
            let ts16 = temp.tools[4]._drawingMouseUpCallBack;
            let ts17 = temp.tools[4]._lastImageCoords;
            let ts18 = temp.tools[4]._mouseUpRender;
            let ts19 = temp.tools[4]._options;
            let ts20 = temp.tools[4].configuration;
            let ts21 = temp.tools[4].options;

            // Dissect the paintEventData and convert all Uint16 arrays.
            if (temp.tools[4].paintEventData != undefined) {
                let paintEventData = temp.tools[4].paintEventData;
                let v0 = paintEventData.activeLabelMapIndex;
                let v1 = paintEventData.currentImageIdIndex;

                // All aspects of the labelmap2D
                let v20 = new Uint16Array(paintEventData.labelmap2D.pixelData);
//                let v201 = [...v20];
                let v21 = paintEventData.labelmap2D.segmentsOnLabelmap;

                // Converted labelmap2D to be passed into the json file 
                let v2 = {
                    pixelData: v20,
                    segmentsOnLabelmap: v21
                }

                // All aspects of the labelmap3D
                let v30 = paintEventData.labelmap3D.activeSegmentIndex;
                let v311 = new ArrayBuffer(paintEventData.labelmap3D.buffer);
//                let v31 = [...v311];
                let v32 = paintEventData.labelmap3D.colorLUTIndex;
                let v330 = paintEventData.labelmap3D.labelmaps2D;
                let v33 = []; // labelmaps2D array
                for (let ii = 0; ii < v330.length; ii++) {
                    if (v330[ii] != undefined) {
                        let typedarray = new Uint16Array(v330[ii].pixelData);
                        // let temp = [...typedarray];
                        let temp1 = {
                            pixelData: typedarray,
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
                    buffer: v311,
                    colorLUTIndex: v32,
                    labelmaps2D: v33,
                    metaData: v34,
                    redo: v35,
                    segmentsHidden: v36,
                    undo: v37
                };

                let v40 = new Uint16Array(paintEventData.previousPixelData);
                let v5 = paintEventData.shouldErase;

                var paint_event_data = {
                    activeLabelMapIndex: v0,
                    currentImageIdIndex: v1,
                    labelmap2D: v2,
                    labelmap3D: v3,
                    previousPixelData: v40,
                    shouldErase: v5
                };
            }

            // Reassemble the ThresholdBrush in the correct configuration.
            const ToolFive = {
                activeStrategy: ts1,
                defaultStrategy: ts2,
                element: null,
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
            // Check if current ThresholdsBrushTool's paintEventData is undefined. 
            if (cornerstoneTools.store.state.tools[4].paintEventData != undefined) {
                cornerstoneTools.store.state.tools[4].paintEventData.labelmap2D = ToolFive.paintEventData.labelmap2D;

                // Update Active Segment Index
                cornerstoneTools.store.state.tools[4].paintEventData.labelmap3D.activeSegmentIndex
                    = ToolFive.paintEventData.labelmap3D.activeSegmentIndex;
                // Update Color LUT Index
                cornerstoneTools.store.state.tools[4].paintEventData.labelmap3D.colorLUTIndex
                    = ToolFive.paintEventData.labelmap3D.colorLUTIndex;
                // Update labelmaps2D
                cornerstoneTools.store.state.tools[4].paintEventData.labelmap3D.labelmaps2D
                    = ToolFive.paintEventData.labelmap3D.labelmaps2D;
                // Update redo
                cornerstoneTools.store.state.tools[4].paintEventData.labelmap3D.redo
                    = ToolFive.paintEventData.labelmap3D.redo;
                // Update undo
                cornerstoneTools.store.state.tools[4].paintEventData.labelmap3D.undo
                    = ToolFive.paintEventData.labelmap3D.undo;
            }

            cornerstone.updateImage(viewer);
        }
        else {
            console.log("Too bad! No match!");
            console.log(dicomParser.parseDicom(cornerstone.getImage(viewer).data.byteArray).string('x0020000d'));
            console.log(temp.studyInstanceUID);
        }
    }

    return 0;
}
