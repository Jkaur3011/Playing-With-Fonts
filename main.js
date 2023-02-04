difference = 0;
leftwristx = 0;
rightwristx = 0;
nosex = 0;
nosey = 0;

function setup() {
    captured = createCapture(VIDEO); //video captured
    captured.position(50, 160); //video positioned

    canvas = createCanvas(750, 460); //canvas created
    canvas.position(750, 165); //canvas positioned

    posenetj = ml5.poseNet(captured, modelloaded); //posenet model loaded
    posenetj.on("pose", gotResults); //on func keeps an eye on pose in the console and if any change occurs, 
    //it passes it in func GotResults
}

function modelloaded() {
    console.log("Posenet has been loaded!");
}

function gotResults(results) {
    if (results.length > 0) { //if length of results is more than 0 
        console.log(results); //pass the results in console

        nosex = results[0].pose.nose.x;
        nosey = results[0].pose.nose.y;

        leftwristx = results[0].pose.leftWrist.x; //position of leftwrist x
        rightwristx = results[0].pose.rightWrist.x; //position of rightwrist x
        difference = floor(leftwristx - rightwristx);

    }
}

function draw() {
    background("white"); //background of canvas
    document.getElementById("font_size").innerHTML = "Size of the text is = " + difference + "px";
    textSize(difference);
    user_color = document.getElementById("user_color").value;
    user_text = document.getElementById("user_text").value;
    fill(user_color);
    text(user_text, nosex - 100, nosey);
}