// ダークモードをトグルする関数
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    // ローカルストレージにダークモード設定を保存する
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

// ページ読み込み時にローカルストレージからダークモード設定を読み込む
window.onload = function() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.body.classList.add("dark-mode");
    }
}

//初期状態をダークモードにする
document.body.classList.add("dark-mode");