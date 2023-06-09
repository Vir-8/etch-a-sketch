const bigC = document.querySelector(".bigContainer");

let isMouseDown = false;
let dimensionSize;
let boxes;
let newColour = "red";

const dimensionsButton = document.querySelector(".dimensions");
const colourButton = document.querySelector(".colour");
const gridButton = document.querySelector(".gridLines");


for (let i = 0; i < 256; i++)
{
    box = document.createElement('div');
    box.setAttribute('class', 'grid');
    bigC.append(box);
}



dimensionsButton.addEventListener('click', getNewDimensions);
colourButton.addEventListener('click', changeColour);
gridButton.addEventListener('click', gridDisplay);

function getNewDimensions()
{
    dimensionSize = prompt("YO!");
    changeDimensions();
}


function changeDimensions()
{
    deleteDivs();

    
    console.log("changing 1");
    let height = 600/dimensionSize;



    for (let i = 0; i < (dimensionSize*dimensionSize); i++)
    {
        smallC = document.createElement('div');
        smallC.setAttribute('class', 'grid');
        smallC.style.height = height + "px";
        bigC.append(smallC);
    }


    boxes = document.querySelectorAll('.grid');
    console.log("changing 2");

    
}

function deleteDivs()
{
    while ( bigC.firstChild ) bigC.removeChild( bigC.firstChild );
}




function changeColour()
{
    newColour = color
}


function gridDisplay()
{
    boxes = document.querySelectorAll('.grid');


    boxes.forEach(box => {

        if (box.style.border === "none")
        {
            box.style.border = "1px solid black";
            console.log("NONE");
        }
        else
        {
            box.style.border = "none";
        }
    });

    console.log("border");
    
}


boxes = document.querySelectorAll('.grid');
 
bigC.addEventListener('mouseup', function() {
    isMouseDown = false;
});

bigC.addEventListener("mousedown", function(event) {
    event.preventDefault(); // Disable default drag behavior
    isMouseDown = true;

    let target = event.target;
  
    if (target.classList.contains('grid')) 
    {
        target.style.backgroundColor = newColour;
        console.log('mouse down box');
    }
});


  
  bigC.addEventListener("mouseover", function(event) {
    if (isMouseDown && event.target.classList.contains("grid")) {
      event.target.style.backgroundColor = newColour;
    }
  });