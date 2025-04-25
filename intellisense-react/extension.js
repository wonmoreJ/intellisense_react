const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("🔧 확장 활성화됨");

  const provider = vscode.languages.registerCompletionItemProvider(
    [
      { scheme: "file", language: "javascript" },
      { scheme: "file", language: "javascriptreact" },
    ],
    {
      provideCompletionItems(document, position) {
        const completion = new vscode.CompletionItem("리액트 Hook(useState))");
        const lineStr = document.lineAt(position);
        const text = lineStr.text;
        const lineArr = text.split(" ");
        console.log("text.length" + text.length);
        const retrunStr = `const [${lineArr[0]}, set${
          lineArr[0].charAt(0).toUpperCase() + lineArr[0].slice(1)
        }] = useState();`;

        completion.insertText = retrunStr;
        completion.detail =
          "리액트 useState 자동완성(Automatic Completion of React Hook) - ex) const test hook => const [ test, setTest ] = useState()";

        return [completion];
      },
    },
    " "
  );

  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
