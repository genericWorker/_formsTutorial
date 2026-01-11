let namesArr = ['Ben', 'Joel', 'Judy', 'Anne'];
let scoresArr = [88, 98, 77, 88];

// Helper to calculate average
function getAvgScore() {
    if (scoresArr.length === 0) return 0;
    let sum = scoresArr.reduce((a, b) => a + b, 0);
    return (sum / scoresArr.length).toFixed(1);
}

// Helper to find high score
function getHighScore() {
    if (scoresArr.length === 0) return "N/A";
    let max = Math.max(...scoresArr);
    let index = scoresArr.lastIndexOf(max); // Gets the most recent person with the high score
    return namesArr[index] + ' with score of ' + max;
}

// Updates the summary (Average and High Score)
function updateSummary() {
    $('#highScore').html(getHighScore());
    $('#avgScore').html(getAvgScore());
}

// The "Single Source of Truth" for the table
function renderTable() {
    const tableBody = $('#scores_table tbody');
    // Clear all rows except the header
    $('#scores_table tr:gt(0)').remove(); 

    // Rebuild table from the arrays
    for (let i = 0; i < namesArr.length; i++) {
        $('#scores_table').append(`<tr><td>${namesArr[i]}</td><td>${scoresArr[i]}</td></tr>`);
    }
}

function addScore() {
    let scoreInput = $('#score');
    let nameInput = $('#name');
    let nameValue = nameInput.val().trim();
    let scoreValue = parseInt(scoreInput.val());

    // Validation: Not empty and Alphabetic only
    let alphaRegex = /^[A-Za-z\s]+$/;
    
    if (nameValue === '' || isNaN(scoreValue)) {
        $('#error_message').html('Please enter both a name and a numeric score.');
        return;
    }

    if (!alphaRegex.test(nameValue)) {
        $('#error_message').html('Name must contain only letters.');
        return;
    }

    // Success: Update Data
    $('#error_message').html('');
    namesArr.push(nameValue);
    scoresArr.push(scoreValue);

    // Update UI
    renderTable();
    updateSummary();

    // Reset Form
    nameInput.val('').focus();
    scoreInput.val('');
}

// UI Toggles
function toggleResults() {
    $('#avgs').toggle();
}

function toggleScores() {
    $('#scores').toggle();
}

$(document).ready(function () {
    // Initial Render
    renderTable();
    updateSummary();

    // Event Listeners
    $('#display_results').on('click', toggleResults);
    $('#display_scores').on('click', toggleScores);
    $('#add').on('click', addScore);

    // Enter Key Navigation
    $(document).on('keypress', 'input', function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            let inputs = $('input');
            let nextIndex = inputs.index(this) + 1;
            if (nextIndex < inputs.length) {
                inputs.eq(nextIndex).focus();
            } else {
                addScore(); // If on the last input, trigger the add
            }
        }
    });
});