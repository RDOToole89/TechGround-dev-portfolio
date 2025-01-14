// Creates a DOM element and mounts it adding classname, text and if passed a clickHandler.
export const createElement = (
  element,
  className,
  text,
  clickHandler = null,
  dataAttributeArray = null
) => {
  const newElement = document.createElement(element);

  if (typeof className === 'string') {
    newElement.classList.add(className);
  }

  if (Array.isArray(className)) {
    className.forEach((name) => newElement.classList.add(name));
  }

  if (text) newElement.textContent = text;

  if (dataAttributeArray) {
    const [dataName, dataAttribute] = dataAttributeArray;

    newElement.dataset[dataName] = dataAttribute;
  }

  if (clickHandler) newElement.onclick = clickHandler;

  return newElement;
};

// Removes classes from childrenNodes nested in in Parent(DOM)Nodes.
// Very inefficient function refactor ?! triple nested loop.
export const removeClassesChildrenNodes = (elements, classNameArray) => {
  elements.forEach((element) => {
    if (classNameArray.length === 1 && typeof classNameArray[0] === 'string') {
      element.classList.remove(classNameArray[0]);
    }

    if (Array.isArray(classNameArray)) {
      classNameArray.forEach((className) => {
        element.childNodes.forEach((child) => {
          child.classList.remove(className);
        });
      });
    }
  });
};

// Mount elements to a parent element.
export const mountElements = (elements, parentElement) => {
  [...elements].forEach((element) => {
    parentElement.appendChild(element);
  });
};

// Function taken from stackoverflow to convert numbers to words.
export const createStringFromNumber = (n) => {
  let word = [];
  let numbers = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    t3: 'thir',
    t5: 'fif',
    t8: 'eigh',
    20: 'twenty',
  };
  let hundreds = 0 | ((n % 1000) / 100);
  let tens = 0 | ((n % 100) / 10);
  let ones = n % 10;
  let part;

  if (n === 0) {
    return 'Zero';
  }

  if (hundreds) {
    word.push(numbers[hundreds] + ' hundred');
  }

  if (tens === 0) {
    word.push(numbers[ones]);
  } else if (tens === 1) {
    word.push(numbers['1' + ones] || (numbers['t' + ones] || numbers[ones]) + 'teen');
  } else {
    part = numbers[tens + '0'] || (numbers['t' + tens] || numbers[tens]) + 'ty';
    word.push(numbers[ones] ? part + '-' + numbers[ones] : part);
  }

  return word.join(' ');
};

// Creates an array with word 'string' numbers.
export const createStringNumbersArray = (n) => {
  const stringNumbersArray = [];

  for (let i = 0; i <= n; i++) {
    stringNumbersArray.push(createStringFromNumber(i));
  }
  return stringNumbersArray;
};

// Creates a random number
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Takes in a string operator and returns a function to calculate two variables.
export const stringToOperator = {
  '+'(a, b) {
    return a + b;
  },
  '-'(a, b) {
    return a - b;
  },
  '*'(a, b) {
    return a * b;
  },
};

// Checks if there are no duplicates in an array and returns a boolean.
export const hasDuplicates = (array) => {
  const noDuplicates = new Set(array);

  return array.length !== noDuplicates.size;
};

export const popRandom = (array) => {
  let i = (Math.random() * array.length) | 0;
  return array.splice(i, 1)[0];
};
