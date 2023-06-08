const bigC = document.querySelector(".bigContainer");
let smallC;

let isMouseDown = false;
let dimensionSize;

const dimensions = document.querySelector(".dimensions")




for (let i = 0; i < 256; i++)
{
    smallC = document.createElement('div');
    smallC.setAttribute('class', 'grid');
    bigC.append(smallC);
}



dimensions.addEventListener('click', getNewDimensions)

function getNewDimensions()
{
    dimensionSize = prompt("YO!");
    changeDimensions();
}


function changeDimensions()
{
    deleteDivs();

    setTimeout(function() 
    {
        console.log("changing 1");
        let height = 600/dimensionSize;



        for (let i = 0; i < (dimensionSize*dimensionSize); i++)
        {
            const smallC = document.createElement('div');
            smallC.setAttribute('class', 'grid');
            smallC.style.height = height + "px";
            bigC.append(smallC);
        }


        
        console.log("changing 2");

    }, 10);
}

function deleteDivs()
{
    while ( bigC.firstChild ) bigC.removeChild( bigC.firstChild );
}


const boxes = document.querySelectorAll('.grid');

bigC.addEventListener('mousedown', function() {
    isMouseDown = true;
});
  
bigC.addEventListener('mouseup', function() {
    isMouseDown = false;
});

bigC.addEventListener("mousedown", function(event) {
    event.preventDefault(); // Disable default drag behavior
    isMouseDown = true;
});

boxes.forEach(function(smallC) {

    smallC.addEventListener("mouseenter", function() {
        if (isMouseDown) {
            smallC.style.backgroundColor = "red";
        }
    });

    smallC.addEventListener("mousedown", function() {
        smallC.style.backgroundColor = "red";
    });
});



