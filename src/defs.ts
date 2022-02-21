
type EdgeMode = 'wrap' | 'empty' | 'filled';

interface Options
{
    width?: number;
    height?: number;
    tickDelay?: number;
    edgeMode?: EdgeMode;
};

export type { 
    Options, EdgeMode 
};
