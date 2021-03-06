//Selectingarray of squares
const divsNodeList = document.querySelectorAll("div");
const divsArray = Array.prototype.slice.call(divsNodeList);
const squaresArray = divsArray.slice(2, 18);

//Selecting array of inputs
const inputsNodeList = document.querySelectorAll("input");
const inputsArray = Array.prototype.slice.call(inputsNodeList);

//Selecting run button
const runButton = document.querySelector(".btn-run");

//  indexes
let carLocation = 0;
let inputNumber = 0;

function move(coeff, steps) {
    squaresArray[carLocation].classList.remove("car");
    carLocation += coeff * steps;
    squaresArray[carLocation].classList.add("car");
}

function wayIsClear(coeff, steps, carLocation) {
    const moveStep = steps * coeff + carLocation;
    if (moveStep > 15 || moveStep < 0) {
        return false;
    } // forward and backwards
    if (Math.abs(coeff) === 1 && Math.floor(carLocation / 4) !== (Math.floor(moveStep / 4))) {
        return false;
    } // right and left
    return true;
}

function readCommand() {
    inputsArray[inputNumber].value = inputsArray[inputNumber].value.trim();
    const command = inputsArray[inputNumber].value;
    const reCommands = /car\.(forward|backwards|right|left)\((|[0-9])\);/;
    const found = command.match(reCommands);

    if (found !== null && found[0] === found.input) {
        const arrayOfChars = found.input.split('',);
        const direction = found[1];
        let steps = Number(arrayOfChars[arrayOfChars.length - 3]);
        if (steps !== 0) {
            if (isNaN(steps)) {
                steps = 1;
            }
            if (steps > 3) {
                inputsArray[inputNumber].classList.remove("wrong-command");
                alert("Error, Out of range move. Too big step!");
            } else {
                let coeff = 0;
                switch (direction) {
                    case "forward":
                        coeff = 4;
                        break;
                    case "backwards":
                        coeff = (-4);
                        break;
                    case "right":
                        coeff = 1;
                        break;
                    default:
                        coeff = -1;
                        break;
                }
                if (wayIsClear(coeff, steps, carLocation)) {
                    move(coeff, steps);
                    inputsArray[inputNumber].disabled = true;
                    inputsArray[inputNumber].classList.remove("wrong-command");
                    inputsArray[inputNumber].classList.add("correct-command");
                    inputNumber++;
					if (carLocation === 15) {
                        runButton.disabled = true;
                        runButton.innerText = "????Congrats, you did it!????";
                        alert("????????????Hooorray!????????????");						
                    }
                    if (inputNumber === 8 && carLocation !== 15) {
                        alert("Ooooopps, you ran out of lines, give it another try ;)");
                        location.reload();
                    }
                    inputsArray[inputNumber].removeAttribute("disabled");

                } else {
                    inputsArray[inputNumber].classList.remove("wrong-command");
                    alert("Error, car can not take that step! Try another direction.");
                }
            }
        }
    } else if (command !== "") {
        inputsArray[inputNumber].classList.add("wrong-command");
        alert("Input error!");
        console.log("Input error!");
    }
}

runButton.addEventListener('click', readCommand);