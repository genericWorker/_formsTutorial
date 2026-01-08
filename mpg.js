// Global selection of elements
const error_message = document.getElementById("error_message");

const processEntries = () => {
    // Get the input elements
    const milesInput = document.getElementById("miles");
    const gallonsInput = document.getElementById("gallons");
    const resultInput = document.getElementById("mpg_result");

    const miles = parseFloat(milesInput.value);
    const gallons = parseFloat(gallonsInput.value);
    
    // Clear previous errors
    error_message.textContent = "";

    // Logic validation
    if (!isNaN(miles) && !isNaN(gallons) && miles > 0 && gallons > 0) {
        const mpg = (miles / gallons).toFixed(2);
        resultInput.value = mpg;
    } else {
        error_message.textContent = "Please enter valid numbers greater than zero for both fields.";
    }
};

const clearEntries = () => {
    document.getElementById("miles").value = "";
    document.getElementById("gallons").value = "";
    document.getElementById("mpg_result").value = "";
    error_message.textContent = "";
    document.getElementById("miles").focus();
};

// Event listeners (No DOMContentLoaded needed because of 'defer')
document.getElementById("calculate_btn").addEventListener("click", processEntries);
document.getElementById("clear_btn").addEventListener("click", clearEntries);