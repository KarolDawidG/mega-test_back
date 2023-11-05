const numberOfQuestions = 2;

const generateRandomNumbers = (rows) => {
  const numbers = [];
  while (numbers.length < numberOfQuestions) {
    const randomNumber = Math.floor(Math.random() * rows) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};

const randomizeData = (rows) => {
  const arrayRandomRows = [];

  const randomNumbersArray = generateRandomNumbers(rows.length);

  for (const index of randomNumbersArray) {
    arrayRandomRows.push(rows[index]);
  }

  return arrayRandomRows;
};

module.exports = { randomizeData };
