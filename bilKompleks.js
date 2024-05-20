// Fungsi untuk mengaktifkan/menonaktifkan sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("-translate-x-full");
  sidebar.classList.toggle("translate-x-0");
}

document.getElementById("calculate").addEventListener("click", function () {
  const expression = document.getElementById("expression").value;
  try {
    const result = evaluateComplexExpression(expression);
    document.getElementById("result").innerText = `Hasil: ${result}`;
    addToHistory(expression, result);
  } catch (error) {
    document.getElementById("result").innerText = `Error: ${error.message}`;
  }
});

document.getElementById("reset").addEventListener("click", function () {
  document.getElementById("expression").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("steps").innerText = "";
});

// Ekspresi reguler untuk mencocokkan perkalian bilangan kompleks seperti (x - yi)(x + yi)
function evaluateComplexExpression(expression) {
  const multiplicationMatch = expression.match(
    /\(([^)]+)\)\s*\*\s*\(([^)]+)\)/
  );
  if (multiplicationMatch) {
    const term1 = multiplicationMatch[1];
    const term2 = multiplicationMatch[2];

    const complexRegex = /^([+-]?\d+(\.\d+)?)([+-])i(\d+(\.\d+)?)$/;
    const match1 = term1.match(complexRegex);
    const match2 = term2.match(complexRegex);

    if (match1 && match2) {
      const x1 = parseFloat(match1[1]);
      const y1 = parseFloat(match1[4]);
      const sign1 = match1[3];
      const x2 = parseFloat(match2[1]);
      const y2 = parseFloat(match2[4]);
      const sign2 = match2[3];

      // Periksa apakah bentuknya (x - yi)(x + yi)
      if (x1 === x2 && y1 === y2 && sign1 !== sign2) {
        const x = x1;
        const y = y1;
        const result = x ** 2 + y ** 2;
        return `${expression} = (${x}^2) + (${y}^2) = ${result}`;
      }
    }
  }

  // Evaluasi ekspresi menggunakan math.js
  const result = math.evaluate(expression);

  // Pisahkan bagian real dan imajiner dari hasil
  const realPart = math.re(result);
  const imaginaryPart = math.im(result);

  // Format hasil sebagai a + bi
  let formattedResult = formatNumber(realPart);
  if (imaginaryPart >= 0) {
    formattedResult += ` + ${formatNumber(imaginaryPart)}i`;
  } else {
    formattedResult += ` - ${formatNumber(Math.abs(imaginaryPart))}i`;
  }

  return formattedResult;
}

function formatNumber(number) {
  return Number.isInteger(number) ? number.toString() : number.toFixed(2);
}

  function addToHistory(expression, result) {
    const historyList = document.getElementById("historyList");
    const historyItem = document.createElement("li");
    historyItem.className =
      "history-item p-2 border-b hover:bg-slate-200 border-gray-300 cursor-pointer rounded";
    historyItem.innerText = `${expression} = ${result}`;
    historyItem.addEventListener("click", function () {
      document.getElementById("expression").value = expression;
    });
    historyList.appendChild(historyItem);
  }

// Fungsi untuk mengaktifkan/menonaktifkan popup info
function toggleInfoPopup(event) {
  event.stopPropagation();
  const infoPopup = document.getElementById("infoPopup");
  infoPopup.classList.toggle("hidden");
}

// Fungsi untuk menutup popup info saat mengklik di luar popup
function closeInfoPopup(event) {
  const infoPopup = document.getElementById("infoPopup");
  const infoButton = document.getElementById("infoButton");

  if (!infoPopup.contains(event.target) && event.target !== infoButton) {
    infoPopup.classList.add("hidden");
  }
}

// Menjalankan fungsi-fungsi yang diperlukan saat DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi tombol info
  const infoButton = document.getElementById("infoButton");
  infoButton.addEventListener("click", toggleInfoPopup);

  // Event listener untuk klik di luar popup
  document.addEventListener("click", closeInfoPopup);
});

// Mencegah popup menghilang ketika mengklik di dalam popup
document.getElementById("infoPopup").addEventListener("click", (event) => {
  event.stopPropagation();
});

// Menambahkan event listener untuk input field untuk mendengarkan tombol 'Enter' yang ditekan
document.getElementById("expression").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("calculate").click();
  }
});

// Menambahkan event listener untuk pengiriman form
document
  .getElementById("complexCalcForm")
  .addEventListener("submit", handleFormSubmission);
