/**
 *
 * 
 * @class
 */
 const scrollToIndex = csTools('util/scrollToIndex')

 cornerstoneTools.external.cornerstone = cornerstone
 cornerstoneTools.external.cornerstoneMath = cornerstoneMath
 cornerstoneFileImageLoader.external.cornerstone = cornerstone
 cornerstoneWebImageLoader.external.cornerstone = cornerstone
 cornerstoneWADOImageLoader.external.cornerstone = cornerstone
 cornerstoneWADOImageLoader.external.dicomParser = dicomParser
 cornerstoneTools.external.Hammer = Hammer
 cornerstoneTools.init({ globalToolSyncEnabled: true,})
 
 class Viewer  {
  constructor(props) {
    super(props)
    this.files = null
    this.filename = ''
    this.localfile = null
    this.localurl = null
    this.fsItem = null
    this.dicomImage = null
    this.explorerIndex = 0
    this.imageId = null
    this.image = null
    this.isDicom = false
    this.layoutIndex = 0
    this.numberOfFrames = 1
    this.measurements = []
    this.xSize = 0
    this.ySize = 0
    this.zSize = 0
    this.volume = null
    this.originImage = null
    this.mprPlane = ''
    this.sliceMax = 0
    this.sliceIndex = 0
    this.mpr = {}      
    this.referenceLines = {}
    this.shouldScroll = false
  }

  state = {
    visibleOpenUrlDlg: false,
    progress: null,
    visibleCinePlayer: false,
    errorOnOpenImage: null,
    errorOnCors: false,
    frame: 1,
    inPlay: false,
    viewport: null,
  }

  getPixelRepresentation = () => {
    const value = this.image.data.uint16('x00280103')
    if (value === undefined) return
    return value + (value === 0 ? ' (unsigned)' : ' (signed)')
  }

  getPlanarConfiguration = () => {
    const value = this.image.data.uint16('x00280006')
    if (value === undefined) return 
    return value + (value === 0 ? ' (pixel)' : ' (plane)')
  }

  getDicomViewerElement = () => {
    return document.getElementsByClassName('cornerstone-enabled-image')
  }
 
  onImageLoaded = (e) => {
    this.props.onLoadedImage()
  }
  onImageRendered = (e) => {
    const viewport = cornerstone.getViewport(e.target)
    this.zoom = Math.round(viewport.scale.toFixed(2)*100)

    document.getElementById(
      `mrtopleft-${this.props.index}`
    ).textContent = this.mprIsOrthogonalView() ? `${capitalize(this.mprPlane)}` : `${this.PatientsName}`

    document.getElementById(
      `mrtopright-${this.props.index}`
    ).textContent = `${viewport.displayedArea.brhc.x}x${viewport.displayedArea.brhc.y}`

    document.getElementById(
      `mrbottomleft-${this.props.index}`
    ).textContent = `WW/WC: ${Math.round(viewport.voi.windowWidth)}/${Math.round(viewport.voi.windowCenter)}`

    document.getElementById(
      `mrbottomright-${this.props.index}`
    ).textContent = `Zoom: ${this.zoom}%`

    document.getElementById(
      `mrtopcenter-${this.props.index}`
    ).textContent = ``
    document.getElementById(
      `mrbottomcenter-${this.props.index}`
    ).textContent = ``    
    document.getElementById(
      `mrleftcenter-${this.props.index}`
    ).textContent = ``      
    document.getElementById(
      `mrrightcenter-${this.props.index}`
    ).textContent = ``  

    if (this.mprPlane === 'sagittal') {
      document.getElementById(
        `mrtopcenter-${this.props.index}`
      ).textContent = `S`
      document.getElementById(
        `mrbottomcenter-${this.props.index}`
      ).textContent = `I`    
      document.getElementById(
        `mrleftcenter-${this.props.index}`
      ).textContent = `A`      
      document.getElementById(
        `mrrightcenter-${this.props.index}`
      ).textContent = `P`  

    } else if (this.mprPlane === 'axial') {
      document.getElementById(
        `mrtopcenter-${this.props.index}`
      ).textContent = `A`
      document.getElementById(
        `mrbottomcenter-${this.props.index}`
      ).textContent = `P`    
      document.getElementById(
        `mrleftcenter-${this.props.index}`
      ).textContent = `R`      
      document.getElementById(
        `mrrightcenter-${this.props.index}`
      ).textContent = `L`    

    } else if (this.mprPlane === 'coronal') {
      document.getElementById(
        `mrtopcenter-${this.props.index}`
      ).textContent = `S`
      document.getElementById(
        `mrbottomcenter-${this.props.index}`
      ).textContent = `I`    
      document.getElementById(
        `mrleftcenter-${this.props.index}`
      ).textContent = `R`      
      document.getElementById(
        `mrrightcenter-${this.props.index}`
      ).textContent = `L`                    
    }    

    if (this.referenceLines.isScoutDraw) {
      this.referenceLines.isScoutDraw = false
      this.referenceLinesDraw()
    }

    if (this.mpr.isSliceLocation) {
      this.mpr.isSliceLocation = false
      this.mprSliceLocationDraw()
    }

    if (this.isDicom && this.state.visibleCinePlayer && this.numberOfFrames > 1) {
      document.getElementById(
        `frameLabel-${this.props.index}`
      ).textContent = `${this.state.frame} / ${this.numberOfFrames}`
      if (this.state.inPlay) {
        let frame = this.state.frame === this.numberOfFrames ? 1 : this.state.frame+1
        this.setState({frame: frame})
      }
    }

    this.props.onRenderedImage(this.props.index)
  }
  displayImageFromFiles = (index) => {

    const files = this.files === null ? this.props.files : this.files

    const image = files[index].image
    const imageId = files[index].imageId
    this.filename = files[index].name
    this.sliceIndex = index

    const element = this.dicomImage
    element.addEventListener("cornerstonenewimage", this.onNewImage)
    element.addEventListener("cornerstoneimagerendered", this.onImageRendered)
    element.addEventListener("cornerstonetoolsmeasurementadded", this.onMeasurementAdded)
    element.addEventListener("cornerstonetoolsmeasurementmodified", this.onMeasurementModified)
    element.addEventListener("cornerstonetoolsmeasurementcompleted", this.onMeasurementCompleted)
    cornerstone.enable(element)

    this.image = image
    this.isDicom = true
    this.PatientsName = image.data.string('x00100010')
    this.sopInstanceUid = this.getSopInstanceUID()

    let stack = { currentImageIdIndex: 0, imageIds: "" }
    this.numberOfFrames = image.data.intString('x00280008')
    if (this.numberOfFrames > 0) {
      let imageIds = []	
      for(var i=0; i < this.numberOfFrames; ++i) {
        imageIds.push(imageId + "?frame="+i)
      }	
      stack.imageIds = imageIds
    }

    cornerstone.displayImage(element, image)

    this.mprPlanePosition()
    this.enableTool()

    if (this.numberOfFrames > 1) {
      cornerstoneTools.addStackStateManager(element, ['stack', 'playClip']);    
      cornerstoneTools.addToolState(element, 'stack', stack)
      this.setState({frame: 1})
    }
   
    db.measurement.where('sopinstanceuid').equals(this.sopInstanceUid).each(measure => {
      this.measurementSave(measure)
      cornerstoneTools.addToolState(element, measure.tool, measure.data)
      this.runTool(measure.tool)
      cornerstone.updateImage(element)
      cornerstoneTools.setToolEnabled(measure.tool)
    }).then(() => {
        this.props.setActiveMeasurements(this.measurements)
        this.props.setActiveDcm(this)  
        this.props.setIsOpenStore({index: this.props.index, value: true})         
      
    })   
    
  }

}