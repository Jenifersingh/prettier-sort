const { parsers } = require("prettier/parser-babel");
const { default: generate } = require("@babel/generator");
const fs = require("fs");

// console.log(parsers.babel);

const parseIt = (text, options) => {
  console.log(text);
  const ast = parsers.babel.parse(text);
  let temp = ast.program.body[0];
  ast.program.body[0] = ast.program.body[1];
  ast.program.body[1] = temp;
  console.log(generate(ast, options).code);
  return generate(ast, options).code;
};



module.exports = {
  parsers: {
    babel: {
      ...parsers.babel,
      preprocess: parseIt,
    },
  },
};

let file = parseIt(
  fs.readFileSync("./src/App.js", { encoding: "utf8", flag: "r" }),
);

// const prettierPluginBabel = require("prettier/plugins/ba bel");
// const {
//   parse: globalParse,
//   print: globalPrint,
// } = require("prettier/parser-babel");
// const fs = require("fs");

// module.exports = {
//   parsers: {
//     "dance-parse": {
//       parse(text, options) {
//         const ast = globalParse(text, options);
//         let temp = ast.program.body[0];
//         ast.program.body[0] = ast.program.body[1];
//         ast.program.body[1] = temp;
//         console.log(ast);
//         return ast;
//       },
//       // The name of the AST that
//       astFormat: "dance-ast",
//     },
//   },
//   printers: {
//     "dance-parse": {
//       print: globalPrint,
//     },
//   },
// };

// await format("lodash ( )", {
//   parser: "my-custom-parser",
//   plugins: [myCustomPlugin],
// });
// -> "_();\n"

// module.exports = {
//   parsers: ["dance-parser"],
//   forma
// };

// function parseIt(text, options) {
//   const ast = parse(text);
//   console.log(ast);
//   // Parse the input text into an AST
//   // const ast = parse(text, options);
//   // Apply the custom formatting rule
//   let temp = ast.program.body[0];
//   ast.program.body[0] = ast.program.body[1];
//   ast.program.body[1] = temp;
//   console.log("PRETTY PRINTTT ", ast.program.body);

//   return ast;
// }

// parseIt(fs.readFileSync("./src/App.js", { encoding: "utf8", flag: "r" }));

// module.exports = {
//   // Define the name of the plugin
//   name: "import-order-change",
//   // Implement the format function to augment Prettier behavior
//   format: async (text, options) => {
//     const ast = await parse(text);
//     // Parse the input text into an AST
//     // const ast = parse(text, options);
//     // Apply the custom formatting rule
//     let temp = ast.program.body[0];
//     ast.program.body[0] = ast.program.body[1];
//     ast.program.body[1] = temp;
//     console.log("PRETTY PRINTTT ", ast.program.body);
//     // Print the formatted AST back to text
//     return print(ast, options);
//   },
// };
