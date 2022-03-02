
const patterns = {
    "Square 5x5": [
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true, true]],
    "Glider SE": [
        [false,true,false],
        [false,false,true],
        [true,true,true]],
    "Glider NE": [
        [true,true,true],
        [false,false,true],
        [false,true,false]],
    "Glider SW": [
        [false,true,false],
        [true,false,false],
        [true,true,true]],
    "Glider NW": [
        [true,true,true],
        [true,false,false],
        [false,true,false]],
};

const life = new ConwaysLife({
    edgeMode: 'empty',
    height: 100,
    width: 100,
    tickDelay: 100,
});
console.log(life);

let controlForm = document.querySelector('#OptionsForm');
let controlEls = controlForm.elements;

controlForm.addEventListener('submit', () => {
    life.setOptions({
        width: controlEls['width'].value,
        height: controlEls['height'].value,
        tickDelay: controlEls['tickDelay'].value,
        edgeMode: controlEls['edgeMode'].value
    });
});

controlEls['width'].value = life.width;
controlEls['height'].value = life.height;
controlEls['tickDelay'].value = life.tickDelay;
controlEls['edgeMode'].value = life.edgeMode;

let manipulationForm = document.querySelector('#cellManipulationForm');
let manipulationEls = manipulationForm.elements;

let playButton = document.querySelector('#playButton');
playButton.addEventListener('click', () => {
    life.run();
});
let pauseButton = document.querySelector('#pauseButton');
pauseButton.addEventListener('click', () => {
    life.pause();
});
let stepButton = document.querySelector('#stepButton');
stepButton.addEventListener('click', () => {
    console.log('step');
    life.step();
});
let resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', () => {
    life.reset();
    draw();
});

let ageDisplay = document.querySelector('#gameAge');
let tickTimeDisplay = document.querySelector('#tickTime');

let container = document.querySelector('#canvasContainer');
let canvas = document.querySelector('#canvasContainer > canvas');
let ctx = canvas.getContext('2d');

canvas.addEventListener('click', (ev) => {
    let squareWidth = canvas.width / life.width;
    let squareHeight = canvas.height / life.height;

    let x = Math.floor(ev.offsetX / squareWidth);
    let y = Math.floor(ev.offsetY / squareHeight);

    onClick(x, y);
})

resize();

function draw()
{
    ageDisplay.innerText = life.age;
    tickTimeDisplay.innerText = Math.floor(life.lastTickDuration);

    let squareWidth = canvas.width / life.width;
    let squareHeight = canvas.height / life.height;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FEFEFE';
    life.grid.forEach((row, y) => {
        row.forEach((pixel, x) => {
            if(pixel)
                ctx.fillRect(
                    x * squareWidth,
                    y * squareHeight,
                    squareWidth,
                    squareHeight);
        });
    });
}

function onClick(x, y)
{
    switch(manipulationEls['mode'].value)
    {
        case 'toggle':
            life.setCell(x,y,!life.grid[y][x]);
            break;
        case 'place':
            if(manipulationEls['pattern'].value != 'none')
                life.place(
                    patterns[
                        manipulationEls['pattern'].value
                    ],
                    x, y);
            break;
        default:
            break;
    }

    draw();
}

function resize()
{
    if(container.clientWidth < container.clientHeight)
    {
        canvas.width = container.clientWidth;
        canvas.height = container.clientWidth;
    }
    else
    {
        canvas.width = container.clientHeight;
        canvas.height = container.clientHeight;
    }
    
    draw();
}

addEventListener('resize', () => { resize() });

life.onTick = () => { draw() };
