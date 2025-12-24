"use strict";

const calculateFV = () => {
    const resultDiv = document.getElementById("result");

    // 1. TOGGLE: If result is currently showing, hide it and STOP
    if (resultDiv.style.display === "block") {
        resultDiv.style.display = "none";
        return; // This prevents the calculation from running again
    }
    // 1. Get user entries from the DOM
    let investment = parseFloat(document.getElementById("investment").value);
    let rate = parseFloat(document.getElementById("rate").value);
    let years = parseInt(document.getElementById("years").value);

    // 2. Simple validation check
    if (isNaN(investment) || isNaN(rate) || isNaN(years)) {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Please enter valid numbers.</p>";
        return;
    }

    // 3. Calculate future value
    let futureValue = investment;
    for (let i = 1; i <= years; i++) {
        futureValue = futureValue + (futureValue * rate / 100);
    }

    // 4. Create and display the output string
    let output = "";
    output += `<h4>Investment amount = $${investment.toFixed(2)}<br>`;
    output += `Interest rate = ${rate}%<br>`;
    output += `Years = ${years}<br>`;
    output += `Future Value is $${futureValue.toFixed(2)}</h4`;

    resultDiv.innerHTML = output;
    resultDiv.style.display = "block";
};

// 5. Attach the function to the button click event
document.getElementById("calculate_btn").addEventListener("click", calculateFV);