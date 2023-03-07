var mal = new Audio("sounds/wrong.mp3")
var simonColor = []
var simonClick = []

var coloresImagen = ["red", "green", "blue", "yellow"]

var level = 0

function nuevoColor () {
    simonClick = [];
    var random = Math.floor((Math.random() * 4));
    new Audio("sounds/"+coloresImagen[random]+".mp3").play();
    $('.' + coloresImagen[random]).fadeIn(100).fadeOut(100).fadeIn(100);
    simonColor.push(coloresImagen[random]);
    $("#level-title").html("Level " + simonColor.length);
}

function presionarColor (boton) {
    new Audio("sounds/"+boton+".mp3").play();
    $('.' + boton).addClass('pressed').delay(100).queue(function (next) {
        $(this).removeClass('pressed');
        next();
        }
    );
}

$(window).keypress(function () {
    if (level === 0) {
        nuevoColor(); 
        level++;     
    }
})

$(".btn").click(function(){
        presionarColor(this.id);
        simonClick.push(this.id);
        verificar(simonClick.length-1)
})

function verificar(nivel){
    if (simonColor[nivel] === simonClick[nivel]) {
        if (simonColor.length === simonClick.length) {
            setTimeout(nuevoColor, 1000)
        }
    } else {
        mal.play();
        $("body").addClass('game-over').delay(100).queue(function (next) {
            $(this).removeClass('game-over');
            next();
        });
        $("#level-title").html("ya perdiste anormal");
        $('.' + this.id).addClass('pressed').delay(100).queue(function (next) {
            $(this).removeClass('pressed');
            next();
        });
        simonClick = [];
        simonColor = [];
        level = 0;
    }
}