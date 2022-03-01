
describe('config test', () => {
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

        let life;

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
        })
    })
});
