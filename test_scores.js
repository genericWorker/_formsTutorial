
let namesArr = ['Ben', 'Joel', 'Judy', 'Anne'];
let scoresArr = [88, 98, 77, 88];

function getAvgScore() {
    let i = 0,
        sum = 0,
        len = scoresArr.length;
    let name = '';
    for (i; i < len; i++) {
        sum += scoresArr[i];
    }
    return sum / len;
}

function getHighScore() {
    let i = 0,
        max = 0,
        len = scoresArr.length;
    let name = '';
    for (i; i < len; i++) {
        if (scoresArr[i] > max) {
            max = scoresArr[i];
            name = namesArr[i];
        }
    }
    return name + ' with score of ' + max;
}

function initializeResults() {
    let avgs = $('#avgs');
    let high = getHighScore();
    let avg = getAvgScore().toFixed(1);
    $('#highScore').html(high);
    $('#avgScore').html(avg);
}


function displayResults() {
    let results = $('#avgs');
    results.toggle();
    $('#error_message').html('');
}

//  insert a new element in the html table after current index.  Assumes, names and scores are updates already.
function insertTableElement(scoresTable, index) {
    $('scoresTable tr:last').after('<tr> <td>' + namesArr[index] + '</td><td>' + scoresArr[index] + '</td></tr>');
}

function insertNewTableElement(newName, newScore) {
    let rowCount = document.getElementById("scores_table").getElementsByTagName("tr").length;
    $('#scoresTable tr:last').append('<tr> <td>' + newName + '</td><td>' + newScore + '</td></tr>');
    rowCount = document.getElementById("scores_table").getElementsByTagName("tr").length;
}

function initializeScoresTable() {
    // Remove header row from table
    $('#scores_table tr').slice(1).remove();
    for (let i = 0; i < scoresArr.length; i++) {
        insertNewTableElement($('#scores_table tr:last').after('<tr> <td>' + namesArr[i] + '</td><td>' + scoresArr[i] + '</td></tr>'));
    }
}

function displayScores() {
    let scores = $('#scores');
    scores.toggle();
     $('#error_message').html('');
}

function addScore() {
    let scoreField = $('#score');
    let nameField = $('#name');
    let nameValue = nameField.val().trim(); // Use trim to remove accidental whitespace
    let scoreValue = scoreField.val();

    // 1. Check if fields are empty
    if (nameValue === '' || scoreValue === '') {
        $('#error_message').html('Name and score must have values');
        return;
    }

    // 2. Check if name is alphabetic only
    // This regex allows uppercase and lowercase letters
    let alphaRegex = /^[A-Za-z\s]+$/; 
    if (!alphaRegex.test(nameValue)) {
        $('#error_message').html('Name must contain only letters');
        return;
    }

    // Clear error message if validation passes
    $('#error_message').html('');

    // Push values to arrays
    scoresArr.push(parseInt(scoreValue));
    namesArr.push(nameValue);

    // Update UI
    initializeScoresTable();
    // Note: insertNewTableElement might be redundant if initializeScoresTable re-renders the whole list
    
    scoreField.val('');
    nameField.val('');
    nameField.focus();
    
    initializeResults();
    $('#scores').show();
    $('#results').show();
}


window.onload = function () {
    $('#display_results').on('click',  function() {
        displayResults();
    });
     
    $('#display_scores').on('click',  function() {
        displayScores();
    });
    $('#add').on('click',  function() {
        addScore();
    });

    let name = $('#name');
    let score = $('#score');

    name.focus();
    initializeResults();
    initializeScoresTable();

    // register jQuery extension
    // used for changing focus on enter ekey
    jQuery.extend(jQuery.expr[':'], {
        focusable: function(el, index, selector) {
            return $(el).is('a, button, :input, [tabindex]');
        }
    });

    //  Changes focus to next input on enter key
    $(document).on('keypress', 'input,select', function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            // Get all focusable elements on the page
            let $canfocus = $(':focusable');
            let index = $canfocus.index(this) + 1;
            if (index >= $canfocus.length) index = 0;
            $canfocus.eq(index).focus();
        }
    });
}