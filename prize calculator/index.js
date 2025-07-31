/**
 * Read FAQs section on the left for more information on how to use the editor
**/
// DO CHANGE THE FUNCTION NAME
function calculatePrizes(awards) {
  // write your solution here
  const obj = {};
  for (const el of awards) {
    if (obj[el.category + "," + el.year] === undefined) {
      obj[el.category + "," + el.year] = {
        winners: {
          [el.team]: [{ name: el.name }]
        }
      }
    } else if (obj[el.category + "," + el.year]["winners"][el.team]) {
      obj[el.category + "," + el.year]["winners"][el.team] = [...obj[el.category + "," + el.year]["winners"][el.team], { name: el.name }]
    } else {
      obj[el.category + "," + el.year]["winners"][el.team] = [{ name: el.name }]
    }

  }

  const values = [];
  for (let key in obj) {
    const value = {
      category: key.split(",")[0],
      year: key.split(",")[1],
      winners: [

      ]
    }
    for (let k in obj[key]["winners"]) {
      let initialValue = 1 / Object.keys(obj[key]["winners"]).length;
      for (const m of obj[key]["winners"][k]) {
        const share = initialValue / obj[key]["winners"][k].length;
        value.winners.push({ ...m, share })
      }
    }
    values.push(value);
  }
  return values;
}