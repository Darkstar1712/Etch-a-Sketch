createGrid();

let mousedown = false;

function createGrid() {
    const container = document.querySelector(".container");

    for(let i = 0; i < 16 * 16; i++) {    
        const div = document.createElement("div");
        div.style.height = 600/16;
        div.style.width = 600/16;
        div.classList.add("square");
        div.addEventListener("mousedown", drawWhenClicked);
        div.addEventListener("mouseenter", drawWhenHovering);
        container.appendChild(div);
    }
}

function drawWhenClicked(e) {
    e.target.style.backgroundColor = "black";
}

function drawWhenHovering(e) {
    if(e.buttons > 0) {
        e.target.style.backgroundColor = "black";
    }
}

