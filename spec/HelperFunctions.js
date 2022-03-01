
function compareGrids(grid0, grid1)
{
    if(grid0.length != grid1.length)
        return false;
    
    if(grid0[0] && grid1[0])
    {
        if(grid0[0].length != grid1[0].length)
            return false;
    }
    else
        return false;

    for(let y = 0; y < grid0.length; y++)
    {
        for(let x = 0; x < grid0[0].length; x++)
        {
            if(grid0[y][x] != grid1[y][x])
                return false;
        }
    }

    return true;
}

function generateGrid(width, height)
{
    let grid = [];

    for(let y = 0; y < height; y++)
    {
        grid[y] = [];
        for(let x = 0; x < width; x++)
        {
            grid[y][x] = false;
        }
    }

    return grid;
}
