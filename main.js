const gridContainer = document.querySelector(".grid-container");
const gridsizeSlider = document.querySelector("#gridsize-slider");
const gridsize = document.querySelector(".gridsize");
const randomColorButton = document.querySelector("#random-color-button");
const shadingModeButton  = document.querySelector("#shading-mode-button");
const colorPickerWrapper = document.querySelector(".color-picker-wrapper");
const colorPicker = document.querySelector(".color-picker");
let randomColorMode = false;
let shadingMode = false;

setup();

function setup() {
    createGrid(16);

    gridsizeSlider.addEventListener("input", resizeGrid);

    colorPicker.addEventListener("input", function() {
        colorPickerWrapper.style.backgroundColor = this.value;
    });

    colorPickerWrapper.style.backgroundColor = colorPicker.value;

    randomColorButton.addEventListener("click", () => {
        if(randomColorMode == false) {
            if (shadingMode == true) {
                shadingMode = false;
                shadingModeButton.style.backgroundColor = "#F5A442";
                shadingModeButton.style.border = "1px solid black";
            }

            randomColorMode = true;
            randomColorButton.style.backgroundColor = "#E59432";
            randomColorButton.style.border = "3px solid black";
        } else {
            randomColorMode = false;
            randomColorButton.style.backgroundColor = "#F5A442";
            randomColorButton.style.border = "1px solid black";
        }
    });

    shadingModeButton.addEventListener("click", () => {
        if(shadingMode == false) {
            if (randomColorMode == true) {
                randomColorMode = false;
                randomColorButton.style.backgroundColor = "#F5A442";
                randomColorButton.style.border = "1px solid black";
            }

            shadingMode = true;
            shadingModeButton.style.backgroundColor = "#E59432";
            shadingModeButton.style.border = "3px solid black";
        } else {
            shadingMode = false;
            shadingModeButton.style.backgroundColor = "#F5A442";
            shadingModeButton.style.border = "1px solid black";
        }
    });    
}

//Creates the grid
function createGrid(gridsize) {
    const gridContainer = document.querySelector(".grid-container");
    const grid = document.createElement("div");
    grid.classList.add("grid")

    for(let i = 0; i < gridsize * gridsize; i++) {    
        const div = document.createElement("div");
        div.classList.add("grid-square");
        div.style.height = 600/gridsize;
        div.style.width = 600/gridsize;
        div.addEventListener("mousedown", drawWhenClicked);
        div.addEventListener("mouseenter", drawWhenHovering);
        grid.appendChild(div);
    }

    gridContainer.appendChild(grid);
}

//Removes the current grid and creates a new one with the value selected on the range slider
function resizeGrid() {
    gridsize.textContent = this.value + "x" + this.value;
    gridContainer.removeChild(gridContainer.firstElementChild);
    createGrid(this.value);        
}

//Draws when a square is clicked
function drawWhenClicked(e) {
    if (randomColorMode == true) {
        e.target.style.backgroundColor = selectRandomColor();
    } else if (shadingMode == true) {
        if (e.target.style.backgroundColor == "") {
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1";
        } else {
            let target = e.target.style.backgroundColor.charAt(16);
            let newTarget = parseInt(target) + 1;

            if (target == 9) {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 1";
            } else {
                e.target.style.backgroundColor = e.target.style.backgroundColor.replace(target, newTarget);
            }
        }
    } else {
        e.target.style.backgroundColor = colorPicker.value;
    }
}

//Draws when the mousebutton is held down and the mouse is moved over a square
function drawWhenHovering(e) {
    if(e.buttons > 0) {
        if(randomColorMode === true) {
            e.target.style.backgroundColor = selectRandomColor();
        } else if (shadingMode == true) {
            if (e.target.style.backgroundColor == "") {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1";
            } else {
                let target = e.target.style.backgroundColor.charAt(16);
                let newTarget = parseInt(target) + 1;
    
                if (target == 9) {
                    e.target.style.backgroundColor = "rgba(0, 0, 0, 1";
                } else {
                    e.target.style.backgroundColor = e.target.style.backgroundColor.replace(target, newTarget);
                }
            }
        } else {
            e.target.style.backgroundColor = colorPicker.value;
        }
    }
}

function selectRandomColor() {
    const rgb = "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
    return rgb;
}