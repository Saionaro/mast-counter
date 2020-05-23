import groupBy from "lodash.groupby";

const vars = [
  {
    id: 0,
    coruption: 10,
    bonus: 6,
    price: 3000,
  },
  {
    id: 1,
    coruption: 15,
    bonus: 9,
    price: 4125,
  },
  {
    id: 2,
    coruption: 20,
    bonus: 12,
    price: 5000,
  },
];

const totalData = [];

let cache = {};

let current = "";
let count = 0;

while (current !== "222222222") {
  let data = {
    items: { 0: 0, 1: 0, 2: 0 },
    coruption: 0,
    bonus: 0,
    price: 0,
  };

  current = count.toString(3);
  count++;

  const parts = current.split("");

  for (const item of parts) {
    let tg = vars[item];

    data.items[item]++;
    data.coruption += tg.coruption;
    data.bonus += tg.bonus;
    data.price += tg.price;
  }

  let tag = `${data.items[0]}-${data.items[1]}-${data.items[2]}`;

  if (!cache[tag]) {
    cache[tag] = true;
    totalData.push(data);
  }
}

cache = {};

const calcTop5 = (resist, maxCor) => {
  const top5 = totalData
    .filter((item) => item.coruption - resist <= maxCor)
    .sort((i1, i2) => i2.bonus - i1.bonus)
    .slice(0, 5);

  const groups = groupBy(top5, "bonus");
  const keys = Object.keys(groups).sort(
    (k1, k2) => parseInt(k2, 10) - parseInt(k1, 10)
  );

  const sortedTop5 = [];

  for (const key of keys) {
    let sortedGroup = groups[key].sort((i1, i2) => i1.price - i2.price);
    sortedTop5.push(...sortedGroup);
  }

  return sortedTop5
    .map(
      (item) =>
        `<span>${item.items[0]}T1, ${item.items[1]}T2, ${item.items[2]}T3 (${
          item.price
        } echos) => ${item.coruption - resist}cor ${item.bonus}%</span>`
    )
    .join("\n\n");
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
