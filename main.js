song = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', getPoses);
}

function getPoses(results) {
    if (results.length > 0) {
        leftWrist = results[0].pose.keypoints[9].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}

function preload() {
    song = loadSound('music.mp3');
    song2 = loadSound('music2.mp3');
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('RED');
    stroke('RED');
    if (leftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        position = floor(Number(leftWristY));
        vol = position / 500;
        document.getElementById('volume').innerHTML = "Volume: " + vol;
        song.setVolume(vol);
        song2.setVolume(vol);
    }
}

function play1() {
    song1value = 0;
    if (song.isPlaying()) {
        song1value = 1;
    }

    if (song1value === 0) {
        song.play();
        song.setVolume(1);
        song.rate(1);
        document.getElementById('song1').innerHTML = "Stop Song 1";
    }
    
    if (song1value === 1) {
        song.stop();
        document.getElementById('song1').innerHTML = "Play Song 1";
        song1value = 0;
    }

    if (song2.isPlaying()) {
        song2.stop();
        document.getElementById('song2').innerHTML = "Play Song 2";
    }
}

function play2() {
    song2value = 0;
    if (song2.isPlaying()) {
        song2value = 1;
    }

    if (song2value === 0) {
        song2.play();
        song2.setVolume(1);
        song2.rate(1);
        document.getElementById('song2').innerHTML = "Stop Song 2";
    }
    
    if (song2value === 1) {
        song2.stop();
        document.getElementById('song2').innerHTML = "Play Song 2";
        song1value = 0;
    }

    if (song.isPlaying()) {
        song.stop();
        document.getElementById('song1').innerHTML = "Play Song 1";
    }
}

function modelLoaded() {
    console.log('model loaded');
}

