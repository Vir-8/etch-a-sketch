const bigC = document.querySelector(".bigContainer");

let isMouseDown = false;
let eraserMode = false;
let rainbowMode = false;
let gridMode = false;

let newColour = "red";
let isGridOn;
let dimensionSize = 16;
let dimensionInfo = document.querySelector("#dimensionInfo")

document.documentElement.style.setProperty('--hover-colour', newColour);  

const dimensionSlider = document.querySelector(".dimensions");
const colourButton = document.querySelector("#colourPicker");
const gridButton = document.querySelector(".gridLines");
const clearButton = document.querySelector(".clear");
const eraserButton = document.querySelector(".eraser");
const rainbowButton = document.querySelector(".rainbow");

dimensionSlider.addEventListener('input', getNewDimensions);
colourButton.addEventListener('change', changeColour);
gridButton.addEventListener('click', toggleGrid);
clearButton.addEventListener('click', clearDivs);
eraserButton.addEventListener('click', toggleErase);
rainbowButton.addEventListener('click', toggleRainbow);

setDimensions(); //generate initial 16x16 grid

//change grid dimensions
function getNewDimensions()
{
    dimensionSize = dimensionSlider.value;
    console.log(dimensionSize)
    dimensionInfo.textContent = dimensionSize + "x" + dimensionSize;
    setDimensions();
}

function setDimensions()
{
    deleteDivs(); //delete old grid
    let height = 600/dimensionSize; //determine new box size

    //generate new grid
    for (let i = 0; i < (dimensionSize*dimensionSize); i++)
    {
        smallC = document.createElement('div');
        smallC.setAttribute('class', 'grid');
        smallC.style.height = height + "px";
        bigC.append(smallC);
    }
    boxes = document.querySelectorAll('.grid');

    if (isGridOn === true)
    {
        boxes.forEach(box => {
            box.style.border = "1px solid black";
        });
    }
    console.log("changing 2");
}

function deleteDivs()
{
    while ( bigC.firstChild ) bigC.removeChild( bigC.firstChild );
}

//clear divs
function clearDivs()
{
    boxes = document.querySelectorAll('.grid')
    boxes.forEach(box => {
        box.style.backgroundColor = "";
    });
}

//change colour button
function changeColour()
{
    newColour = colourButton.value;
    document.documentElement.style.setProperty('--hover-colour', newColour);  
}

//grid on/off button
function toggleGrid()
{
    boxes = document.querySelectorAll('.grid');
    boxes.forEach(box => {

        if (box.style.border === "none" || box.style.border === "")
        {
            box.style.border = "1px solid black";
            isGridOn = true;
            console.log("NONE");
            gridButton.style.opacity = 0.5;
            gridButton.textContent = "Grid: Enabled";
        }
        else
        {
            box.style.border = "none";
            isGridOn = false;
            gridButton.style.opacity = 1;
            gridButton.textContent = "Grid: Disabled";
        }
    });
    console.log("border");
}

//erase stuff
function toggleErase()
{
    if (eraserMode === false) 
    {
        oldColour = newColour;
        newColour = "";
        eraserMode = true;
        eraserButton.style.opacity = 0.5;
        eraserButton.textContent = "Eraser: Enabled"
        colourButton.setAttribute("disabled", "disabled");
        colourButton.style.opacity = 0.5;
    }
    else 
    {
        newColour = oldColour;
        eraserMode = false;
        eraserButton.style.opacity = 1;
        eraserButton.textContent = "Eraser: Disabled";
        colourButton.removeAttribute("disabled");
        colourButton.style.opacity = 1;
    }    
}

//rainbow mode
function toggleRainbow()
{
    if (rainbowMode === false)
    {
        rainbowMode = true;
        rainbowButton.style.opacity = 0.5;
        rainbowButton.textContent = "Rainbow: Enabled";
    }
    else
    {
        rainbowMode = false;
        rainbowButton.style.opacity = 1;
        rainbowButton.textContent = "Rainbow: Disabled";
        document.documentElement.style.setProperty('--hover-colour', newColour);
    }
}

function getRandomColour() 
{
    var letters = '0123456789ABCDEF';
    var colour = '#';
    for (var i = 0; i < 6; i++) 
    {
      colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
}

//paint stuff
bigC.addEventListener('mouseup', function() {
    isMouseDown = false;
});

bigC.addEventListener('mouseleave', function() {
    isMouseDown = false;
});

bigC.addEventListener('mousedown', function(event) {
    event.preventDefault(); // Disable default drag behavior
    isMouseDown = true;
    let target = event.target;
  
    if ((target.classList.contains('grid') && rainbowMode === false) || eraserMode === true) 
    {
        target.style.backgroundColor = newColour;
        console.log('mouse down box');
    }
    else if (target.classList.contains('grid') && rainbowMode === true && eraserMode === false)  
    {
        rainbowColour = getRandomColour();
        target.style.backgroundColor = rainbowColour;
        document.documentElement.style.setProperty('--hover-colour', rainbowColour);
        console.log('mouse down box');
    }
});

bigC.addEventListener('mouseover', function(event) {

    if (isMouseDown && ((event.target.classList.contains("grid") && rainbowMode === false) || eraserMode === true)) 
    {
        event.target.style.backgroundColor = newColour;
    }
    else if (isMouseDown && event.target.classList.contains("grid") && rainbowMode === true && eraserMode === false) 
    {
        rainbowColour = getRandomColour();
        event.target.style.backgroundColor = rainbowColour;
        document.documentElement.style.setProperty('--hover-colour', rainbowColour);
    }
});
