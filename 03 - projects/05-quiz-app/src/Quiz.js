import { createElement, createNumbersArray, mountElements } from './helper.js';

export class Quiz {
  constructor(target, questionObject, questionCount) {
    this.quiz = this.createQuiz();
    this.questionObject = questionObject;
    this.target = target;
    this.imageNumber = 1;
    this.questionCount = questionCount;
  }

  createQuiz(questionCount = this.questionCount) {
    const activeQuiz = document.querySelector('.quiz-container');
    if (activeQuiz) return;

    // Parent Element
    const newQuiz = createElement('div', 'quiz-container');

    // Child element of the newQuiz
    const quizTop = createElement('div', 'quiz-top');

    // Child elements of quizTop
    const quizHeading = createElement('h1', 'quiz-top__heading', 'Math Problem');
    const quizCount = createElement('p', 'quiz-top__count', '1 / 6');
    const quizDisplay = createElement('p', 'quiz-top__display');

    // Mounts child elements of quiztop to quiz-top container
    mountElements([quizHeading, quizCount, quizDisplay], quizTop);

    // Create question container
    const quizQuestionContainer = createElement('div', 'quiz-question__container');

    // Holds questions to be mounted to the quiz question container
    const quizQuestions = [];

    // Array to add the correct className to the question element
    const numbers = createNumbersArray(questionCount);

    // Loops over the numbers array and creates a question element

    for (let i = 1; i < numbers.length; i++) {
      // creates a question and adds the correct classes
      const question = createElement('div', ['quiz-question', `quiz-question__${numbers[i]}`]);

      const questionNumber = createElement('div', 'quiz-question__number', i);
      const questionAnswer = createElement('p', 'quiz-question__answer');
      this.isCorrect(questionAnswer);

      // Depending on if i is even or not it will be mounted in a different direction
      if (i % 2 === 0) {
        mountElements([questionAnswer, questionNumber], question);
        quizQuestions.push(question);
      }

      if (i % 2 !== 0) {
        mountElements([questionNumber, questionAnswer], question);
        quizQuestions.push(question);
      }
    }

    // Create controls

    const controls = createElement('div', 'controls');
    const buttonNext = createElement(
      'button',
      ['controls__btn', 'controls__btn--previous', 'btn'],
      'previous'
    );
    this.controls(buttonNext, 'backward');

    const buttonPrevious = createElement(
      'button',
      ['controls__btn', 'controls__btn--next', 'btn'],
      'next'
    );
    this.controls(buttonPrevious, 'forward');

    mountElements([buttonNext, buttonPrevious], controls);
    mountElements([...quizQuestions], quizQuestionContainer);
    mountElements([quizTop, quizQuestionContainer], newQuiz);

    this.target?.appendChild(newQuiz);
    this.target?.appendChild(controls);

    return newQuiz;
  }

  controls(buttonElement, direction) {
    switch (direction) {
      case 'forward': {
        buttonElement.addEventListener('click', () => {
          if (this.imageNumber === this.questionCount + 1) return;
          this.imageNumber++;
          console.log(this.imageNumber);
        });
        break;
      }

      case 'backward': {
        buttonElement.addEventListener('click', () => {
          if (this.imageNumber === 1) return;
          this.imageNumber--;
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  isCorrect(element) {
    element.addEventListener('click', () => {
      const answer = Number(element.textContent);

      if (this.questionObject) {
        const questionObject = this.questionObject;

        const correctAnswer = questionObject[0].correctAnswer;
        const questionsOnPage = document?.querySelectorAll('.quiz-question');

        if (answer === correctAnswer) {
          questionsOnPage.forEach((question) => (question.style.pointerEvents = 'none'));

          element.classList.add('correct');
          return;
        } else {
          element.classList.add('incorrect');
          questionsOnPage.forEach((question, i) => {
            const findAnswerNode = [...question.children].find((node) =>
              node.classList.contains('quiz-question__answer')
            );

            const foundAnswer = Number(findAnswerNode.textContent);

            if (correctAnswer === foundAnswer) {
              findAnswerNode.classList.add('correct');
            }

            question.style.pointerEvents = 'none';
          });
          return;
        }
      }
    });
  }
}
