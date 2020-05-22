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

const getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const calcTop5 = (resist, maxCor) => {
  const count = 9;
  const res = [];

  for (let randy = 0; randy < 1000; randy++) {
    for (let i = 1; i <= count; i++) {
      let data = {
        items: { 1: 0, 2: 0, 3: 0 },
        coruption: -resist,
        bonus: 0,
      };

      for (let j = 0; j < i; j++) {
        const tg = vars[getRandom(0, 3)];

        data.items[tg.id]++;
        data.coruption += tg.coruption;
        data.bonus += tg.bonus;
      }

      if (data.coruption > 40 && data.coruption < maxCor) {
        res.push(data);
      }
    }
  }

  const results = res.sort((i1, i2) => i2.bonus - i1.bonus).slice(0, 5);

  return results
    .map(
      (item) =>
        `${item.items[1]}T1, ${item.items[2]}T2, ${item.items[3]}T3 => ${item.coruption}cor ${item.bonus}%`
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
