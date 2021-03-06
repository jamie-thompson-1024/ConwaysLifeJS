/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ConwaysLife.ts":
/*!****************************!*\
  !*** ./src/ConwaysLife.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"ConwaysLife\": () => (/* binding */ ConwaysLife),\n/* harmony export */   \"OptionKeyValues\": () => (/* binding */ OptionKeyValues),\n/* harmony export */   \"EdgeModeValues\": () => (/* binding */ EdgeModeValues),\n/* harmony export */   \"IsValidEdgeMode\": () => (/* binding */ IsValidEdgeMode),\n/* harmony export */   \"IsValidOptionKey\": () => (/* binding */ IsValidOptionKey)\n/* harmony export */ });\nconst EdgeModeValues = [\r\n    'empty', 'filled'\r\n];\r\nfunction IsValidEdgeMode(edgeMode) {\r\n    return EdgeModeValues.includes(edgeMode);\r\n}\r\nconst OptionKeyValues = [\r\n    'edgeMode', 'height', 'tickDelay', 'width'\r\n];\r\nfunction IsValidOptionKey(optionKey) {\r\n    return OptionKeyValues.includes(optionKey);\r\n}\r\nclass ConwaysLife {\r\n    constructor(options = {}) {\r\n        this._grid = [];\r\n        this._width = 100;\r\n        this._height = 100;\r\n        this._tickDelay = 500;\r\n        this._edgeMode = 'empty';\r\n        this._initialGrid = [];\r\n        this._age = 0;\r\n        this._lastTickTime = performance.now();\r\n        this._lastTickDuration = 0;\r\n        this._doLoop = false;\r\n        this.onTick = () => { };\r\n        if (options.width && options.width > 0)\r\n            this._width = Math.floor(options.width);\r\n        if (options.height && options.height > 0)\r\n            this._height = Math.floor(options.height);\r\n        if (options.tickDelay && options.tickDelay > 0)\r\n            this._tickDelay = options.tickDelay;\r\n        if (IsValidEdgeMode(options.edgeMode))\r\n            this._edgeMode = options.edgeMode;\r\n        this._resetInitialGrid();\r\n        this._resetGrid();\r\n    }\r\n    // getters for readonly properties\r\n    get grid() { return this._grid; }\r\n    get width() { return this._width; }\r\n    get height() { return this._height; }\r\n    get tickDelay() { return this._tickDelay; }\r\n    get edgeMode() { return this._edgeMode; }\r\n    get initialGrid() { return this._initialGrid; }\r\n    get age() { return this._age; }\r\n    get lastTickDuration() { return this._lastTickDuration; }\r\n    run() {\r\n        this._doLoop = true;\r\n        // @ts-ignore\r\n        this._loopInterval = setInterval(() => {\r\n            this._tick();\r\n        }, this._tickDelay);\r\n    }\r\n    pause() {\r\n        this._doLoop = false;\r\n        // @ts-ignore\r\n        clearInterval(this._loopInterval);\r\n    }\r\n    reset() {\r\n        this._resetGrid();\r\n        this._age = 0;\r\n    }\r\n    step() {\r\n        this._tick(true);\r\n    }\r\n    place(structure, col, row) {\r\n        let structureWidth = structure[0].length;\r\n        let structureHeight = structure.length;\r\n        let x1 = col < 0 ? 0 : col;\r\n        let y1 = row < 0 ? 0 : row;\r\n        let x2 = col + structureWidth > this._width ?\r\n            this._width : col + structureWidth;\r\n        let y2 = row + structureHeight > this._height ?\r\n            this._height : row + structureHeight;\r\n        for (let y = y1; y < y2; y++) {\r\n            for (let x = x1; x < x2; x++) {\r\n                this._grid[y][x] = structure[y - row][x - col];\r\n            }\r\n        }\r\n    }\r\n    setCell(col, row, state) {\r\n        if (col >= this._width || col < 0)\r\n            return;\r\n        if (row >= this._height || row < 0)\r\n            return;\r\n        this._grid[row][col] = !!state;\r\n    }\r\n    setInitial() {\r\n        for (let y = 0; y < this._height; y++) {\r\n            for (let x = 0; x < this._width; x++) {\r\n                this._initialGrid[y][x] = this._grid[y][x];\r\n            }\r\n        }\r\n    }\r\n    resetInitial() {\r\n        this._resetInitialGrid();\r\n    }\r\n    setOptions(options) {\r\n        let doResize = false;\r\n        if (options.width && options.width > 0) {\r\n            this._width = Math.floor(options.width);\r\n            doResize = true;\r\n        }\r\n        if (options.height && options.height > 0) {\r\n            this._height = Math.floor(options.height);\r\n            doResize = true;\r\n        }\r\n        if (options.tickDelay && options.tickDelay > 0) {\r\n            this._tickDelay = options.tickDelay;\r\n            if (this._doLoop) {\r\n                // reset interval\r\n                // @ts-ignore\r\n                clearInterval(this._loopInterval);\r\n                // @ts-ignore\r\n                this._loopInterval = setInterval(() => {\r\n                    this._tick();\r\n                }, this._tickDelay);\r\n            }\r\n        }\r\n        if (IsValidEdgeMode(options.edgeMode))\r\n            this._edgeMode = options.edgeMode;\r\n        if (doResize) {\r\n            this._resizeGrids();\r\n        }\r\n    }\r\n    setOption(option, value) {\r\n        switch (option) {\r\n            case 'width':\r\n                if (value && value > 0) {\r\n                    this._width = Math.floor(value);\r\n                    this._resizeGrids();\r\n                }\r\n                break;\r\n            case 'height':\r\n                if (value && value > 0) {\r\n                    this._height = Math.floor(value);\r\n                    this._resizeGrids();\r\n                }\r\n                break;\r\n            case 'edgeMode':\r\n                if (IsValidEdgeMode(value))\r\n                    this._edgeMode = value;\r\n                break;\r\n            case 'tickDelay':\r\n                if (value && value > 0) {\r\n                    this._tickDelay = value;\r\n                    if (this._doLoop) {\r\n                        // reset interval\r\n                        // @ts-ignore\r\n                        clearInterval(this._loopInterval);\r\n                        // @ts-ignore\r\n                        this._loopInterval = setInterval(() => {\r\n                            this._tick();\r\n                        }, this._tickDelay);\r\n                    }\r\n                }\r\n                break;\r\n        }\r\n    }\r\n    _resetInitialGrid() {\r\n        this._initialGrid = [];\r\n        for (let y = 0; y < this._height; y++) {\r\n            this._initialGrid[y] = [];\r\n            for (let x = 0; x < this._width; x++) {\r\n                this._initialGrid[y][x] = false;\r\n            }\r\n        }\r\n    }\r\n    _resetGrid() {\r\n        var _a;\r\n        this._grid = [];\r\n        for (let y = 0; y < this._height; y++) {\r\n            this._grid[y] = [];\r\n            for (let x = 0; x < this._width; x++) {\r\n                this._grid[y][x] = (_a = this._initialGrid[y][x]) !== null && _a !== void 0 ? _a : false;\r\n            }\r\n        }\r\n    }\r\n    _resizeGrids() {\r\n        let oldInitialGrid = this._initialGrid;\r\n        let oldGrid = this._grid;\r\n        this._initialGrid = [];\r\n        this._grid = [];\r\n        let copyWidth = oldGrid[0].length < this._width ? oldGrid[0].length : this._width;\r\n        let copyHeight = oldGrid.length < this._height ? oldGrid.length : this._height;\r\n        for (let y = 0; y < this._height; y++) {\r\n            this._initialGrid[y] = [];\r\n            this._grid[y] = [];\r\n            for (let x = 0; x < this._width; x++) {\r\n                if (y < copyHeight && x < copyWidth) {\r\n                    this._initialGrid[y][x] = oldInitialGrid[y][x];\r\n                    this._grid[y][x] = oldGrid[y][x];\r\n                }\r\n                else {\r\n                    this._initialGrid[y][x] = false;\r\n                    this._grid[y][x] = false;\r\n                }\r\n            }\r\n        }\r\n    }\r\n    _tick(step = false) {\r\n        var _a, _b, _c, _d, _e, _f, _g, _h;\r\n        if (!this._doLoop && !step) {\r\n            // @ts-ignore\r\n            clearInterval(this._loopInterval);\r\n            return;\r\n        }\r\n        this._lastTickTime = performance.now();\r\n        this._age++;\r\n        let newGrid = [];\r\n        let neighbors = 0;\r\n        let edge;\r\n        switch (this._edgeMode) {\r\n            case 'empty':\r\n                edge = false;\r\n                break;\r\n            case 'filled':\r\n                edge = true;\r\n                break;\r\n        }\r\n        for (let y = 0; y < this._height; y++) {\r\n            newGrid[y] = [];\r\n            for (let x = 0; x < this._width; x++) {\r\n                // console.log(`${x},${y}: 1`);\r\n                neighbors = 0;\r\n                /*\r\n                switch(this._edgeMode)\r\n                {\r\n                    case 'wrap':\r\n                        \r\n                        break;\r\n                }\r\n                */\r\n                // to avoid indexed access when grid[y] is undefined\r\n                if (y != 0) {\r\n                    // console.log(`${x},${y}: 2a`);\r\n                    if ((_a = this._grid[y - 1][x - 1]) !== null && _a !== void 0 ? _a : edge) // top left\r\n                        neighbors++;\r\n                    if ((_b = this._grid[y - 1][x]) !== null && _b !== void 0 ? _b : edge) // top mid\r\n                        neighbors++;\r\n                    if ((_c = this._grid[y - 1][x + 1]) !== null && _c !== void 0 ? _c : edge) // top right\r\n                        neighbors++;\r\n                }\r\n                else {\r\n                    // console.log(`${x},${y}: 2b`);\r\n                    if (edge)\r\n                        neighbors += 3;\r\n                }\r\n                // console.log(`${x},${y}: 3`);\r\n                if ((_d = this._grid[y][x - 1]) !== null && _d !== void 0 ? _d : edge) // left\r\n                    neighbors++;\r\n                if ((_e = this._grid[y][x + 1]) !== null && _e !== void 0 ? _e : edge) // right\r\n                    neighbors++;\r\n                // to avoid indexed access when grid[y] is undefined\r\n                if (y != this._height - 1) {\r\n                    // console.log(`${x},${y}: 4a`);\r\n                    if ((_f = this._grid[y + 1][x - 1]) !== null && _f !== void 0 ? _f : edge) // bottom left\r\n                        neighbors++;\r\n                    if ((_g = this._grid[y + 1][x]) !== null && _g !== void 0 ? _g : edge) // bottom mid\r\n                        neighbors++;\r\n                    if ((_h = this._grid[y + 1][x + 1]) !== null && _h !== void 0 ? _h : edge) // bottom right\r\n                        neighbors++;\r\n                }\r\n                else {\r\n                    // console.log(`${x},${y}: 4b`);\r\n                    if (edge)\r\n                        neighbors += 3;\r\n                }\r\n                // console.log(`${x},${y}: 5`);\r\n                newGrid[y][x] =\r\n                    (neighbors === 2 && this._grid[y][x]) ||\r\n                        (neighbors === 3);\r\n            }\r\n        }\r\n        this._grid = newGrid;\r\n        this._lastTickDuration = performance.now() - this._lastTickTime;\r\n        this.onTick();\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConwaysLife);\r\n\r\n\n\n//# sourceURL=webpack://conwaylifejs/./src/ConwaysLife.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/ConwaysLife.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});