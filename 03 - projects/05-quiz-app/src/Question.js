import { getRandomNumber, stringToOperator } from './helper.js';

export class MathQuestion {
  constructor(numberOfQuestions) {
    this.numberOfQuestions = numberOfQuestions;
  }

  createMathQuestion(maxBound, numberOfQuestions = this.numberOfQuestions) {
    const operators = ['-', '+', '*'];

    const questionArray = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      const numberOne = getRandomNumber(0, maxBound);
      const numberTwo = getRandomNumber(0, maxBound);
      const randomOperator = operators[getRandomNumber(0, operators.length)];
      let correctAnswerCalc = stringToOperator[randomOperator](numberOne, numberTwo);

      const mathQuestionObject = {
        number: i + 1,
        question: `${numberOne} ${randomOperator} ${numberTwo}`,
        correctAnswer: correctAnswerCalc,
        possibleAnswers: this.createPossibleAnswers(
          randomOperator,
          correctAnswerCalc,
          numberOfQuestions
        ),
      };

      questionArray.push(mathQuestionObject);
    }

    console.log(questionArray);

    return questionArray;
  }

  createPossibleAnswers(randomOperator, correctAnswer, numberOfQuestions) {
    let possibleAnswers = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      switch (randomOperator) {
        case '-': {
          const randomNumber = getRandomNumber(
            correctAnswer - getRandomNumber(1, 20),
            correctAnswer + getRandomNumber(1, 20)
          );
          possibleAnswers.push(randomNumber);
          break;
        }
        case '+': {
          const randomNumber = getRandomNumber(
            correctAnswer - getRandomNumber(1, 20),
            correctAnswer + getRandomNumber(1, 20)
          );
          possibleAnswers.push(randomNumber);
          break;
        }
        case '*': {
          const randomNumber = getRandomNumber(
            correctAnswer - getRandomNumber(1, 20),
            correctAnswer + getRandomNumber(1, 20)
          );
          possibleAnswers.push(randomNumber);
          break;
        }
        default: {
          break;
        }
      }
    }

    // Creates an array of unique values by transforming it to a set and
    // then reverting it back to an array
    possibleAnswers = new Set([...possibleAnswers]);
    possibleAnswers = [...possibleAnswers];

    // Checks the length
    if (possibleAnswers.length < numberOfQuestions) {
      const difference = numberOfQuestions - possibleAnswers.length;

      for (let i = 0; i < difference; i++) {
        console.log('I IN LOOP', i);

        let randomNumber = getRandomNumber(correctAnswer, getRandomNumber(1, 20));

        if (possibleAnswers.includes(randomNumber)) {
          randomNumber = getRandomNumber(1, 20);
        }

        possibleAnswers.push(randomNumber);
      }
    }

    // Inserts correct answer in possible answers array
    possibleAnswers[getRandomNumber(0, possibleAnswers.length - 1)] = correctAnswer;

    return possibleAnswers;
  }
}
