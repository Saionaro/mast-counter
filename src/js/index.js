const vars = [
  {
    id: 1,
    coruption: 10,
    bonus: 6,
    price: 0,
  },
  {
    id: 2,
    coruption: 15,
    bonus: 9,
    price: 4125,
  },
  {
    id: 3,
    coruption: 20,
    bonus: 12,
    price: 5000,
  },
];

let temp = "0";
let count = 0;
let combinations = [];

const totalData = [];

while (temp !== "222222222") {
  let data = {
    items: { 0: 0, 1: 0, 2: 0 },
    coruption: 0,
    bonus: 0,
  };

  temp = count.toString(3);
  combinations.push(temp);
  count++;

  const temp2 = temp.split("");

  for (const item of temp2) {
    let tg = vars[item];

    data.items[item]++;
    data.coruption += tg.coruption;
    data.bonus += tg.bonus;
  }

  totalData.push(data);
}

const calcTop5 = (resist, maxCor) => {
  return totalData
    .filter((item) => item.coruption - resist <= maxCor)
    .sort((i1, i2) => i2.bonus - i1.bonus)
    .slice(0, 5)
    .map(
      (item) =>
        `${item.items[0]}T1, ${item.items[1]}T2, ${item.items[2]}T3 => ${
          item.coruption - resist
        }cor ${item.bonus}%`
    )
    .join("\n");
};

document.addEventListener("DOMContentLoaded", () => {
  let maxCor = 59;
  let resist = 87;
  const output = document.querySelector(".output");
  const maxCorEl = document.getElementById("max-cor");
  const resistEl = document.getElementById("resist");

  maxCorEl.addEventListener("change", (event) => {
    maxCor = parseInt(event.target.value, 10) || 0;

    output.innerHTML = calcTop5(resist, maxCor);
  });

  resistEl.addEventListener("change", (event) => {
    resist = parseInt(event.target.value, 10) || 0;

    output.innerHTML = calcTop5(resist, maxCor);
  });

  output.innerHTML = calcTop5(resist, maxCor);
});
