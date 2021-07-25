song1 = "";
song2 = "";

song1Status = "";
song2Status = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;


rightWristX = 0;
rightWristY = 0;

function preload(){
    song1 = loadSound("mahi.mp3");
    song2 = loadSound("makna.mp3");
}

function setup()   {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY = " + rightWristY);

    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("#ff0000");
    stroke("ff0000");

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
    }
    if(song2Status = false){
        song2.play();
        document.getElementById("song_name").innerHTML = "The Makna Song";
    }

    if(scoreLeftWrist > 0.2){
      circle(leftWristX, leftWristY, 20);
      song2.stop();
    }
    if(song1Status = false){
        song1.play();
        document.getElementById("song_name").innerHTML = "O Mahi Song";
    }
}