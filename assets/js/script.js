function calculateCredit() {
  let quarters = parseInt(document.getElementById("quarters").value);
  let rent = parseInt(document.getElementById("rent").value);
  let instrumentValue = parseInt(
    document.getElementById("instrumentValue").value
  );
  let count = 0;
  let credit = 0;
  let remainingBalance = instrumentValue;
  let arr = [];
  let outputDiv = document.getElementById("output");
  outputDiv.innerHTML = ""; // Clear previous output
  let startDate = document.getElementById("startDate").value;
  // let quarterStart = new Date(startDate).toLocaleDateString("en-US");
  let date = new Date(startDate);
  let offset = -60000 * date.getTimezoneOffset();
  let epoch = +date - offset;
  let quarterStart = new Date(epoch).toLocaleDateString("en-US");
  // console.log(startDate);
  for (let i = 1; i <= quarters; i++) {
    if (i < 5) {
      credit += rent * 1;
      remainingBalance = instrumentValue - credit;
      count++;
    } else if (i < 9) {
      credit += rent * 0.8;
      remainingBalance = instrumentValue - credit;
      count++;
    } else {
      credit += rent * 0.6;
      remainingBalance = instrumentValue - credit;
      count++;
    }

    // console.log(quarterStart);
    solution = [
      count,
      quarterStart,
      credit.toFixed(2),
      remainingBalance.toFixed(2),
    ];
    arr.push(solution);
    quarterStart = getQuarterStart(quarterStart);
  }
  // outputDiv.innerHTML += arr.join("<br>") + "<br>";
  let copy = arr.slice();
  trimArr(copy);
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

function trimArr(arr) {
  let outputDiv = document.getElementById("output");
  outputDiv.innerHTML +=
    "Payoff Schedule:<br>Payment #, Payment Date, Credit Accrued, Amount left to payoff<br>";
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i][3] < 0) {
      arr.splice(i, 1);
    }
  }
  outputDiv.innerHTML += arr.join("<br>") + "<br>";
}
