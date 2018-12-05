//Game Values
let min = 1, 
    max = 10, 
    winningNum = getRandomNum(min, max), 
    guessesLeft = 3;

//UI Variables
const UIgame = document.querySelector("#game"),
      UIminNum = document.querySelector(".min-num"),
      UImaxNum = document.querySelector(".max-num"),
      UIguessBtn = document.querySelector("#guess-btn"),
      UIguessInput = document.querySelector("#guess-input"),
      UImessage = document.querySelector("#message");

//Asignar UI min-max
UIminNum.textContent = min;
UImaxNum.textContent = max;

//PlayAgain event
UIgame.addEventListener("mousedown", function(e) {
  if(e.target.classList.contains("play-again")){
    window.location.reload();
  }
});

//EventListener guess
UIguessBtn.addEventListener("click", function(){
  let guess = parseInt(UIguessInput.value);

  //Validar el input
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Por Favor, ingresa un número entre ${min} y ${max}`, 2);
    UIguessInput.value = "";
    return;
  }

  //Verificar si es el número correcto
  if(guess === winningNum){
    //Desactivar el input
    UIguessInput.disabled  = true;
    //Mensaje de ganar
    setMessage(`${winningNum} es correcto, GANASTE!`, true);
    //¿PlayAgain?
    UIguessBtn.value = "Jugar De Nuevo";
    UIguessBtn.className += " play-again";
  } else{
    guessesLeft--;

    if(guessesLeft === 0){
      //GameOver
      setMessage(`GameOver! El número correcto era ${winningNum}`, false)
      UIguessInput.disabled  = true;
      //¿PlayAgain?
      UIguessBtn.value = "Jugar De Nuevo";
      UIguessBtn.className += " play-again";
    } else{
      //Game continue
      setMessage(`${guess} es incorrecto, te quedan ${guessesLeft} vidas`, false)
      UIguessInput.value = "";
    }
  }

  

});


//Function setMessage
function setMessage(text, good){
  if(good){
    UImessage.textContent = text;
    UImessage.style.display = "block";
    UImessage.className = "alert alert-success mt-3";
  } else{
    UImessage.textContent = text;
    UImessage.style.display = "block";
    UImessage.className = "alert alert-danger mt-3";
  }
}

//GetWinningNum
function getRandomNum(min, max){
  return Math.floor(Math.random()*((max-min)+1)+min);
}