// Define calculations array to store history
let calculations = [];

// Function to toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
  sidebar.classList.toggle("translate-x-0");
}

// Function to render history
function renderHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  // Loop through calculations array and render history
  calculations.forEach(function (calculation) {
    let listItem = document.createElement("li");
    listItem.textContent = calculation.expression;
    listItem.classList.add(
      "cursor-pointer",
      "hover:bg-gray-100",
      "p-1",
      "rounded",
      "mb-2"
    );
    historyList.appendChild(listItem);

    // Add click event listener to each history item
    listItem.addEventListener("click", function () {
      let value = this.textContent;
      document.getElementById("expression").value = value;
    });
  });
}

// Function to calculate complex expression
function evaluateComplexExpression(expression) {
  // Evaluate expression using math.js
  const result = math.evaluate(expression);

  // Check if the result is a complex number
  if (result.im !== undefined) {
    // Format the complex number
    const formattedResult = `${formatNumber(result.re)} ${
      result.im >= 0 ? "+" : "-"
    } ${Math.abs(formatNumber(result.im))}i`;
    return {
      result: formattedResult,
      expression: expression, // Return expression along with result
    };
  }

  // For non-complex numbers, format normally
  return {
    result: formatNumber(result),
    expression: expression, // Return expression along with result
  };
}

// Function to format numbers
function formatNumber(number) {
  // Format the number with 2 decimal places
  let formattedNumber = math.format(number, {
    notation: "fixed",
    precision: 2,
  });

  // Check if the number is an integer
  if (Number.isInteger(parseFloat(number))) {
    // Remove .00 from the formatted string
    formattedNumber = formattedNumber.split(".")[0];
  }

  return formattedNumber;
}

// Add event listener to the calculate button
document.getElementById("calculate").addEventListener("click", function () {
  const expression = document.getElementById("expression").value;
  try {
    const result = evaluateComplexExpression(expression);
    document.getElementById("result").innerText = `Hasil: ${result.result}`;

    // Add the calculation to history
    calculations.push(result);
    renderHistory(); // Update the history display
  } catch (error) {
    document.getElementById("result").innerText = `Error: ${error.message}`;
  }
});

// Function to reset input field
document.getElementById("reset").addEventListener("click", function () {
  document.getElementById("expression").value = "";
});

// Call renderHistory initially to render any existing history
renderHistory();

// Add event listener to the input field to listen for 'Enter' key press
document
  .getElementById("expression")
  .addEventListener("keypress", function (e) {
    // Check if the key pressed is 'Enter' (key code 13)
    if (e.key === "Enter") {
      // Prevent the default action (form submission)
      e.preventDefault();

      // Trigger the click event on the 'Hitung' button
      document.getElementById("calculate").click();
    }
  });
function calculateComplexOperation(operationString) {
  const parts = operationString.split(/(?=[+-])/);
  let resultReal = 0;
  let resultImaginary = 0;

  parts.forEach((part) => {
    const complexNumber = parseComplexNumber(part);
    if (complexNumber) {
      resultReal += complexNumber.realPart;
      resultImaginary += complexNumber.imaginaryPart;
    }
  });

  return { resultReal, resultImaginary };
}

document
  .getElementById("complexCalcForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const input = document.getElementById("complexInput").value;

    try {
      const result = calculateComplexOperation(input);
      document.getElementById(
        "result"
      ).innerHTML = `Hasil: ${result.resultReal} + ${result.resultImaginary}i`;
    } catch (error) {
      document.getElementById("result").innerHTML = "Format input tidak valid";
    }
  });