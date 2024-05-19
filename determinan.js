
// Fungsi untuk menampilkan kalkulator 3x3 dan menyembunyikan kalkulator 2x2
function showCalculator3x3() {
  document.getElementById("kalkulator_2x2").style.display = "none";
  document.getElementById("kalkulator_3x3").style.display = "block";
}

// Fungsi untuk menampilkan kalkulator 2x2 dan menyembunyikan kalkulator 3x3
function showCalculator2x2() {
  document.getElementById("kalkulator_3x3").style.display = "none";
  document.getElementById("kalkulator_2x2").style.display = "block";
}

// Fungsi untuk menghitung determinan matriks 3x3
function calculateDeterminant3x3() {
  // Ambil nilai dari input
  let a11 = parseFloat(document.getElementById("a11").value);
  let a12 = parseFloat(document.getElementById("a12").value);
  let a13 = parseFloat(document.getElementById("a13").value);
  let a21 = parseFloat(document.getElementById("a21").value);
  let a22 = parseFloat(document.getElementById("a22").value);
  let a23 = parseFloat(document.getElementById("a23").value);
  let a31 = parseFloat(document.getElementById("a31").value);
  let a32 = parseFloat(document.getElementById("a32").value);
  let a33 = parseFloat(document.getElementById("a33").value);

  // Hitung determinan
  let determinant =
    a11 * a22 * a33 +
    a12 * a23 * a31 +
    a13 * a21 * a32 -
    a13 * a22 * a31 -
    a11 * a23 * a32 -
    a12 * a21 * a33;

  // Tampilkan hasil
  document.getElementById("result").innerText = "Determinan: " + determinant;
}

// Toggle Sidebar start
function toggleSidebar() {
  document.querySelector("#sidebar").classList.toggle("left-[-300px]");
}
// Determinan
let calculations_2x2 = [];
let calculations = [];
let historyList = document.getElementById("historyList");

// Function to handle form submission
document
  .getElementById("matrixForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    let matrixValues = [];
    let inputs = document.querySelectorAll("#matrixForm input");
    inputs.forEach(function (input) {
      matrixValues.push(parseFloat(input.value.trim()));
    });
    if (matrixValues.length !== 9 || matrixValues.some(isNaN)) {
      document.getElementById("result").innerText =
        "Masukkan sepenuhnya matriks yang valid.";
      document.getElementById("explanation").innerText = "";
      return;
    }
    let determinant = calculateDeterminant(matrixValues);
    document.getElementById(
      "result"
    ).innerHTML = `<span style="font-size: larger;">Determinan = ${determinant}</span>`;

    document.getElementById(
      "explanation"
    ).innerHTML = `<p><strong>Cara Mengerjakan:</strong> Untuk menghitung determinan matriks 3x3, gunakan rumus berikut:</p> +
          <p>det(A) = a11 * (a22 * a33 - a23 * a32) - a12 * (a21 * a33 - a23 * a31) + a13 * (a21 * a32 - a22 * a31)</p>`;
    // Add calculation to history
    let historyItem = matrixValues.join(", ") + " = " + determinant;
    calculations.push(historyItem);
    renderHistory();
  });

// Function to handle clearing form inputs
document.getElementById("clearInputs").addEventListener("click", function () {
  let inputs = document.querySelectorAll("#matrixForm input");
  inputs.forEach(function (input) {
    input.value = "";
  });
});

// Function to calculate determinant
function calculateDeterminant(matrix) {
  let a11 = matrix[0],
    a12 = matrix[1],
    a13 = matrix[2];
  let a21 = matrix[3],
    a22 = matrix[4],
    a23 = matrix[5];
  let a31 = matrix[6],
    a32 = matrix[7],
    a33 = matrix[8];
  return (
    a11 * (a22 * a33 - a23 * a32) -
    a12 * (a21 * a33 - a23 * a31) +
    a13 * (a21 * a32 - a22 * a31)
  );
}

// Function to render history
function renderHistory() {
  historyList.innerHTML = "";
  calculations.forEach(function (calculation) {
    let listItem = document.createElement("li");
    listItem.textContent = calculation;
    listItem.classList.add(
      "cursor-pointer",
      "hover:bg-gray-100",
      "p-1",
      "rounded"
    );
    historyList.appendChild(listItem);
    // Add click event listener to each history item
    listItem.addEventListener("click", function () {
      let values = this.textContent.split("=")[0].split(",");
      document
        .querySelectorAll("#matrixForm input")
        .forEach(function (input, index) {
          input.value = parseFloat(values[index].trim());
        });
    });
  });
}
// ordo 2x2

document
  .getElementById("hitungDeterminan_2x2")
  .addEventListener("click", function () {
    let a11 = parseFloat(document.getElementById("a11_2x2").value.trim());
    let a12 = parseFloat(document.getElementById("a12_2x2").value.trim());
    let a21 = parseFloat(document.getElementById("a21_2x2").value.trim());
    let a22 = parseFloat(document.getElementById("a22_2x2").value.trim());

    if (isNaN(a11) || isNaN(a12) || isNaN(a21) || isNaN(a22)) {
      document.getElementById("result_2x2").innerText =
        "Masukkan sepenuhnya matriks yang valid.";
      return;
    }

    let determinant = calculateDeterminant_2x2(a11, a12, a21, a22);
    document.getElementById("result_2x2").innerText =
      "Determinan = " + determinant;

    // Explanation
    document.getElementById("explanation_2x2").innerHTML =
      "<p><strong>Cara Mengerjakan:</strong> Untuk menghitung determinan matriks 2x2, gunakan rumus berikut:</p>" +
      "<p>det(A) = (a11 * a22) - (a12 * a21)</p>";

    // Add to history
    let historyItem = [a11, a12, a21, a22].join(", ") + " = " + determinant;
    calculations_2x2.push(historyItem);
    renderHistory_2x2();
  });

function calculateDeterminant_2x2(a11, a12, a21, a22) {
  return a11 * a22 - a12 * a21;
}

function renderHistory_2x2() {
  let historyList_2x2 = document.getElementById("historyList_2x2");
  historyList_2x2.innerHTML = "";
  calculations_2x2.forEach(function (calculation) {
    let listItem = document.createElement("li");
    listItem.textContent = calculation;
    listItem.classList.add(
      "cursor-pointer",
      "hover:bg-gray-100",
      "p-1",
      "rounded"
    );
    listItem.addEventListener("click", function () {
      let values = calculation.split("=")[0].split(",");
      document.getElementById("a11_2x2").value = parseFloat(values[0].trim());
      document.getElementById("a12_2x2").value = parseFloat(values[1].trim());
      document.getElementById("a21_2x2").value = parseFloat(values[2].trim());
      document.getElementById("a22_2x2").value = parseFloat(values[3].trim());
    });
    historyList_2x2.appendChild(listItem);
  });
}

// refresh 2x2
document
  .getElementById("clearInputs_2x2")
  .addEventListener("click", function () {
    let inputs = document.querySelectorAll("#matrixForm_2x2 input");
    inputs.forEach(function (input) {
      input.value = "";
    });
  });

document.querySelectorAll("#matrixForm input").forEach(function (input) {
  input.addEventListener("keydown", function (event) {
    let key = event.key;
    let index = Array.prototype.indexOf.call(
      input.parentElement.children,
      input
    );
    let nextIndex = -1;
    if (key === "ArrowUp") {
      nextIndex = index - 3;
    } else if (key === "ArrowDown") {
      nextIndex = index + 3;
    } else if (key === "ArrowLeft") {
      nextIndex = index - 1;
    } else if (key === "ArrowRight") {
      nextIndex = index + 1;
    }
    if (nextIndex >= 0 && nextIndex < 9) {
      event.preventDefault();
      input.parentElement.children[nextIndex].focus();
    }
  });
});
document.querySelectorAll("#matrixForm_2x2 input").forEach(function (input) {
  input.addEventListener("keydown", function (event) {
    let key = event.key;
    let index = Array.prototype.indexOf.call(
      input.parentElement.children,
      input
    );
    let nextIndex = -1;
    if (key === "ArrowUp") {
      nextIndex = index - 2;
    } else if (key === "ArrowDown") {
      nextIndex = index + 2;
    } else if (key === "ArrowLeft") {
      nextIndex = index - 1;
    } else if (key === "ArrowRight") {
      nextIndex = index + 1;
    }
    if (nextIndex >= 0 && nextIndex < 4) {
      event.preventDefault();
      input.parentElement.children[nextIndex].focus();
    }
  });
});

 document.getElementById("selectOrder").addEventListener("change", function () {
   var order = this.value;
   if (order === "3x3") {
     document.getElementById("matrix3x3").style.display = "block";
     document.getElementById("matrix2x2").style.display = "none";
   } else if (order === "2x2") {
     document.getElementById("matrix3x3").style.display = "none";
     document.getElementById("matrix2x2").style.display = "block";
   }
 });

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
// Add event listener to toggle info popup
document.getElementById("infoButton").addEventListener("click", toggleInfoPopup);

// Add event listener to close info popup when clicking outside
document.addEventListener("click", closeInfoPopup);
