$(document).ready(function(){
    const colors = ["green","red","yellow","blue"];
    let gameSequence = [];
    let userSequence = [];
    let level = 0;
    let started = false;

    function startGame(){
        gameSequence = [];
        userSequence = [];
        level = 0;
        started = true;
        $("h1").text(`Poziom: ${level}`);
        nextSequence();
    };
    
    function nextSequence(){
        userSequence = [];
        level = level + 1;
        $("h1").text(`Poziom: ${level}`);
        const randomNumber = Math.floor(Math.random() * 4); 
        const randomColor = colors[randomNumber]; 
        gameSequence.push(randomColor);
        $(`#${randomColor}`).fadeOut(100).fadeIn(100);
        //playSound(randomColor);
    };
    
    function playSound(color){
        const audio = new Audio(`../dzwiek/${color}.mp3`);
        $(audio).on("error",function(){
            console.error(`Nie znaleziono pliku dźwiękowego: ${color}.mp3`);
        });
        audio.play();
    };
    
    function animatePress(color){
        $(`#${color}`).addClass("pressed");
        setTimeout(() => {
            $(`#${color}`).removeClass("pressed");
        }, 100);
    };
    
    $(".zse-kwadrat").click(function(){
        if (!started) return;
        const userChosenColor = $(this).attr("id");
        userSequence.push(userChosenColor);
        animatePress(userChosenColor); 
        //playSound(userChosenColor);
        checkAnswer(userSequence.length - 1);
    });
    
    function checkAnswer(currentLevel){
        if (userSequence[currentLevel] === gameSequence[currentLevel]){
            if (userSequence.length=== gameSequence.length){
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        }
        else{
            //playSound("game-over")
            $("body").addClass("game-over");
            $("h1").text("Przegrałeś... zacznij od nowa");

            setTimeout(() => { 

                $("body").removeClass("game-over"); 

            }, 200); 

            startOver();
        }
    };
    
    function startOver(){
        started = false;
        level = 0; 
        gameSequence = []; 
        $("h1").text("Naciśnij Start, aby rozpocząć grę");
    }
    
    $(".zse-container").click(function(){
        if (!started){
            startGame();
        }
    });
});

