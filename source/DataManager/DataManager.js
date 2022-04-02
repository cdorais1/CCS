// This class is a data container and will not have any methods of its own.
import dataSet from '../../node_modules/dicom-parser/';
import ; 
export class dataManager
{
    constructor(dataSet)
    {
        this.dataSet = dataSet; // Store dataset for future use. 
        this.imageXDim = dataSet.floatString('x00200032', 0); // x dimension/width   
        this.imageYDim = dataSet.floatString('x00200032', 1); // y dimension/height
        this.imageZDim = dataSet.floatString('x00200032', 2); // z dimension/depth 
        this.patientID = dataSet.string('x00100020'); // Patient id 
        this.sopInstanceUid = dataSet.string('x0020000d') // Unique id of DICOM/image
        this.seriesUid = dataSet.string('x0020000e') // id of image in series. 
        this.imageID;
        this.pixelData;
    }
}
