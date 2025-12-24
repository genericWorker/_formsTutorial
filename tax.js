"use strict";

const $ = selector => document.querySelector(selector);

const getErrorMsg = lbl => `${lbl} must be a valid number greater than zero.`;
const getErrorMsgTax = lbl => `${lbl} must be a valid number greater than zero and less than 100.`;
const error_message = document.getElementById("error_message");

const focusAndSelect = selector => {
    const elem = $(selector);
    elem.focus();
    elem.select();
};

const calculateTax = (subtotal, taxRate) => {
    const taxAmount = subtotal * taxRate/100; 
    return taxAmount; 
};

const processEntries = () => {

    const sale = parseFloat($("#sale").value);
    const tax = parseFloat($("#tax").value);
    error_message.textContent = "";
    if (isNaN(sale) || sale <= 0) {
            error_message.textContent = getErrorMsgTax("sale"); 
        focusAndSelect("#sale");
    } else if (isNaN(tax) || tax <= 0 || tax >= 100) {
        error_message.textContent = getErrorMsgTax("tax rate"); 
        focusAndSelect("#tax");
    } else {
         $("#total").value = (sale + calculateTax(sale, tax)).toFixed(2); 
         console.log("Total=" + $("#total").value); 
    }
    const text = error_message.textContent;
    error_message.textContent = text.charAt(0).toUpperCase() + text.slice(1);
};

const clearEntries = () => {
    $("#sale").value = "";
    $("#tax").value = "";
    $("#total").value = "";
    error_message.textContent = "";
};

document.addEventListener("DOMContentLoaded", () => {
    $("#calculate_btn").addEventListener("click", processEntries);
    $("#clear_btn").addEventListener("click", clearEntries);
    $("#sale").focus();
});