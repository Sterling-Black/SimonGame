
var levels = [];
var user = [];
var btn = ["green","red","yellow","blue"];
var win = false;
var level=0;
// Adding event listener to all keys
$(document).keypress(function(){
    if(win === false){
        win = true;
        levelGenerator();
    }
});

//Adding event listener to the buttons
$(".btn").click(function(event){
    console.log(event.target.id);
    userColor = event.target.id;
    user.push(userColor);
    playSound(userColor);
    press(userColor);

    check(user.length-1);
});

//to play the sound of each button
function playSound(loc){
    var sound = new Audio("sounds/"+loc+".mp3");
    sound.play();
}


function press(id){
    $("#"+id).addClass("pressed");

    playSound(id);
    setTimeout(function(){

        $("#"+id).removeClass("pressed");

    }, 100);
}


function levelGenerator(){
    user = [];
    level++;
    $("#level-title").text("Level "+level);
    var x = Math.floor(Math.random()*4);
    levelColor = btn[x]
    levels.push(levelColor);
    setTimeout(()=>{
        playSound(levelColor);
        $("#"+levelColor).fadeOut().fadeIn();
    },500);
}

function startOver(){
    user = [];
    levels = [];
    level = 0;
}

function check(actuallvl){
    if(user[actuallvl] == levels[actuallvl]){
        if(user.length == levels.length){
            levelGenerator();
        }
    }
    else{
        $("#level-title").text("Game Over Press A Key to Start");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100);
        win = false;
        startOver();
    }
}