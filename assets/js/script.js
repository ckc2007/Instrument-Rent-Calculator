// I want to pick a start date, I want to know what is every quarter from this start date?
// the first rent payment is made on the first day
// every payment is made on the first day of the next quarter
// the rent is always the same amount
// credit is only accrued at the time of payment (the first day of each quarter)
// credit is not accrued on a rolling basis. it is only a percentage of each rent payment
// in a year, there are only four rent payments that are all of the same amount
// credit is accrued four times in a year and on the day the rent payment is made
// in the first year, the credit accrued is 100% of the rent payments
// in the second year, the crecit accrued is 80% of the rent payments
// in the third year and beyond, the credit accrued is 60% of the rent payments
// given the value of an instrument and the amount of rent charged quarterly,
// I want to know when I will have paid up to, but not over, the value of the instrument
// I want to know the remaining balance at that point (at the time of the final rent payment), and I want to know the date of the final rent payment that will take my credit up to but not exceed the value of the instrument
// I want to be able to enter the start date (the date of the first rent payment which is also the same day as my first credit accrual)
// I want to be able to enter the rent amount I pay each quarter
// I want to be able to enter the value of the instrument
// I want to see my rent credit up to todays date based on a chosen start date
// I want to see the projected date of my final rent payemnt that will take my credit up to but not over the instrument value
// I want to see the remaining balance as of the final rent payment date
//  I want this in html and javascript codetr

// example
// quarters = 15, rent = 100, instrumentValue = 1000

// let arr = [];

// function calculateCredit(quarters, rent, instrumentValue) {
//   let count = 0;
//   let credit = 0;
//   let remainingBalance = instrumentValue;
//   for (let i = 1; i < quarters; i++) {
//     if (i < 5) {
//       credit += rent * 1;
//       remainingBalance = instrumentValue - credit;
//       count++;
//       // console.log(credit);
//       // console.log(remainingBalance);
//     } else if (i < 9) {
//       credit += rent * 0.8;
//       remainingBalance = instrumentValue - credit;
//       count++;
//       // console.log(credit);
//       // console.log(remainingBalance);
//     } else {
//       credit += rent * 0.6;
//       remainingBalance = instrumentValue - credit;
//       count++;
//       // console.log(credit);
//       // console.log(remainingBalance);
//     }
//     solution = [count, credit, remainingBalance];
//     arr.push(solution);
//     console.log(solution);
//   }
//   console.log(arr);
// }

// function trimArr(arr) {
//   for (let item of arr) {
//     if (item[2] < 0) {
//       arr.splice(arr.indexOf(item), 1);
//     }
//   }
//   console.log(arr);
// }

// calculateCredit(15, 100, 1000);

// let copy = arr.slice("");

// trimArr(copy);

// function addQuarters(startDate, numQuarters) {
//   // Calculate the number of months in a quarter (3 months per quarter)
//   const monthsPerQuarter = 3;

//   // Calculate the number of months to add based on the number of quarters
//   const monthsToAdd = numQuarters * monthsPerQuarter;

//   // Clone the start date so we don't modify the original
//   const endDate = new Date(startDate.getTime());

//   // Add the number of months to the cloned start date
//   endDate.setMonth(endDate.getMonth() + monthsToAdd);

//   // Return the new date
//   return endDate;
// }

const startDate = new Date(2022, 0, 1); // January 1, 2022
const numQuarters = 4; // 4 quarters

const endDate = addQuarters(startDate, numQuarters);

console.log(endDate); // Output: Tue Oct 01 2023 00:00:00 GMT+0000 (Coordinated Universal Time)

let arr = [];

function calculateCredit(quarters, rent, instrumentValue) {
  let count = 0;
  let credit = 0;
  let remainingBalance = instrumentValue;
  for (let i = 1; i < quarters; i++) {
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
    solution = [count, credit, remainingBalance];
    arr.push(solution);
    console.log(solution);
  }
  console.log(arr);
}

function trimArr(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i][2] < 0) {
      arr.splice(i, 1);
    }
  }
  console.log(arr);
}

calculateCredit(15, 100, 1000);

let copy = arr.slice();

trimArr(copy);
