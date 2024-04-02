function countChars() {
    const textInput = document.getElementById('text-input');
    const text = textInput.value;
    const targetInput = document.getElementById('target-input');
    const targetCount = parseInt(targetInput.value, 10) || 0;

    const countTotal = text.length;
    const countNoSpaces = text.replace(/[ 　]/g, '').length;
    const countNoNewlines = text.replace(/\n/g, '').length;
    const countNoSpacesNewlines = text.replace(/[ 　\n]/g, '').length;
    const remainingCount = targetCount - countTotal;

    document.getElementById('count-total').textContent = countTotal;
    document.getElementById('count-no-spaces').textContent = countNoSpaces;
    document.getElementById('count-no-newlines').textContent = countNoNewlines;
    document.getElementById('count-no-spaces-newlines').textContent = countNoSpacesNewlines;
    document.getElementById('remaining-count').textContent = remainingCount;
}

const textInput = document.getElementById('text-input');
const targetInput = document.getElementById('target-input');

textInput.addEventListener('input', countChars);
targetInput.addEventListener('input', countChars);