
const life = new ConwaysLife({
    edgeMode: 'filled'
});
console.log(life);

life.step();

console.log(life.grid);
