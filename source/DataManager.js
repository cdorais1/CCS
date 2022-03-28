import * as cornerstone from "cornerstone-core";
import assert from 'assert';

// This class is a data container and will not have any methods of its own.
class dataManager
{
    // Create a constructor with dummy variables to list out necessary information gathered from the passed in DICOM; subject to change.
    constructor(dicom)
    {
        //Is this a DICOM file?, if not print "Unable to read, please insert a DICOM file" *need to make a 'input' variable
        console.assert(input = dicom, "Unable to read, please insert a DICOM file");

        if (!dataManager.instance)
        {
            dataManager.instance = this;
            this._imageDepth = 0;
            this._imageXSize = 0;
            this._imageYSize = 0;
            this._numberOfPictures = 0;
        }
        return dataManager.instance;
    }
    instance = new dataManager();
}
