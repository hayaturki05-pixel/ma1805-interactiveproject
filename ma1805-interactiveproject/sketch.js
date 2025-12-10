let speed = 2;           // This is the scroll speed on how fast my instagram story images are scrolling down
let frameW, frameH, frameX; //Here we declare the frame width, frame height, and the horizontal x position of the images  

let yPositions = [];     // The Y position of each frame to include the following images as fit 
let imageIndex = [];     // Which image each frame currently shows (by the number) 
let dailySound; //The variable for the daily sound audio 
let palestineSound; //The variable for the palestine audio 
let currentAudio;  //The variable for whichever audio is currently playing on an instagram story image 


let contentImages = [             //The variable for the listed instagram story images in chronological order on which it is displayed        
  "images/daily-image1.jpg",
  "images/palestine-image1.jpg",
  "images/daily-image2.jpg",
  "images/palestine-image2.jpg",
  "images/daily-image3.jpg",
  "images/palestine-image3.jpg",
  "images/daily-image4.jpg", 
  "images/palestine-image4.jpg",
  "images/daily-image5.jpg", 
  "images/palestine-image5.jpg", 
];

let contentPics = [];    // This is where we save the loaded images 
let nextIndex = 0;       // Moves to the following image to display when a frame wraps


function preload() {
  // Load all instagram story images
  for (let i = 0; i < contentImages.length; i++) {
    contentPics[i] = loadImage(contentImages[i]);
  }
  //Load all sound according to the designated instagram image story 
  dailySound = loadSound("sounds/daily-images-sound.mp3");
  palestineSound = loadSound("sounds/palestine-images-sound.mp3"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Outputs the frame size and centre position for the instagram story images according to these dimensions 
  frameW = contentPics[0].width/1.5; 
  frameH = contentPics[0].height/1.5; 
  frameX = width/2 - frameW/2; 

  // Intiates with three frames stacked from top to bottom
  yPositions[0] = 0;
  yPositions[1] = frameH;
  yPositions[2] = frameH * 2;

  // First three images of the instagram story list
  imageIndex[0] = 0;
  imageIndex[1] = 1;
  imageIndex[2] = 2;

  // The following image to implicate when a frame returns back to the intiated images at the top
  nextIndex = 3;
}


function draw() {
  background (58, 26, 92); 

  // Loop over the frame positions to draw each frame image 
  for (let i = 0; i < yPositions.length; i++) {

    // Move current frame down
    yPositions[i] = yPositions[i] - speed;

    // Check if the frame is not currently in the center of the screen 
    updateYposition(i); 

    // Set which image the frame should show
    let idx = imageIndex[i];

    // Draw the image 
    image(contentPics[idx], frameX, yPositions[i], frameW, frameH);
    //Checks if the current image is a palestine one
    //if yes then call the draw stamp with giving it an x-as position and y-axis position for the image 
    if(contentImages[idx].includes("palestine")){
      let stampX = frameX + frameW - 50;
      let stampY = yPositions[i]+frameH/2;
      drawStamp(stampX, stampY);
    }
  }
}

function updateYposition(i){
// If the image has moved off the bottom of the screen...
    if (yPositions[i]+ frameH < 0) {

      //loop over the y-positions to find the highest y-value 
      let bottomY = yPositions[0];
      for (let j = 1; j < yPositions.length; j++) {
        if (yPositions[j] > bottomY) {
          bottomY = yPositions[j];
        }
      }

      //Move this frame above the highest one
      yPositions[i] = bottomY + frameH;

      //Give this frame the next image
      imageIndex[i] = nextIndex;

      //Update nextIndex
      nextIndex = nextIndex + 1;
      if (nextIndex >= contentImages.length) {
        nextIndex = 0;
      }
    }
}

function drawStamp(x,y){ 
  //fill and draw the quad shape that represents the stamp 
  fill(200,0,0);
  quad(x+45,y-50,x+130,y-5,x+45,y+35,x-40,y-5); 
  //the text inside of the quad shape 
  fill(255)
  textSize(16)
  text("CENSORED",x,y)
}

function mouseClicked() {
  let idx = imageInMiddle(); //Represents which image is currently in the middle of the screen 
  let imgName = contentImages[idx]; //Get the image name 

  // Stop any playing audio 
  dailySound.stop();
  palestineSound.stop();

  //check the type of the image from the image name
  //play the sound depending on its image name 
  if (imgName.includes("daily")) {
    dailySound.play();
  } else if (imgName.includes("palestine")) {
    palestineSound.play();
  }
}

function imageInMiddle() {
  let middleTop = height / 3; //get the middle top of the screen 
  let middleBottom = (2 * height) / 3;//get the middle bottom of the screen 
  //loop over the frames 
  for (let i = 0; i < yPositions.length; i++) {
    let centreY = yPositions[i] + frameH / 2; //get the center of the frame 
    //if the center is in between the middle top and middle bottom...
    if (centreY > middleTop && centreY < middleBottom) {
      return imageIndex[i]; // return index of the displayed image
    }
  }  
}

//Reference: 
  //https://p5js.org/reference/ 