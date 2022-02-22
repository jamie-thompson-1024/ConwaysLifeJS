
type EdgeMode = /*'wrap' |*/ 'empty' | 'filled';

type OptionKey = 'width' | 'height' | 'tickDelay' | 'edgeMode';

interface Options
{
    width?: number;
    height?: number;
    tickDelay?: number;
    edgeMode?: EdgeMode;
};

export type { 
    Options, OptionKey, EdgeMode 
};
