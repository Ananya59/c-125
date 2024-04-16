noseX=0;
noseY=0;
difference = 0;
rightWristX=0;
leftWristY=0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550 , 500);

    canvas = createCanvas(550 , 550);
    canvas.position(560 , 150);

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw() {
    background('#FF7F7F');

    document.getElementById("square_side").innerHTML="Width and Height of the square will be - "+difference+"px";
    fill('#F90093');
    stroke('#F90093');
    square(noseX , noseY , difference);
}

function modelLoaded() {
    console.log('Posenet is initialized!');
}

function gotPoses(results) 
{
    if(results.length>0)
    {
        console.log(results);
        noseX= results[0].pose.nose.x;
        noseY= results[0].pose.nose.y;
        console.log("nose x = " +noseX + "nose y = "+ noseY);

        rightWristX= results[0].pose.rightWrist.x;
        leftWristX= results[0].pose.leftWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("rightwristX = " + rightWristX + "leftwristX ="+leftWristX+ "difference = " + difference);
    }
}