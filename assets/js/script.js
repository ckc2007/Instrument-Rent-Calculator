const copyButton = document.getElementById("copy-button");
let outputDiv = document.getElementById("output");

function calculateCredit() {
  let quarters = parseInt(document.getElementById("quarters").value);
  let rent = parseFloat(
    document.querySelector('input[name="instrument"]:checked').value
  );
  let instrumentValue = parseFloat(
    document.getElementById("instrumentValue").value
  );
  let count = 0;
  let credit = 0.0;
  let remainingBalance = instrumentValue * 1.0;
  let arr = [];

  outputDiv.innerHTML = ""; // Clear previous output
  let startDate = document.getElementById("startDate").value;
  let date = new Date(startDate);
  let offset = -60000 * date.getTimezoneOffset();
  let epoch = +date - offset;
  let quarterStart = new Date(epoch).toLocaleDateString("en-US");

  // Adjust starting credit based on checkbox and instrument selection
  let rentBeforeMay = document.getElementById("rentBeforeMay").checked;
  let selectedInstrument = document.querySelector(
    'input[name="instrument"]:checked'
  ).id;
  let startingCredit = 0;

  if (rentBeforeMay) {
    if (selectedInstrument === "violin") {
      startingCredit = -27;
    } else if (selectedInstrument === "viola") {
      startingCredit = -15;
    } else if (selectedInstrument === "cello") {
      startingCredit = -24;
    } else if (selectedInstrument === "bass") {
      startingCredit = -24;
    }
  }

  // Apply starting credit
  credit += startingCredit;
  remainingBalance = instrumentValue - credit;

  // Create an empty HTML table
  let table = document.createElement("table");

  // Create a header row and add it to the table
  let headerRow = table.insertRow();
  let headerCells = [
    "Payment #",
    "Payment Date",
    "Credit Accrued",
    "Amount Left to Payoff",
  ];
  for (let i = 0; i < headerCells.length; i++) {
    let cell = headerRow.insertCell();
    cell.textContent = headerCells[i];
  }

  // Populate the table rows with data

  for (let i = 1; i <= quarters; i++) {
    if (i < 5) {
      credit += rent * 1;
      remainingBalance = instrumentValue - credit;
    } else if (i < 9) {
      credit += rent * 0.8;
      remainingBalance = instrumentValue - credit;
    } else {
      credit += rent * 0.6;
      remainingBalance = instrumentValue - credit;
    }
    if (remainingBalance >= 0) {
      solution = [
        count + 1, // Increment count after assigning the value
        quarterStart,
        credit.toFixed(2), // Convert to floating-point with two decimal places
        remainingBalance.toFixed(2), // Convert to floating-point with two decimal places
      ];
      count++;
      arr.push(solution);
      quarterStart = getQuarterStart(quarterStart);

      // Create a new row and add it to the table
      let row = table.insertRow();
      let cells = solution;
      for (let j = 0; j < cells.length; j++) {
        let cell = row.insertCell();
        // Use Number.prototype.toFixed() to display numbers with two decimal places
        cell.textContent = Number(cells[j]).toFixed(2);
      }
    }
  }

  // Insert the table into the output container
  outputDiv.innerHTML = "";
  outputDiv.appendChild(table);
}

function getNumDaysInQuarterByDate(date) {
  let currentMonth = date.getMonth();
  let numDaysInQuarter;
  if (currentMonth >= 0 && currentMonth <= 2) {
    const startYear = date.getFullYear();
    const isLeapYear =
      (startYear % 4 == 0 && startYear % 100 != 0) || startYear % 400 == 0;
    numDaysInQuarter = isLeapYear ? 91 : 90;
  } else if (currentMonth >= 3 && currentMonth <= 5) {
    numDaysInQuarter = 91;
  } else {
    numDaysInQuarter = 92;
  }
  console.log(currentMonth);
  console.log(numDaysInQuarter);
  return numDaysInQuarter;
}

function getQuarterStart(startDate) {
  let date = new Date(startDate);
  let offset = -60000 * date.getTimezoneOffset();
  let epoch = +date - offset;
  let offsetDate = new Date(epoch);
  // <!-- getNumDaysInQuarterByDate() - because each quarter has a different number of days -->
  let numDaysInQuarter = getNumDaysInQuarterByDate(offsetDate);
  let numMillisecondsInQuarter = numDaysInQuarter * 24 * 60 * 60 * 1000;
  let newEpoch = epoch + numMillisecondsInQuarter;
  let newDate = new Date(newEpoch);

  return newDate.toLocaleDateString("en-US");
}

// Calculator functionality
function addToInput(value) {
  const inputElement = document.getElementById("calculator-input");
  inputElement.value += value;
}

function clearInput() {
  const inputElement = document.getElementById("calculator-input");
  inputElement.value = "";
}

function calculate() {
  const inputElement = document.getElementById("calculator-input");
  let result = eval(inputElement.value);
  // Round the result to two decimal places
  result = Math.round(result * 100) / 100;
  inputElement.value = result;
}

function addToInput(value) {
  const inputElement = document.getElementById("calculator-input");
  inputElement.value += value;
}

copyButton.addEventListener("click", () => {
  const textToCopy = outputDiv.innerText.trim();

  // Replace table delimiters with commas
  // const textWithCommas = textToCopy.replace(/\t/g, ', ').replace(/\n/g, '; ');
  const textWithCommasAndRows = textToCopy
    .replace(/\t/g, ", ")
    .replace(/\n/g, ",\n");

  navigator.clipboard
    .writeText(textWithCommasAndRows)
    .then(() => {
      console.log(`Copied ${textToCopy} to clipboard`);
    })
    .catch((err) => {
      console.error(`Error copying to clipboard: ${err}`);
    });
});
