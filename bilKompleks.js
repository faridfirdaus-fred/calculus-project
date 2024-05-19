// Function to toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
  sidebar.classList.toggle("translate-x-0");
}

// Define calculations array
const calculations = [];

// Function to render history
function renderHistory() {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  calculations.forEach((calculation) => {
    const listItem = document.createElement("li");
    listItem.textContent = calculation.expression;
    listItem.classList.add(
      "cursor-pointer",
      "hover:bg-gray-100",
      "p-1",
      "rounded",
      "mb-2"
    );
    historyList.appendChild(listItem);

    listItem.addEventListener("click", () => {
      const value = listItem.textContent;
      document.getElementById("expression").value = value;
    });
  });
}

// Function to evaluate complex expression
function evaluateComplexExpression(expression) {
  const result = math.evaluate(expression);

  if (result.im !== undefined) {
    const formattedResult = `${formatNumber(result.re)} ${
      result.im >= 0 ? "+" : "-"
    } ${Math.abs(formatNumber(result.im))}i`;
    return {
      result: formattedResult,
      expression,
    };
  }

  return {
    result: formatNumber(result),
    expression,
  };
}

// Function to format numbers
function formatNumber(number) {
  const formattedNumber = math.format(number, {
    notation: "fixed",
    precision: 2,
  });

  if (Number.isInteger(parseFloat(number))) {
    return formattedNumber.split(".")[0];
  }

  return formattedNumber;
}

// Function to calculate expression
function calculateExpression() {
  const expression = document.getElementById("expression").value;
  try {
    const result = evaluateComplexExpression(expression);
    document.getElementById("result").textContent = `Hasil: ${result.result}`;

    calculations.push(result);
    renderHistory();
  } catch (error) {
    document.getElementById("result").textContent = `Error: ${error.message}`;
  }
}

// Function to reset input field
function resetInputField() {
  document.getElementById("expression").value = "";
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  const input = document.getElementById("complexInput").value;
  try {
    const result = calculateComplexOperation(input);
    document.getElementById(
      "result"
    ).textContent = `Hasil: ${result.resultReal} + ${result.resultImaginary}i`;
  } catch (error) {
    document.getElementById("result").textContent = "Format input tidak valid";
  }
}

// Function to initialize the page
function initializePage() {
  const calculateButton = document.getElementById("calculate");
  const resetButton = document.getElementById("reset");
  const expressionInput = document.getElementById("expression");
  const resultDiv = document.getElementById("result");
  const stepsDiv = document.getElementById("steps");
  const historyList = document.getElementById("historyList");

  const resetCalculator = () => {
    expressionInput.value = "";
    resultDiv.innerHTML = "";
    stepsDiv.innerHTML = "";
  };

  const showResult = (expression, result, steps) => {
    resultDiv.innerHTML = `<strong>Hasil:</strong> ${result}`;
    stepsDiv.innerHTML = `<strong>Cara Pengerjaan:</strong><br>${steps.join(
      "<br>"
    )}`;

    const historyItem = document.createElement("li");
    historyItem.innerHTML = `<strong>Ekspresi:</strong> ${expression} = <strong>${result}</strong>`;
    historyList.appendChild(historyItem);
  };

  const calculateExpression = () => {
    const expression = expressionInput.value;
    try {
      const node = math.parse(expression);
      const compiled = node.compile();
      const result = compiled.evaluate();

      const steps = [
        `Input ekspresi: ${expression}`,
        `Parsing ekspresi`,
        `Evaluasi hasil: ${result}`,
      ];

      showResult(expression, result, steps);
    } catch (error) {
      resultDiv.innerHTML = `<span class="text-red-500">Error: ${error.message}</span>`;
    }
  };

  calculateButton.addEventListener("click", calculateExpression);
  resetButton.addEventListener("click", resetCalculator);
}

// Function to toggle info popup
function toggleInfoPopup() {
  const infoPopup = document.getElementById("infoPopup");
  infoPopup.classList.toggle("hidden");
}

// Function to close info popup when clicking outside
function closeInfoPopup(event) {
  const infoPopup = document.getElementById("infoPopup");
  const infoButton = document.getElementById("infoButton");

  if (!infoPopup.contains(event.target) && event.target !== infoButton) {
    infoPopup.classList.add("hidden");
  }
}

// Call necessary functions on DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  renderHistory();
  initializePage();

  const infoButton = document.getElementById("infoButton");
  infoButton.addEventListener("click", toggleInfoPopup);

  document.addEventListener("click", closeInfoPopup);
});

// Add event listener to the input field to listen for 'Enter' key press
document.getElementById("expression").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("calculate").click();
  }
});

// Add event listener to the form submission
document.getElementById("complexCalcForm").addEventListener(
  "submit",
  handleFormSubmission
);