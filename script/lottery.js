const rangeInput = document.getElementById('range-input');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const excludeDrawnBtn = document.getElementById('exclude-drawn-btn');
const resultDiv = document.getElementById('result');
const historyDiv = document.getElementById('history');
const leftOverDiv = document.getElementById('left-over');

let drawnNumbers = [];
let remainingNumbers = [];
let excludeDrawn = false;

// 抽選を開始する関数
function startLottery() {
    const range = parseInt(rangeInput.value, 10);
    // 範囲が数字でないか、2未満の場合は処理を終了する
    if (isNaN(range) || range < 2) {
        return;
    }

    // 以下は既存の処理
    remainingNumbers = Array.from({ length: range }, (_, i) => i + 1);
    drawnNumbers = [];
    resultDiv.textContent = '';
    historyDiv.textContent = '';
    updateLeftOverNumbers();

    drawNumber(excludeDrawn); // excludeDrawnの値を渡す
}

// 数字を引く関数
function drawNumber(exclude) {
    // 初期状態の場合は残りの数字を設定する
    if (remainingNumbers.length === 0) {
        const range = parseInt(rangeInput.value, 10);
        remainingNumbers = Array.from({ length: range }, (_, i) => i + 1);
    }

    if (remainingNumbers.length === 0) {
        alert('No more numbers left to draw.');
        return;
    }

    // 以下は既存の処理
    const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
    const drawnNumber = remainingNumbers[randomIndex];

    if (exclude) {
        remainingNumbers = remainingNumbers.filter(num => num !== drawnNumber);
    } else {
        remainingNumbers.splice(randomIndex, 1);
    }

    drawnNumbers.push(drawnNumber);

    // 結果を表示する
    resultDiv.textContent = `結果： ${drawnNumber}`;

    // 履歴を表示する
    historyDiv.textContent = `当選済： ${drawnNumbers.join(', ')}`;
    updateLeftOverNumbers();
}

// 抽選をリセットする関数
function resetLottery() {
    drawnNumbers = [];
    remainingNumbers = [];
    resultDiv.textContent = '';
    historyDiv.textContent = '';
    leftOverDiv.textContent = '';
    excludeDrawn = false;
}

// 残りの数字を更新する関数
function updateLeftOverNumbers() {
    leftOverDiv.textContent = `未当選： ${remainingNumbers.join(', ')}`;
}

function toggleExcludeDrawn() {
    excludeDrawn = !excludeDrawn;
}

startBtn.addEventListener('click', startLottery);
resetBtn.addEventListener('click', resetLottery);
excludeDrawnBtn.addEventListener('click', () => {
    toggleExcludeDrawn();
    drawNumber(excludeDrawn);
});