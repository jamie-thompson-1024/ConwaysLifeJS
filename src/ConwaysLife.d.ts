declare type EdgeMode = /*'wrap' |*/ 'empty' | 'filled';
declare type OptionKey = 'width' | 'height' | 'tickDelay' | 'edgeMode';
interface Options {
    width?: number;
    height?: number;
    tickDelay?: number;
    edgeMode?: EdgeMode;
}
declare class ConwaysLife {
    private _grid;
    private _width;
    private _height;
    private _tickDelay;
    private _edgeMode;
    private _initialGrid;
    private _age;
    private _loopInterval?;
    private _lastTickTime;
    private _lastTickDuration;
    private _doLoop;
    onTick: () => void;
    constructor(options: Options);
    get grid(): boolean[][];
    get width(): number;
    get height(): number;
    get tickDelay(): number;
    get edgeMode(): EdgeMode;
    get initialGrid(): boolean[][];
    get age(): number;
    get lastTickDuration(): number;
    run(): void;
    pause(): void;
    reset(): void;
    step(): void;
    place(structure: boolean[][], col: number, row: number): void;
    setInitial(): void;
    resetInitial(): void;
    setOptions(options: Options): void;
    setOption(option: OptionKey, value: any): void;
    private _resetInitialGrid;
    private _resetGrid;
    private _resizeGrids;
    private _tick;
}
export default ConwaysLife;
export type { Options, EdgeMode, OptionKey };
