
import { Options, EdgeMode } from './defs';

class ConwayLife
{

    private _grid: boolean[][] = [];
    private _width: number = 100;
    private _height: number = 100;
    private _tickDelay: number = 500;
    private _edgeMode: EdgeMode = 'empty';
    private _initialGrid: boolean[][] = [];
    private _age: number = 0;
    onTick: () => void = () => {};

    constructor(options: Options)
    {
        if(options.width && options.width > 0)
            this._width = Math.floor(options.width);
        if(options.height && options.height > 0)
            this._height = Math.floor(options.height);
        if(options.tickDelay && options.tickDelay > 0)
            this._tickDelay = Math.floor(options.tickDelay);
        this._edgeMode = options.edgeMode ?? this._edgeMode;

        this._resetInitialGrid();
        this._resetGrid();
    }

    // getter for readonly properties
    get grid() { return this._grid; }
    get width() { return this._width; }
    get height() { return this._height; }
    get tickDelay() { return this._tickDelay; }
    get edgeMode() { return this._edgeMode; }
    get initialGrid() { return this._initialGrid; }
    get age() { return this._age; }

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

    private _resizeInitialGrid()
    {

    }

    private _resizeGrid()
    {

    }

    private _tick()
    {

    }
}

export default ConwayLife;
export type {
    Options, EdgeMode
};
