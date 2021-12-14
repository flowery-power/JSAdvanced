function solve(arr) {
  let storage = {}
  for (const line of arr) {
    let tokens = line.split(" | ")
    let [brand, model, quantity] = tokens
    if(!storage[brand]){
      storage[brand] = {}
    }
    if(!storage[brand][model]){
      storage[brand][model] = 0
    }
    storage[brand][model] += Number(quantity)
  }
  let sorted = Object.entries(storage)
  for (const line of sorted) {
    console.log(line[0])
    for (const currernt in line[1]) {
      console.log(`###${currernt} -> ${line[1][currernt]}`)
    }
  }
}
console.log(
  solve([
    "Audi | Q7 | 1000",
    "Audi | Q6 | 100",
    "BMW | X5 | 1000",
    "BMW | X6 | 100",
    "Citroen | C4 | 123",
    "Volga | GAZ-24 | 1000000",
    "Lada | Niva | 1000000",
    "Lada | Jigula | 1000000",
    "Citroen | C4 | 22",
    "Citroen | C5 | 10",
  ])
);
