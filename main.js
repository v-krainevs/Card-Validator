// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:

// Checks if a card is valid, returns true if yes
const validateCred = (arr) => {
  // Starting from the farthest digit to the right, iterate to the left.
  let arrayCopy = [...arr];
  for (let i = arrayCopy.length - 2; i >= 0; i -= 2) {
    // Every second digit is doubled
    arrayCopy[i] *= 2;

    // If the number is greater than 9 after doubling, subtract 9 from its value
    if (arrayCopy[i] > 9) {
      arrayCopy[i] -= 9;
    }
  }

  // Sum up all the digits in the credit card number save them to a sum variable
  let sum = arrayCopy.reduce((result, currentValue) => result + currentValue);

  // Return true if the sum modulo 10 is 0
  if (sum % 10 === 0) {
    return true;
  } else {
    return false;
  }
};

// Test functions:
console.log(validateCred(valid1)); // Should print true
console.log(validateCred(invalid1)); // Should print false

// Checks through the nested array(array with all card numbers arrays) for which numbers are invalid, returns nested array with all invalid card numbers
const findInvalidCards = (nestedArray) => {
  // This will store all arrays with invalid card numbers
  let invalidCardsArray = [];

  // Iterate through provided nested array
  nestedArray.forEach((element) => {
    // On every iteration trueFalse varibale is assigned with a new validateCred function call.
    let trueFalse = validateCred(element);

    // If trueFalse is true, the array provided into validateCred is pushed into invalidCardsArray
    if (trueFalse === false) {
      invalidCardsArray.push(element);
    }
  });
  return invalidCardsArray;
};

// Test function
console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5])); // Shouldn't print anything
console.log(
  findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])
);
console.log(findInvalidCards(batch)); // Test what the mystery numbers are

// Should print all of the numbers

// Should return an array of companies that have issued cards with invalid numbers
const idInvalidCardCompanies = (array) => {
  let faultyIssuers = [];
  invalidCardsArray = findInvalidCards(array);
  amex = invalidCardsArray.some((element) => element[0] === 3);
  visa = invalidCardsArray.some((element) => element[0] === 4);
  mastercard = invalidCardsArray.some((element) => element[0] === 5);
  discover = invalidCardsArray.some((element) => element[0] === 6);
  notFound = invalidCardsArray.indexOf(
    (element) =>
      element[0] !== 3 ||
      element[0] !== 4 ||
      element[0] !== 5 ||
      element[0] !== 6
  );
  console.log(notFound);
  if (amex) {
    faultyIssuers.push("Amex (American Express)");
  }
  if (visa) {
    faultyIssuers.push("Visa");
  }
  if (mastercard) {
    faultyIssuers.push("Mastercard");
  }
  if (discover) {
    faultyIssuers.push("Discover");
  }
  if (notFound) {
    faultyIssuers.push("Company not found");
  }
  return faultyIssuers;
};

console.log(idInvalidCardCompanies(batch));
