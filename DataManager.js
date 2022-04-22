// This class is a data container and will not have any methods of its own.


export class dataManager {
    constructor(dataSet) {
        this.dataSet = dataSet; // Store dataset for future use. 
        this.imageXDim = dataSet.floatString('x00200032', 0); // x dimension/width   
        this.imageYDim = dataSet.floatString('x00200032', 1); // y dimension/height
        this.imageZDim = dataSet.floatString('x00200032', 2); // z dimension/depth 
        this.patientID = dataSet.string('x00100020'); // Patient id 
        this.sopInstanceUid = dataSet.string('x0020000d') // Unique id of DICOM/image
        this.seriesUid = dataSet.string('x0020000e') // id of image in series. 
        this.row = dataSet.uint16('x00280010') // rows element needed for images.
        this.imageID = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);



    }
}


//This class is a an object holding all necessary statistical data
class morphologicFeatures
{
	// Create a constructor with dummy variables to list out necessary STATISTICAL information gathered from the passed in DICOM; subject to change.
	constructor(statistics)
	{
		if (!morphologicFeatures.instance)
		{
			morphologicFeatures.instance = this;

            		//specific morphologic features of interest
            		this.morphNumber = [];
            		this._morphSize = [];
            		this._morphShape = [];
            		this._touchingLumen = []; //vessel wall
            		this._notThouchingLumen = []; //vessel wall
            		this.protrudingIntoLumen = []; //vessel wall
            		this._numOfDiscreteCalcifications = [];
            		this._density = []; //pixel signal intensity
		}

		return morphologicFeatures.instance;
	}
	
	instance = new morphologicFeatures();