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
            this._imageDepth = 0;
            this._imageXSize = 0;
            this._imageYSize = 0;
        }
        return dataManager.instance;
    }
    instance = new dataManager();
}
