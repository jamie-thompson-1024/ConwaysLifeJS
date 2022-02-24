
const life = new ConwaysLife({
    edgeMode: 'filled',
    height: 250,
    width: 250,
    tickDelay: 100,
});
console.log(life);


let controlForm = document.querySelector('#controls > form');
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

let playButton = document.querySelector('#playButton');
let pauseButton = document.querySelector('#pauseButton');
let stepButton = document.querySelector('#stepButton');
let resetButton = document.querySelector('#resetButton');

let container = document.querySelector('#canvasContainer');
let canvas = document.querySelector('#canvasContainer > canvas');
let ctx = canvas.getContext('2d');

resize();

function draw()
{
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
}

addEventListener('resize', () => { resize() });

life.onTick = () => { draw() };

life.run();
