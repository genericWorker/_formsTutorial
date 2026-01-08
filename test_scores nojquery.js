let namesArr = ['Ben', 'Joel', 'Judy', 'Anne'];
let scoresArr = [88, 98, 77, 88];

function getAvgScore() {
    let sum = scoresArr.reduce((a, b) => a + b, 0);
    return sum / scoresArr.length;
}

function getHighScore() {
    let max = 0;
    let name = '';
    for (let i = 0; i < scoresArr.length; i++) {
        if (scoresArr[i] > max) {
            max = scoresArr[i];
            name = namesArr[i];
        }
    }
    return name + ' with score of ' + max;
}

function initializeResults() {
    const high = getHighScore();
    const avg = getAvgScore().toFixed(1);
    
    document.getElementById('highScore').innerHTML = high;
    document.getElementById('avgScore').innerHTML = avg;
}

function displayResults() {
    const results = document.getElementById('avgs');
    // Native toggle logic
    results.style.display = (results.style.display === 'none') ? 'block' : 'none';
    document.getElementById('error_message').innerHTML = '';
}

function insertNewTableElement(newName, newScore) {
    const table = document.getElementById("scores_table");
    const row = table.insertRow(-1); // Appends to the end of the table
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = newName;
    cell2.innerHTML = newScore;
}

function initializeScoresTable() {
    const table = document.getElementById("scores_table");
    
    // Clear all rows except the header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (let i = 0; i < scoresArr.length; i++) {
        insertNewTableElement(namesArr[i], scoresArr[i]);
    }
}

function displayScores() {
    const scores = document.getElementById('scores');
    scores.style.display = (scores.style.display === 'none') ? 'block' : 'none';
    document.getElementById('error_message').innerHTML = '';
}

function addScore() {
    const scoreInput = document.getElementById('score');
    const nameInput = document.getElementById('name');
    const errorMsg = document.getElementById('error_message');

    if (scoreInput.value === '' || nameInput.value === '') {
        errorMsg.innerHTML = 'Name and score must have values';
        return;
    }

    errorMsg.innerHTML = '';
    
    // Update data arrays
    scoresArr.push(parseInt(scoreInput.value));
    namesArr.push(nameInput.value);

    // Refresh UI
    initializeScoresTable();
    initializeResults();

    // Clear inputs and focus
    scoreInput.value = '';
    nameInput.value = '';
    nameInput.focus();

    document.getElementById('scores').style.display = 'block';
    document.getElementById('results').style.display = 'block';
}

// Equivalent to window.onload or DOMContentLoaded
window.addEventListener('load', () => {
    
    // Event Listeners
    document.getElementById('display_results').addEventListener('click', displayResults);
    document.getElementById('display_scores').addEventListener('click', displayScores);
    document.getElementById('add').addEventListener('click', addScore);

    // Initial setup
    document.getElementById('name').focus();
    initializeResults();
    initializeScoresTable();

    // Handle "Enter" key to change focus
    document.addEventListener('keypress', function (e) {
        if (e.key === "Enter" && (e.target.tagName === "INPUT" || e.target.tagName === "SELECT")) {
            e.preventDefault();

            // Get all focusable elements
            const focusableSelector = 'a, button, input, select, [tabindex]:not([tabindex="-1"])';
            const focusables = Array.from(document.querySelectorAll(focusableSelector));
            const index = focusables.indexOf(e.target);

            if (index > -1) {
                const nextElement = focusables[index + 1] || focusables[0];
                nextElement.focus();
            }
        }
    });
});