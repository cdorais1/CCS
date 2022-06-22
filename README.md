# Carotid Calcium Scanner (CCS)

CCS is a browser-based semi-automatic tool that identifies morphologic features of carotid atherosclerotic calcifications. The current goal of this project is based around allowing users to identify areas of calcific plaque build-up and calculating morphologic features of the build up based on the user annotations. Later goals include automatic identification of calcific plaque structures and potentially a machine learning algorithm to improve detection of calcific plaque. Specific morphologic features of interest include, for example, size, number of discrete calcifications, density (e.g., pixel signal intensity), and spatial information relative to the carotid artery vessel wall. Read our project proposal included in this repository.

You can reach the application [here](https://cdorais1.github.io/CCS/).

# Team Description

## Client Team

Jae Song, MD Neuroradiology 

Brett Cucchiara, MD Vascular Neurology

Grace Wang, MD Vascular Surgery

## Student Developers

Cameo Dorais

Marc Dugas

Kleopatra Gjini

Anthony Tran

Steven Tran


# Who We Are 
We are a team of five undergraduate students majoring in Computer Science at University of Massachusetts, Boston. This project helped bring us together and solidify our abilities to collaborate and work as team due to the challenge of the task at hand and the desire to make a tool that could benefit researchers working on this necessary field of study. Our goal was to make a successful scanning tool that will meet the needs and expectations of our clients in the University of Pennsylvania's Radiology Department. We designed this tool to help with the phenotyping of calcific atherosclerotic plaque deposits in the carotid artery, but this tool can also be used for other medical purposes as needed.

# Clinical Relevance

Carotid artherosclerotic plaque in the neck is a common cause of ischemic stroke in the brain. Atherosclerosis is the deposition of inflamed fat in the vessel walls that lead to hardening of the arteries. Hardened arteries with inflammation can lead to unstable plaque, which can break into pieces and travel and obstruct blood vessels in the brain. Lack of oxygenated blood flow causes strokes. Understanding plaque features that lead to instability are therefore absolutely critical for doctors to identify patients at risk for stroke. Calcific plaque is fascinating as it may have dual roles in both plaque stability and instability. Using noninvasive diagnostic neuroimaging exams such as computed tomographic angiography (CTA) to image the blood vessels, we identify patients with diseased vessels with atherosclerotic plaque. Our client team includes neuroradiologists, vascular neurologists, and vascular surgeons at the University of Pennsylvania. 


# Special Thanks To

The functionality of this project can be attributed to the talented team who developed Cornerstonejs libraries for processing and displaying DICOM images. It is through their examples on their [website](https://www.cornerstonejs.org/) and their readily available source code on [Github](https://github.com/cornerstonejs) that this project was able to be accomplished at all. The tools used to annotate the DICOM image are all pre-designed by this team or by the dvisionlab team who developed [Larvitar](https://github.com/dvisionlab/Larvitar) and their threshold brush tool. This project was a challenge for a group of students who had never thought about medical imaging in any real capacity prior to this project's inception, but having access to these resources made this all a success. 

# How to Use

Once you open the webpage, users are greeted by a landing page with a Get Started button and an "About Us" link in the bottom right corner. The "About Us" will bring users to an informational page with information about the teams involved and the tools able to be used in the web app. Click "Get Started" to begin working on your DICOMs. 


To begin, drag a stack of DICOM images into the Drag and Drop window in the middle of the webpage. Please do not attempt to upload multiple stacks of DICOM images as it currently results in a bug that affects the available brush colors. Once you have uploaded your DICOM images, use the brush tool to begin annotating the image. The threshold sliders will allow you to narrow the range of pixels that can be painted on and help users better narrow down the areas they would like to analyze. The zoom tool and pan tool will enable users to get closer and move the image and help users get more precise in their annotations, and the clear brush button will erase all annotations and let you start fresh. Once you've finished annotating your image, your stats will be displayed on the right side of the page, sorted by color for ease of reading. At the end of an annotation session, you can export your tool data to a json file with the 'q' button on your keyboard and download it to your computer to resume later. More specific information can be found on the Info page accessible on all pages.

