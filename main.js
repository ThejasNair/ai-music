music1 = "";
music2 = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;

playornot = "";
playornot2 = "";
function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    pose_net = ml5.poseNet(video, ModelLoaded());
    pose_net.on('poses', gotPoses());
}

function ModelLoaded() {
    console.log("PoseNet Initialized!");
}
function gotPoses(results) {
    if(results > 0) {
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;

        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;

        scoreLeftWrist = results[0].pose.keypoints[10].score;
        acoreRightWrist = results[0].pose.keypoints[11].score;
    }
}
function draw() {
    image(video, 0, 300,300);
    fill(255,0,0);
    stroke(0,255,0);
    playornot = music1.isPlaying;
    playornot2 = music2.isPlaying;
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX,leftWristY,20);
        music2.stop();
        if(playornot == false) {
            song1.play()
            document.getElementById("empty_tag").innerHTML = "Harry Potter Theme";
        }
    }
    if(acoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20)
        music1.stop();
        if(playornot == false) {
            song2.play();
            document.getElementById("empty_tag").innerHTML = "Peter Pan Theme";
        }
    }
}