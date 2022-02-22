
const life = new ConwaysLife({
    edgeMode: 'filled',
    height: 250,
    width: 250,
    tickDelay: 100,
});
console.log(life);

let container = document.getElementById('canvasContainer');
let canvas = document.getElementById('canvas');
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
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

addEventListener('resize', () => { resize() });

life.onTick = () => { draw() };

life.run();
