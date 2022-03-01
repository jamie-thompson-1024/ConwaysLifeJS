
describe('config test', () => {
    let life;

    describe('options', () => {

        // set initial values to changes 
        // in default values dont effect tests
        const initialOptions = {
            width: 100,
            height: 100,
            tickDelay: 500,
            edgeMode: 'empty'
        };

        // describe test cases for each option
        const optionsCases = [
            { 
                optionName: 'width',
                cases: [
                    { name: "set undefined", input: undefined, expectedOutput: initialOptions.width },
                    { name: "set invalid type", input: 'invalidString', expectedOutput: initialOptions.width },
                    { name: "set 0", input: 0, expectedOutput: initialOptions.width },
                    { name: "set -1", input: -1, expectedOutput: initialOptions.width },
                    { name: "set fraction, less than initial", input: 40.25, expectedOutput: 40 },
                    { name: "set fraction, larger than initial", input: 400.75, expectedOutput: 400 },
                    { name: "set less than initial", input: 25, expectedOutput: 25 },
                    { name: "set larger than initial", input: 500, expectedOutput: 500 }
                ]
            },
            { 
                optionName: 'height',
                cases: [
                    { name: "set undefined", input: undefined, expectedOutput: initialOptions.height },
                    { name: "set invalid type", input: 'invalidString', expectedOutput: initialOptions.height },
                    { name: "set 0", input: 0, expectedOutput: initialOptions.height },
                    { name: "set -1", input: -1, expectedOutput: initialOptions.height },
                    { name: "set fraction, less than initial", input: 40.25, expectedOutput: 40 },
                    { name: "set fraction, larger than initial", input: 400.75, expectedOutput: 400 },
                    { name: "set less than initial", input: 25, expectedOutput: 25 },
                    { name: "set larger than initial", input: 500, expectedOutput: 500 }
                ]
            },
            { 
                optionName: 'tickDelay',
                cases: [
                    { name: "set undefined", input: undefined, expectedOutput: initialOptions.tickDelay },
                    { name: "set invalid type", input: 'invalidString', expectedOutput: initialOptions.tickDelay },
                    { name: "set 0", input: 0, expectedOutput: initialOptions.tickDelay },
                    { name: "set -1", input: -1, expectedOutput: initialOptions.tickDelay },
                    { name: "set fraction, less than initial", input: 40.25, expectedOutput: 40.25 },
                    { name: "set fraction, larger than initial", input: 400.75, expectedOutput: 400.75 },
                    { name: "set less than initial", input: 25, expectedOutput: 25 },
                    { name: "set larger than initial", input: 500, expectedOutput: 500 }
                ]
            },
            { 
                optionName: 'edgeMode',
                cases: [
                    { name: "set undefined", input: undefined, expectedOutput: initialOptions.edgeMode },
                    { name: "set invalid type", input: 123, expectedOutput: initialOptions.edgeMode },
                    { name: "set invalid value", input: 'invalidString', expectedOutput: initialOptions.edgeMode },
                    { name: "set filled", input: 'filled', expectedOutput: 'filled' },
                    { name: "set empty", input: 'empty', expectedOutput: 'empty' },
                ]
            }
        ];

        beforeEach(() => {
            life = new ConwaysLife(initialOptions);
        });

        optionsCases.forEach(({ optionName, cases }) => {
            describe(optionName, () => {
                describe('.setOption()', () => {
                    cases.forEach(({ name, input, expectedOutput }) => {
                        it(name, () => {
                            life.setOption(optionName, input);
                            expect(life[optionName]).toBe(expectedOutput);
                        });
                    });
                });
                describe('.setOptions()', () => {
                    cases.forEach(({ name, input, expectedOutput }) => {
                        it(name, () => {
                            let options = {};
                            options[optionName] = input;
                            life.setOptions(options);
                            expect(life[optionName]).toBe(expectedOutput);
                        });
                    });
                });
            });
        });
    });

    describe('grid', () => {
        describe('generation', () => {

            beforeEach(() => {
                life = new ConwaysLife({ width: 10, height: 10 });
            })

            it('empty 10x10', () => {
                let expected = generateGrid(10, 10);
                expect(
                    compareGrids(life.grid, expected)
                ).toBe(true);
            })
        });

        describe('initial', () => {

            beforeEach(() => {
                life = new ConwaysLife({ width: 3, height: 3 });
            });

            it('empty 3x3', () => {
                expect(
                    compareGrids(
                        life.initialGrid,
                        generateGrid(3, 3)
                    )
                ).toBe(true);
            });

            it('set initial', () => {
                life.setCell(1, 1, true);
                life.setInitial();

                expect(
                    compareGrids(
                        life.initialGrid,
                        [
                            [false,false,false],
                            [false,true,false],
                            [false,false,false]
                        ]
                    )
                ).toBe(true);
            });
            
            it('reset grid', () => {
                life.setCell(1, 1, true);
                life.setInitial();
                life.reset();

                expect(
                    compareGrids(
                        life.grid,
                        [
                            [false,false,false],
                            [false,true,false],
                            [false,false,false]
                        ]
                    )
                ).toBe(true);
            });
            
            it('reset initial', () => {
                life.setCell(1, 1, true);
                life.setInitial();
                life.resetInitial();

                expect(
                    compareGrids(
                        life.initialGrid,
                        [
                            [false,false,false],
                            [false,false,false],
                            [false,false,false]
                        ]
                    )
                ).toBe(true);
            });
        });

        describe('resizing', () => {
            let life;
            
            beforeEach(() => {
                life = new ConwaysLife({ width: 3, height: 3 });
                life.place([[true,false,true],[false,true,false],[true,false,true]], 0, 0);
            });
            
            let cases = [
                { 
                    name: "3x3 to 5x5", 
                    size: [5,5], 
                    expectGrid: [
                        [true,false,true,false,false],
                        [false,true,false,false,false],
                        [true,false,true,false,false],
                        [false,false,false,false,false],
                        [false,false,false,false,false]
                    ]
                },
                {
                    name: "3x3 to 2x4",
                    size: [2,4],
                    expectGrid: [
                        [true,false],
                        [false,true],
                        [true,false],
                        [false,false]
                    ]
                },
                {
                    name: "3x3 to 3x3",
                    size: [3,3],
                    expectGrid: [
                        [true,false,true],
                        [false,true,false],
                        [true,false,true]
                    ]
                },
                {
                    name: "3x3 to 3x(-2) (invalid)",
                    size: [3,-2],
                    expectGrid: [
                        [true,false,true],
                        [false,true,false],
                        [true,false,true]
                    ]
                },
                {
                    name: "3x3 to (-2)x3 (invalid)",
                    size: [-2,3],
                    expectGrid: [
                        [true,false,true],
                        [false,true,false],
                        [true,false,true]
                    ]
                },
                {
                    name: "3x3 to (-3)x(-2) (invalid)",
                    size: [-3,-2],
                    expectGrid: [
                        [true,false,true],
                        [false,true,false],
                        [true,false,true]
                    ]
                }
            ];

            cases.forEach(({name, size, expectGrid}) => {
                it(name, () => {
                    life.setOptions({ width: size[0], height: size[1]});
                    expect(
                        compareGrids(life.grid, expectGrid)
                    ).toBe(true);
                });
            });

        });

        describe('manipulation', () => {

            describe('place structure', () => {
                beforeEach(() => {
                    life = new ConwaysLife({ width: 5, height: 5 });
                });

                let pattern = [
                    [true, true, false],
                    [false, true, true],
                    [true, true, false],
                ]
                let cases = [
                    { 
                        name: "place within",
                        pos: [1, 1],
                        expectedGrid: [
                            [false,false,false,false,false],
                            [false,true,true,false,false],
                            [false,false,true,true,false],
                            [false,true,true,false,false],
                            [false,false,false,false,false],
                        ]
                    },
                    { 
                        name: "place clipping +y",
                        pos: [1, 3],
                        expectedGrid: [
                            [false,false,false,false,false],
                            [false,false,false,false,false],
                            [false,false,false,false,false],
                            [false,true,true,false,false],
                            [false,false,true,true,false],
                        ]
                    },
                    { 
                        name: "place clipping +x",
                        pos: [3, 1],
                        expectedGrid: [
                            [false,false,false,false,false],
                            [false,false,false,true,true],
                            [false,false,false,false,true],
                            [false,false,false,true,true],
                            [false,false,false,false,false],
                        ]
                    },
                    { 
                        name: "place clipping +x, +y",
                        pos: [3, 3],
                        expectedGrid: [
                            [false,false,false,false,false],
                            [false,false,false,false,false],
                            [false,false,false,false,false],
                            [false,false,false,true,true],
                            [false,false,false,false,true],
                        ]
                    },
                    { 
                        name: "place clipping -y",
                        pos: [1, -2],
                        expectedGrid: [
                            [false,true,true,false,false],
                            [false,false,false,false,false],
                            [false,false,false,false,false],
                            [false,false,false,false,false],
                            [false,false,false,false,false],
                        ]
                    },
                    { 
                        name: "place clipping -x",
                        pos: [-1, 1],
                        expectedGrid: [
                            [false,false,false,false,false],
                            [true,false,false,false,false],
                            [true,true,false,false,false],
                            [true,false,false,false,false],
                            [false,false,false,false,false],
                        ]
                    },
                    { 
                        name: "place clipping -x, -y",
                        pos: [-1, -1],
                        expectedGrid: [
                            [true,true,false,false,false],
                            [true,false,false,false,false],
                            [false,false,false,false,false],
                            [false,false,false,false,false],
                            [false,false,false,false,false],
                        ]
                    },
                ]

                cases.forEach(({ name, pos, expectedGrid}) => {
                    it(name, () => {
                        life.place(
                            pattern,
                            pos[0], pos[1]);
                        expect(
                            compareGrids(life.grid, expectedGrid)
                        ).toBe(true);
                    });
                });
            });
            
            describe('set cell', () => {
                let defaultGrid = [
                    [false, true, false],
                    [false, true, false],
                    [false, true, false]
                ];

                beforeEach(() => {
                    life = new ConwaysLife({ width: 3, height: 3 });
                    life.place(defaultGrid, 0, 0);
                });

                let cases = [
                    { 
                        name: "set false cell to true",
                        cell: [0,1], state: true,
                        expectedGrid: [
                            [false, true, false],
                            [true, true, false],
                            [false, true, false]
                        ]
                    },
                    { 
                        name: "set true cell to false",
                        cell: [1,1], state: false,
                        expectedGrid: [
                            [false, true, false],
                            [false, false, false],
                            [false, true, false]
                        ]
                    },
                    { 
                        name: "set false cell to false",
                        cell: [2,1], state: false,
                        expectedGrid: defaultGrid
                    },
                    { 
                        name: "set true cell to true",
                        cell: [1,2], state: true,
                        expectedGrid: defaultGrid
                    },
                    { 
                        name: "set out of bounds cell (+,+)",
                        cell: [5,4], state: true,
                        expectedGrid: defaultGrid
                    },
                    { 
                        name: "set out of bounds cell (+,-)",
                        cell: [4,-2], state: true,
                        expectedGrid: defaultGrid
                    },
                    { 
                        name: "set out of bounds cell (-,+)",
                        cell: [-3,5], state: true,
                        expectedGrid: defaultGrid
                    },
                    { 
                        name: "set out of bounds cell (-,-)",
                        cell: [-1, -2], state: true,
                        expectedGrid: defaultGrid
                    }
                ]

                cases.forEach(({ name, cell, state, expectedGrid}) => {
                    it(name, () => {
                        life.setCell(
                            cell[0], cell[1],
                            state
                        );
                        expect(
                            compareGrids(life.grid, expectedGrid)
                        ).toBe(true);
                    });
                });
            });
        });
    });
});
