

type EdgeMode = /*'wrap' |*/ 'empty' | 'filled';
const EdgeModeValues: EdgeMode[] = [
    'empty','filled'
];
function IsValidEdgeMode(edgeMode?: EdgeMode)
{
    return (EdgeModeValues as (EdgeMode | undefined)[]).includes(edgeMode);
}

type OptionKey = 'width' | 'height' | 'tickDelay' | 'edgeMode';
const OptionKeyValues: OptionKey[] = [
    'edgeMode','height','tickDelay','width'
];
function IsValidOptionKey(optionKey?: OptionKey)
{
    return (OptionKeyValues as (OptionKey | undefined)[]).includes(optionKey);
}

interface Options
{
    width?: number;
    height?: number;
    tickDelay?: number;
    edgeMode?: EdgeMode;
}

class ConwaysLife
{
    private _grid: boolean[][] = [];
    private _width: number = 100;
    private _height: number = 100;
    private _tickDelay: number = 500;
    private _edgeMode: EdgeMode = 'empty';
    private _initialGrid: boolean[][] = [];
    private _age: number = 0;
    private _loopInterval?: number | NodeJS.Timer;
    private _lastTickTime: number = performance.now();
    private _lastTickDuration: number = 0;
    private _doLoop: boolean = false;
    onTick: () => void = () => {};

    constructor(options: Options = {})
    {
        if(options.width && options.width > 0)
            this._width = Math.floor(options.width);

        if(options.height && options.height > 0)
            this._height = Math.floor(options.height);

        if(options.tickDelay && options.tickDelay > 0)
            this._tickDelay = options.tickDelay;

        if(IsValidEdgeMode(options.edgeMode))
            this._edgeMode = options.edgeMode as EdgeMode;

        this._resetInitialGrid();
        this._resetGrid();
    }

    // getters for readonly properties
    get grid() { return this._grid; }
    get width() { return this._width; }
    get height() { return this._height; }
    get tickDelay() { return this._tickDelay; }
    get edgeMode() { return this._edgeMode; }
    get initialGrid() { return this._initialGrid; }
    get age() { return this._age; }
    get lastTickDuration() { return this._lastTickDuration; }

    run()
    {
        this._doLoop = true;

        // @ts-ignore
        this._loopInterval = setInterval(() => {
            this._tick();
        }, this._tickDelay);
    }

    pause()
    {
        this._doLoop = false;
        
        // @ts-ignore
        clearInterval(this._loopInterval);
    }

    reset()
    {
        this._resetGrid();
        this._age = 0;
    }

    step()
    {
        this._tick(true);
    }

    place(structure: boolean[][], col: number, row: number)
    {
        let structureWidth = structure[0].length;
        let structureHeight = structure.length;

        let x1 = col < 0 ? 0 : col;
        let y1 = row < 0 ? 0 : row;

        let x2 = 
            col + structureWidth > this._width ?
                this._width : col + structureWidth;
        let y2 = 
            row + structureHeight > this._height ?
                this._height : row + structureHeight;

        for(let y = y1; y < y2; y++)
        {
            for(let x = x1; x < x2; x++)
            {
                this._grid[y][x] = structure[y - row][x - col];
            }
        }
    }

    setCell(col: number, row: number, state: boolean)
    {
        if(col >= this._width || col < 0)
            return;
        if(row >= this._height || row < 0)
            return;
        
        this._grid[row][col] = !!state;
    }

    setInitial()
    {
        for(let y = 0; y < this._height; y++)
        {
            for(let x = 0; x < this._width; x++)
            {
                this._initialGrid[y][x] = this._grid[y][x];
            }
        }
    }

    resetInitial()
    {
        this._resetInitialGrid();
    }

    setOptions(options: Options)
    {
        let doResize = false;

        if(options.width && options.width > 0) 
        {
            this._width = Math.floor(options.width);
            doResize = true;
        }

        if(options.height && options.height > 0) 
        {
            this._height = Math.floor(options.height);
            doResize = true;
        }

        if(options.tickDelay && options.tickDelay > 0)
        {
            this._tickDelay = options.tickDelay;

            if(this._doLoop)
            {
                // reset interval
                // @ts-ignore
                clearInterval(this._loopInterval);
                // @ts-ignore
                this._loopInterval = setInterval(() => {
                    this._tick();
                }, this._tickDelay);
            }
        }

        if(IsValidEdgeMode(options.edgeMode))
            this._edgeMode = options.edgeMode as EdgeMode;

        if(doResize)
        {
            this._resizeGrids();
        }
    }

    setOption(option: OptionKey, value: any)
    {
        switch(option)
        {
            case 'width':
                if(value && value > 0) 
                {
                    this._width = Math.floor(value);
                    this._resizeGrids();
                }
                break;
            case 'height':
                if(value && value > 0) 
                {
                    this._height = Math.floor(value);
                    this._resizeGrids();
                }
                break;
            case 'edgeMode':
                if(IsValidEdgeMode(value))
                    this._edgeMode = value as EdgeMode;
                break;
            case 'tickDelay':
                if(value && value > 0)
                {
                    this._tickDelay = value;

                    if(this._doLoop)
                    {
                        // reset interval
                        // @ts-ignore
                        clearInterval(this._loopInterval);
                        // @ts-ignore
                        this._loopInterval = setInterval(() => {
                            this._tick();
                        }, this._tickDelay);
                    }
                }
                break;
        }
    }

    private _resetInitialGrid()
    {
        this._initialGrid = [];
        for(let y = 0; y < this._height; y++)
        {
            this._initialGrid[y] = [];
            for(let x = 0; x < this._width; x++)
            {
                this._initialGrid[y][x] = false;
            }
        }
    }

    private _resetGrid()
    {
        this._grid = [];
        for(let y = 0; y < this._height; y++)
        {
            this._grid[y] = [];
            for(let x = 0; x < this._width; x++)
            {
                this._grid[y][x] = this._initialGrid[y][x] ?? false;
            }
        }
    }

    private _resizeGrids()
    {
        let oldInitialGrid = this._initialGrid;
        let oldGrid = this._grid;

        this._initialGrid = [];
        this._grid = [];

        let copyWidth = oldGrid[0].length < this._width ? oldGrid[0].length : this._width;
        let copyHeight = oldGrid.length < this._height ? oldGrid.length : this._height;

        for(let y = 0; y < this._height; y++)
        {
            this._initialGrid[y] = [];
            this._grid[y] = [];
            for(let x = 0; x < this._width; x++)
            {
                if(y < copyHeight && x < copyWidth)
                {
                    this._initialGrid[y][x] = oldInitialGrid[y][x];
                    this._grid[y][x] = oldGrid[y][x];
                }else{
                    this._initialGrid[y][x] = false;
                    this._grid[y][x] = false;
                }
            }
        }
    }

    private _tick(step: boolean = false)
    {
        if(!this._doLoop && !step)
        {
            // @ts-ignore
            clearInterval(this._loopInterval);
            return;
        }

        this._lastTickTime = performance.now();

        this._age++;

        let newGrid: boolean[][] = [];

        let neighbors = 0;
        let edge;
        switch(this._edgeMode)
        {
            case 'empty':
                edge = false;
                break;
            case 'filled':
                edge = true;
                break;
        }

        for(let y = 0; y < this._height; y++)
        {
            newGrid[y] = [];
            for(let x = 0; x < this._width; x++)
            {
                // console.log(`${x},${y}: 1`);
                neighbors = 0;
                
                /*
                switch(this._edgeMode)
                {
                    case 'wrap':
                        
                        break;
                }
                */

                // to avoid indexed access when grid[y] is undefined
                if(y != 0)
                {
                    // console.log(`${x},${y}: 2a`);
                    if(this._grid[y - 1][x - 1] ?? edge)    // top left
                        neighbors++;
                    if(this._grid[y - 1][x] ?? edge)        // top mid
                        neighbors++;
                    if(this._grid[y - 1][x + 1] ?? edge)    // top right
                        neighbors++;
                } else {
                    // console.log(`${x},${y}: 2b`);
                    if(edge)
                        neighbors += 3;
                }

                // console.log(`${x},${y}: 3`);
                if(this._grid[y][x - 1] ?? edge)            // left
                    neighbors++;
                if(this._grid[y][x + 1] ?? edge)            // right
                    neighbors++;

                // to avoid indexed access when grid[y] is undefined
                if(y != this._height - 1)
                {
                    // console.log(`${x},${y}: 4a`);
                    if(this._grid[y + 1][x - 1] ?? edge)    // bottom left
                        neighbors++;
                    if(this._grid[y + 1][x] ?? edge)        // bottom mid
                        neighbors++;
                    if(this._grid[y + 1][x + 1] ?? edge)    // bottom right
                        neighbors++;
                } else {
                    // console.log(`${x},${y}: 4b`);
                    if(edge)
                        neighbors += 3;
                }

                // console.log(`${x},${y}: 5`);
                newGrid[y][x] = 
                    (neighbors === 2 && this._grid[y][x]) || 
                    (neighbors === 3);
            }
        }

        this._grid = newGrid;

        this._lastTickDuration = performance.now() - this._lastTickTime;
        
        this.onTick();
    }
}

export default ConwaysLife;
export {
    ConwaysLife,
    OptionKeyValues, EdgeModeValues,
    IsValidEdgeMode, IsValidOptionKey
}
export type {
    Options, EdgeMode, OptionKey
};
