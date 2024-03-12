// 履歴を保存するための配列
let history = [];

// 変換履歴を最大何件まで保存するか
const HISTORY_LIMIT = 10;

// テキストをユニコードエスケープシーケンスに変換する
function convertToUnicodeEscape() {
    const inputText = document.getElementById("input-text").value;
    const outputText = escapeText(inputText);
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `
    <p>変換結果：</p>
    <textarea>${outputText}</textarea>
    <button class="copy-button" onclick="copyToClipboard('output-text', '${outputText}')">テキストをコピー</button>
  `;
    addToHistory(inputText, outputText);
}

// ユニコードエスケープシーケンスをテキストに変換する
function convertToNormalText() {
    const inputText = document.getElementById("input-unicode").value;
    const outputText = unescapeText(inputText);
    const outputDiv = document.getElementById("output-unicode");
    outputDiv.innerHTML = `
    <p>変換結果：</p>
    <textarea>${outputText}</textarea>
    <button class="copy-button" onclick="copyToClipboard('output-unicode', '${outputText}')">テキストをコピー</button>
  `;
    addToHistory(outputText, inputText);
}

// §を&に変換する関数
function convertsection() {
    const input = document.getElementById("section-text");
    const text = input.value;
    const convertedText = text.replace(/§/g, "&");
    const result = document.getElementById("result");
    result.innerHTML = `
    <p>変換結果：</p>
    <textarea>${convertedText}</textarea>
  `;
}

// Enter キーが押されたときに変換するようにイベントリスナーを登録する
document.getElementById("input-text").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        convertToUnicodeEscape();
        e.preventDefault();
    }
});
document.getElementById("input-unicode").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        convertToNormalText();
        e.preventDefault();
    }
});
document.getElementById("section-text").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        convertsection();
        e.preventDefault();
    }
});

テキストをクリップボードにコピーする関数
function copyToClipboard(elementId) {
    let copyText;
    const inputText = document.getElementById("input-text");
    const inputUnicode = document.getElementById("input-unicode");
    const sectionText = document.getElementById("section-text");

    switch (elementId) {
        case "output-text":
            copyText = escapeText(inputText.value);
            break;
        case "output-unicode":
            copyText = unescapeText(inputUnicode.value);
            break;
        case "result":
            copyText = sectionText.value.replace(/§/g, "&");
            break;
        default:
            return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = copyText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}

// 変換履歴に追加する関数
function addToHistory(input, output) {
    const time = new Date().toLocaleString();
    const historyTable = document.querySelector(".history-table tbody");
    const tr = document.createElement("tr");
    const tdInput = document.createElement("td");
    const tdOutput = document.createElement("td");
    const tdDelete = document.createElement("td");
    const tdTime = document.createElement("td");

    tdInput.textContent = input;
    tdOutput.textContent = output;

    // 削除ボタンを作成する
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
        history = history.filter((h) => h.input !== input);
        tr.remove();
    });
    tdDelete.appendChild(deleteButton);

    tdTime.textContent = time;

    tr.appendChild(tdInput);
    tr.appendChild(tdOutput);
    tr.appendChild(tdDelete);
    tr.appendChild(tdTime);
    historyTable.appendChild(tr);

    // 履歴を保存する
    history.unshift({ input, output, time });
    if (history.length > HISTORY_LIMIT) {
        history.pop();
        historyTable.lastElementChild.remove();
    }
}

// テキストをユニコードエスケープシーケンスに変換する関数
function escapeText(text) {
    return text
        .split("")
        .map((c) =>
            c.codePointAt(0) > 127
                ? "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")
                : c
        )
        .join("");
}

// ユニコードエスケープシーケンスをテキストに変換する関数
function unescapeText(unicode) {
    return unicode.replace(/\\u(\w\w\w\w)/g, (matched, p1) =>
        String.fromCharCode(parseInt(p1, 16))
    );
}