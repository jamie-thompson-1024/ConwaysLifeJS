# ConwaysLifeJS

JavaScript / Typescript module implimenting Conways game of life.

## Contents:

- [Usage](#Usage)
- [Methods](#Methods)
- [Properties](#Properties)
- [Options](#Options)

## Usage:

This module provides a way of simulating the game of life at a specified
tick rate or step by step manually. It also provides some options that change how certain aspects of
the simulation behave.

**Basic usage goes as follows:**

```javascript
let life = new ConwaysLife();

life.onTick = () => {
    // put code here that will run after every simulation tick i.e. a draw call if the results are being rendered to screen
};

// begin simulation
life.run();
```

**Options can be changed during initialisation
like so:**

```javascript
let life = new ConwaysLife({
    width: 100,         // width of game grid
    height: 100,        // height of game grid
    tickDelay: 500      // time delay between ticks in milliseconds
});

life.onTick = () => {
    // put code here that will run after every simulation tick i.e. a draw call if the results are being rendered to screen
};

// begin simulation
life.run();
```

**The simulation can be stepped through 
manually like this:**

```javascript
let life = new ConwaysLife();

life.onTick = () => {
    // put code here that will run after every simulation tick i.e. a draw call if the results are being rendered to screen
};

// set interval to run every 500ms
setInverval(() => {
    // step through simulation
    life.step();
}, 500);
```

## Methods

In the usage section above some methods were demonstraited 
for running the simulation, but there are more available that are listed here:

- `.run()`: begins simulation
- `.pause()`: halts simulation
- `.reset()`: resets simulation grid
- `.step()`: runs single simulation step
- `.place(structure: boolean[][], col: number, row: number)`: places a structure onto the simulation grid
- `.setInitial()`: sets starting grid state to current grid state
- `.resetInitial()`: resets the starting grid state to blank
- `.setOptions(options: Options)`: modifies options based on given object
- `.setOption(option: OptionKey, value: any)`: sets an option to given value

## Properties

Game state and options can be read via these properties:

- `.grid`: type `boolean[][]` readonly. grid state
- `.width`: type `number` readonly. grid width
- `.height`: type `number` readonly. grid height
- `.tickDelay`: type `number` readonly. tick delay
- `.edgeMode`: type `EdgeMode` | `'empty' | 'filled'` readonly. edge behaviour
- `.initialGrid`: type `boolean[][]` readonly. starting grid state
- `.age`: type `number` readonly. ticks made since last reset
- `.onTick`: type `() => void`. function called after game tick
- `.lastTickDuration`: type `number`. time taken to complete last in ms. 

## Options

These are the options available that change how the simulation behaves:

- `width`: type `number`. width of simulation grid. must be larger than 0, non-int values will be floored. **default: `100`**
- `height`: type `number`. height of simulation grid. must be larger than 0, non-int values will be floored. **default: `100`**
- `tickDelay`: type `number`. set time delay between ticks when running simulation. must be larger than 0. **default: `500`**
- `edgeMode`: type `EdgeMode` | `'empty' | 'filled'`. set how the edge of the simulation behaves. **default: `'empty'`**

Incase required there are imports for 
arrays of valid keys, and union types, as well as 
validator function for them.

- `OptionKeyValues`: type `OptionKey[]`. Array of possible option keys.
- `IsValidOptionKey`: type `(optionKey?: OptionKey) => boolean`. Function to check validity of option key value.

- `EdgeModeValues`: type `EdgeMode[]`. Array of possible edge modes.
- `IsValidEdgeMode`: type `(optionKey?: EdgeMode) => boolean`. Function to check validity of edge mode.
