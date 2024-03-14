// export function parseData(i = 4, j = 3) {
//   let data = [];

//   for (let i = 0; i < 5; i++) {
//     let section = {
//       id: "section " + i,
//       data: [],
//     };

//     for (let j = 0; j < 100; j++) {
//       section.data.push({
//         id: `card ${i} ${j}`,
//       });
//     }

//     data.push(section);
//   }

//   return data;
// }

export let allData = parseColSection();
export let sectionData = parseData();

console.log(allData);
console.log(sectionData);

function parseColSection(column = 2, sectionList = [1, 3]) {
  let data = [];

  for (let i = 0; i < column; i++) {
    let sections = [];

    for (let s = 0; s < sectionList[i]; s++) {
      sections.push({
        id: `section ${i} ${s}`,
      });
    }

    let col = {
      id: `column ${i}`,
      sections: sections,
    };

    data.push(col);
  }

  return data;
}

function parseData(col = allData, itemsCount = 100) {
  let data = {};

  col.forEach((column) => {
    column.sections.forEach((section) => {
      data[section.id] = [];

      for (let i = 0; i < itemsCount; i++) {
        data[section.id].push({
          id: `card ${i} ${section.id} `,
        });
      }
    });
  });

  return data;
}
