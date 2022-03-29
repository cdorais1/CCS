import * as cornerstone from "cornerstone-core";
import assert from 'assert';

const realFileBtn = document.getElementById("user-file");
const customTxt = document.getElementById("custom-text");

realFileBtn.addEventListener("change", function() {
    if (realFileBtn.value) {
            customTxt.innerHTML = realFileBtn.value;
        } else {
            customTxt.innerHTML = "No file chosen, yet";
        }
});

// This class is a data container and will not have any methods of its own.
class dataManager
{
    // Create a constructor with dummy variables to list out necessary PICTURE information gathered from the passed in DICOM; subject to change.
    constructor(dicom)
    {
        //Is this a DICOM file?, if not print "Unable to read, please insert a DICOM file" *need to make a 'input' variable
        console.assert(input == dicom, "Unable to read, please insert a DICOM file");

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
