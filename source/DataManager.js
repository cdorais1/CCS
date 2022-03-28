import * as cornerstone from "cornerstone-core";

// This class is a data container and will not have any methods of its own.
class dataManager
{
    // Create a constructor with dummy variables to list out necessary information gathered from the passed in DICOM; subject to change.
    constructor(dicom)
    {
        if (!dataManager.instance)
        {
            dataManager.instance = this;

            // Instantiate vectors to hold information on all DICOMs in a series. 
            this._imageDepth = [];
            this._imageXSize = [];
            this._imageYSize = [];
        }

        return dataManager.instance;
    }

    instance = new dataManager();

}
