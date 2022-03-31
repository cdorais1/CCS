import * as dicomParse from "";

import 



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
function readFixedString(byteArray, position, length) {
    if (length < 0) {
        throw 'dicomParser.readFixedString - length cannot be less than 0';
    }

    if (position + length > byteArray.length) {
        throw 'dicomParser.readFixedString: attempt to read past end of buffer';
    }

    var result = '';
    var byte;

    for (var i = 0; i < length; i++) {
        byte = byteArray[position + i];
        if (byte === 0) {
            position += length;

            return result;
        }
        result += String.fromCharCode(byte);
    }

    return result;
}