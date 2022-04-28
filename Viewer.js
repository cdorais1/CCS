
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

function onDragOver(event) {

  // stop browser processing right away
  event.stopPropagation();
  event.preventDefault();

};

function onDrop(event) {

  // stop browser processing right away
  event.stopPropagation();
  event.preventDefault();

  // difference here
  var file = event.dataTransfer.files[0];

  var imageID = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);

  cornerstone.loadImage(imageID).then(function (image) {

    console.log('Loaded', image);

    var viewer = document.getElementById('viewer');
    cornerstone.enable(viewer);
    cornerstone.displayImage(viewer, image);

    viewport = Object.assign

  });
};

window.onload = function () {

  document.body.addEventListener('dragover', onDragOver);
  document.body.addEventListener('drop', onDrop);

};

x = viewport.assign;


addMasks();

function addMasks(){

    try{
        loadLayerSelection();
        addLayerMask();
        deleteLayerMask(true);
        } catch (e) {}
};
