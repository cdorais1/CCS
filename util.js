cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

const realFileBtn = document.getElementById("user-file");
const customTxt = document.getElementById("custom-text");

/*realFileBtn.addEventListener("change", function () {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value;
        file = evt.dataTransfer.files; // trying to figure out how to get files from html
    } else {
        customTxt.innerHTML = "No file chosen, yet";
    }
});
*/
// Program steps 
/* 1. File is uploaded. Data is parsed into a dataSet object, which is then used to populated the dataManager class.*/
function DisplayDICOM() {
    alert("Triggered");
    const fileInput = document.getElementById('user-file');
    console.log(fileInput);

    fileInput.onchange = () => {
        const selectedFiles = [...fileInput.files];
        console.log(selectedFiles);
        const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(selectedFiles);
        const element = document.getElementById('viewer');
        cornerstone.loadImage(imageId).then(image)
        {
            const viewport = cornerstone.getDefaultViewportForImage(element, image);
            cornerstone.displayImage(element, image, viewport);
        }
    }
}


// If stack scroll

// If pan 

// If brush

// If zoom

// If clear 