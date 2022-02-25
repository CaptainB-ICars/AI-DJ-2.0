song=""

left_wrist_x=0
left_wrist_y=0

right_wrist_x=0
right_wrist_y=0

function preload()
{
    song=loadSound("JB.mp3")
}

function setup()
{
canvas=createCanvas(200,200)
canvas.position(583,225)
video=createCapture(VIDEO)
video.hide()

poseNet=ml5.poseNet(video,modelLoaded)
poseNet.on('pose',gotPoses)
}

function modelLoaded()
{
    console.log("poseNet is initialized")
}

function draw()
{
image(video,0,0,200,200)

fill("red")
stroke("red")

circle(right_wrist_x,right_wrist_y,40)
if(right_wrist_y>0 && right_wrist_y<100)
{
    document.getElementById("speed").innerHTML="Speed: 0.5x"
    song.rate(0.5)
}

if(right_wrist_y>100 && right_wrist_y<200)
{
    document.getElementById("speed").innerHTML="Speed: 1.0x"
    song.rate(1)
}

if(right_wrist_y>200 && right_wrist_y<300)
{
    document.getElementById("speed").innerHTML="Speed: 1.5x"
    song.rate(1.5)
}

if(right_wrist_y>300 && right_wrist_y<400)
{
    document.getElementById("speed").innerHTML="Speed: 2.0x"
    song.rate(2)
}

circle(left_wrist_x,left_wrist_y,40)
numberleft=Number(left_wrist_y)

removedecimal=floor(numberleft)
volume=removedecimal/200

document.getElementById("volume").innerHTML="Volume: "+volume
song.setVolume(volume)
}

function play()
{
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function stop()
{
    song.stop()
    song.setVolume(0)
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results)

        left_wrist_x=results[0].pose.leftWrist.x
        left_wrist_y=results[0].pose.leftWrist.y

        right_wrist_x=results[0].pose.rightWrist.x
        right_wrist_y=results[0].pose.rightWrist.y

    }
}