// https://edabit.com
/////////////////////////////////////////////////////////////////////////////////////// ZADANIA //////////////////////////////////////////////////////////////////////////////////////////
    
////////////////////////// Zadanie "Data Structures: Find Max of Sliding Window /////////////////////////
function windowMaxes(array, windowLength) {
  const finalArray = [];
  for (let i = 0; i <= array.length - windowLength; i++) {
    finalArray.push(Math.max(...array.slice(i, windowLength + i)));
  }
  return finalArray;
}

console.log(windowMaxes([4, 5, 6, 7, 8, 9], 2));
console.log(windowMaxes([1, 2, 3, 4, 3, 2, 1, 2, 5], 4));
console.log(windowMaxes([1, 2, 3, 4, 3, 2, 1, 2, 5], 3));
console.log(windowMaxes([1, 2, 3, 4, 3, 2, 1, 2, 5], 5));
console.log(
  windowMaxes([1, 4, -2, -9, 5, 32, -89, 23, 43, 2, 75, 3, 12, -3], 6)
);



///////////////////////////////// Kod z zadania z pierwiastkami ///////////////////////////////////////////
const squares = function (firstVal, lastVal) {
  let counter = 0;
  let firstSquare;
  for (let el = firstVal; el <= lastVal; el++) {
    let squareOfElement = Math.sqrt(el);
    if (Number.isInteger(squareOfElement)) {
      firstSquare = squareOfElement;
      counter++;
      break;
    }
  }
  if (!firstSquare) return counter;


  for (let el = firstSquare + 1; ; el++) {
    if (el * el <= lastVal) {
      counter++;
      continue;
    }
    break;
  }

  return counter;
};

//////////////////////////////////////// Zadanie z robotem ///////////////////////////////////
const trackRobot = (...args) => {
  const directions = ['N', 'E', 'S', 'W'];
  let coordinates = [0, 0];

  // if (!args.reduce((prev, cur) => prev + cur)) return 'No movement'

  for (let i = 0; i < directions.length; i++) {
    if (args.length > 0) {
      if (i === 0) {
        coordinates[1] += args[0];
        args.shift();
        if (args.length) continue;
      }

      if (i === 1) {
        coordinates[0] += args[0];
        args.shift();
        if (args.length) continue;
      }

      if (i === 2) {
        coordinates[1] -= args[0];
        args.shift();
        if (args.length) continue;
      }

      if (i === 3) {
        coordinates[0] -= args[0];
        args.shift();
        i = -1;
        if (args.length) continue;
      }
    }
    break;
  }

  return coordinates;
};

/////////////////////////////////////// Zadanie z setem kart /////////////////////////////////////////////////
function isSet(arr) {
  // if (arr.length !== 3) throw new Error('There need to be 3 cards')

  // 1. Possible values
  const colors = ['red', 'purple', 'green'];
  const numbers = [1, 2, 3];
  const shades = ['empty', 'lined', 'full'];
  const shapes = ['squiggle', 'oval', 'diamond'];

  arr.forEach((card) => {
    // 1. Check if there are 4 properties.
    if (
      !card.hasOwnProperty('color') ||
      !card.hasOwnProperty('number') ||
      !card.hasOwnProperty('shade') ||
      !card.hasOwnProperty('shape')
    ) {
      throw new Error('Cards must have 4 properties.');
    }

    // 2. Check if cards have only permissible values.
    if (!colors.some((color) => color === card.color))
      throw new Error('Color must be red, purple or green.');
    if (!numbers.some((number) => number === card.number))
      throw new Error('Number must be 1, 2 or 3.');
    if (!shades.some((shade) => shade === card.shade))
      throw new Error('Shades must be empty, lined or full.');
    if (!shapes.some((shape) => shape === card.shape))
      throw new Error('Shapes must be squiggle, oval or diamond.');
  });

  // Alternatywne rozwiązanie, każdy array tworzony osobno, trochę czyściej, ale łatwiej. Sam nie wiem czy lepsze map każdego property czy reduce i nowy obiekt.
  //const colorsArr = arr.map(el => el.color)

  const newObj = arr.reduce((acc, cur) => {
    const keys = Object.keys(cur);
    keys.forEach((el) => {
      if (!acc[el]) acc[el] = [cur[el]];
      else acc[el].push(cur[el]);
    });
    return acc;
  }, {});

  for (let el in newObj) {
    if (newObj[el][0] === newObj[el][1]) {
      if (newObj[el][0] !== newObj[el][2]) {
        return false;
      }
    }

    if (newObj[el][0] !== newObj[el][1]) {
      if (newObj[el][0] === newObj[el][2] || newObj[el][1] === newObj[el][2]) {
        return false;
      }
    }
  }
  return true;
}

const res = isSet([
  { color: 'red', number: 1, shade: 'lined', shape: 'squiggle' },
  { color: 'red', number: 1, shade: 'lined', shape: 'diamond' },
  { color: 'red', number: 1, shade: 'lined', shape: 'squiggle' },
]);

/////////////////// Zadanie z additivePersistence i multiplicativePersistence ////////////////////////////////////////////

function additivePersistence(num) {
  let numArr = num.toString().split('').map(Number);
  if (numArr.length === 1) return 0;

  let res = 0;
  for (let i = 1; numArr.length > 1; i++) {
    numArr = numArr
      .reduce((acc, cur) => acc + cur)
      .toString()
      .split('')
      .map(Number);
    res = i;
  }
  return res;
}

function multiplicativePersistence(num) {
  let numArr = num.toString().split('').map(Number);
  if (numArr.length === 1) return 0;

  let res = 0;
  for (let i = 1; numArr.length > 1; i++) {
    numArr = numArr
      .reduce((acc, cur) => acc * cur)
      .toString()
      .split('')
      .map(Number);
    res = i;
  }
  return res;
}

console.log(additivePersistence(123456));
console.log(multiplicativePersistence(77));

///////////////////////  Periodic  ////////////////////////////////////
function periodic(numStr) {
  const resultsArr = [numStr];

  for (let i = 1; ; i++) {
    const sum = [...resultsArr[resultsArr.length - 1]]
      .map(Number)
      .reduce((prev, cur) => prev + cur)
      .toString();

    const updatedNumStr = `${resultsArr[resultsArr.length - 1]}${sum}`.slice(sum.length);

    if (resultsArr.includes(updatedNumStr)) return i;
    resultsArr.push(updatedNumStr);
  }
}

/////////////////////////////////// Zadanie "The Actual Memory Size of your USB Flash Drive" ///////////////////////////////////////
function actualMemorySize(memorySize) {
  let actualSize = memorySize.match(/[0-9]/g).join('') * 0.93;
  let unit = memorySize.match(/[a-zA-Z]/g).join('');

  if (unit === 'GB' && actualSize < 1) {
    unit = 'MB';
    actualSize = actualSize * 1000
  }

  return unit === 'GB'
    ? `${actualSize.toFixed(2)}${unit}`
    : `${parseInt(actualSize)}${unit}`;
}
console.log(actualMemorySize('1GB'))

///////////////////////////////////////////// Zadanie "Vending Machine" /////////////////////////////////////
const products = [
  { number: 1, price: 100, name: 'Orange juice' },
  { number: 2, price: 200, name: 'Soda' },
  { number: 3, price: 150, name: 'Chocolate snack' },
  { number: 4, price: 250, name: 'Cookies' },
  { number: 5, price: 180, name: 'Gummy bears' },
  { number: 6, price: 500, name: 'Condoms' },
  { number: 7, price: 120, name: 'Crackers' },
  { number: 8, price: 220, name: 'Potato chips' },
  { number: 9, price: 80, name: 'Small snack' }
];

function vendingMachine(products, money, productNumber) {
  const order = products.find(el => el.number === productNumber);

  if (!order) return 'Enter a valid product number';
  if (money < order.price) return 'Not enough money for this product';

  const coins = [500, 200, 100, 50, 20, 10];
  const changeArr = [];
  let change = money - order.price;

  if (change) {
    for (let i = 0; i < coins.length; i++) {
      const gap = change - coins[i];
      if (gap < 0) {
        continue;
      } else if (gap === 0) {
        change = gap;
        changeArr.push(coins[i]);
        break;
      } else {
        change = gap;
        changeArr.push(coins[i]);
        i = -1;
      }
    }
  }

  return { product: `${order.name}`, change: changeArr };
}

///////////////////////////////////// Zadanie z "New Numbers" /////////////////////////////////////////
const isNew = number => {
  const sortedNumArr = [...number.toString()].map(Number).sort();
  
  for (let el = number - 1; el > 0; el--) {
    const newArr = [...el.toString()].map(Number).sort();

    if (sortedNumArr.every((el, i) => el === newArr[i])) {
      return false;
    }
  }

  return true;
};

console.log(isNew(98775675));

////////////////////////////////// Zadanie niearest vowel //////////////////////////////////
const nearestVowel = letter => {
  const vowelArr = 'aeiou'.split('');
  const letterCode = letter.charCodeAt(0);

  const vowelDistances = vowelArr.map((el, i) => {
    return [el, Math.abs(letterCode - el.charCodeAt(0))];
  });
  const sortedVowelDistances = vowelDistances.sort((a, b) => a[1] - b[1]);

  return sortedVowelDistances[0][1] !== sortedVowelDistances[1][1]
    ? sortedVowelDistances[0][0]
    : String.fromCharCode(Math.min(sortedVowelDistances[0][0].charCodeAt(0), sortedVowelDistances[1][0].charCodeAt(0)));
};

////////////////////////////// Zadanie z name validation (Expert) //////////////////////////////////
function initialValidation(string, nameLength) {
  // Check if initial starts with capital letter and if it ends with a dot
  return string === string.toUpperCase() && string.endsWith('.');
}

function termValidation(string) {
  // Check if term starts with capital letter and if it doesn't include a dot
  return string.substring(0, 1) === string.substring(0, 1).toUpperCase() && !string.includes('.');
}

function validName(name) {
  const nameArr = name.split(' ');

  // Return false if name has less than 2 elements
  if (nameArr.length < 2 || nameArr.length > 3) return false;

  // Checks if whole name has 2 elements
  if (nameArr.length === 2) {
    // Checks if first name is an initial
    if (nameArr[0].length < 3) {
      if (!initialValidation(nameArr[0])) return false;
    }
    // Checks if first name is a term
    if (nameArr[0].length > 2) {
      if (!termValidation(nameArr[0])) return false;
    }
  }

  // Checks if whole name has 3 elements
  if (nameArr.length === 3) {
    // Checks if first name is an initial
    if (nameArr[0].length < 3) {
      // If first name is an initial, second name cannot be anything else than initial too
      if (nameArr[1].length > 2) return false;
      if (!initialValidation(nameArr[1])) return false;
    }

    // Checks if first name is a term
    if (nameArr[0].length > 2) {
      if (!termValidation(nameArr[0])) return false;
    }

    // Checks if second name is an initial
    if (nameArr[1].length < 3) {
      if (!initialValidation(nameArr[1])) return false;
    }

    // Checks if second name is a term
    if (nameArr[1].length > 2) {
      if (!termValidation(nameArr[1])) return false;
    }
  }

  // Checks for last name
  if (!termValidation(nameArr[nameArr.length - 1])) return false;

  // Check if last name is more than one letter
  if (nameArr[nameArr.length - 1].length < 2) return false;


  return true;
}


console.log(validName('Marcin B. Karbowniczyn'));

///////////////////////////// Zadanie z bishopem na szachownicy (ekspert) /////////////////////////////////
const bishop = (start, end, moves) => {
  if (start === end) return true;
  if (start !== end && !moves) return fals
  const isFieldColorTheSame = (start[0].charCodeAt() + parseInt(start[1])) % 2 === (end[0].charCodeAt() + parseInt(end[1])) % 2;
  if (!isFieldColorTheSame) return false;
  if (moves >= 2) return tru
  if (Math.abs(start[0].charCodeAt() - end[0].charCodeAt()) === Math.abs(parseInt(start[1]) - parseInt(end[1]))) return tru
  return false;
};

/////////////////////////////// Zadanie z kodem fiskalnym we Włoszech ////////////////////////////////////
const vowels = ['a', 'e', 'i', 'o', 'u'];

const months = { 1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'H', 7: 'L', 8: 'M', 9: 'P', 10: 'R', 11: 'S', 12: 'T' };

class fiscalPerson {
  constructor(name, lastName, gender, dob) {
    this.name = name;
    this.lastName = lastName;
    this.gender = gender;
    this.dob = dob;
  }

  generateFiscalCode() {
    let fiscalCode = [];

    // Take 3 capital letters from last name
    const reversedLastNameArr = this.lastName
      .toLowerCase()
      .split('')
      .reverse();

    for (let i = reversedLastNameArr.length - 1; i >= 0; i--) {
      if (!vowels.includes(reversedLastNameArr[i])) {
        fiscalCode.push(reversedLastNameArr[i].toUpperCase());
        reversedLastNameArr.splice(i, 1);
      }
      if (fiscalCode.length === 3) break;
    }

    if (fiscalCode.length < 3) {
      for (let i = reversedLastNameArr.length - 1; i >= 0; i--) {
        if (vowels.includes(reversedLastNameArr[i])) {
          fiscalCode.push(reversedLastNameArr[i].toUpperCase());
          reversedLastNameArr.splice(i, 1);
        }
        if (fiscalCode.length === 3) break;
      }
      if (!reversedLastNameArr[0]) fiscalCode.push('X');
    }

    // Take 3 capital letters from name
    const consonantsName = [];
    const nameArr = this.name.toLowerCase().split('');
    nameArr.forEach(el => {
      if (!vowels.includes(el)) consonantsName.push(el.toUpperCase());
    });

    if (consonantsName.length > 3) {
      fiscalCode.push(consonantsName[0], consonantsName[2], consonantsName[3]);
    }

    if (consonantsName.length === 3) {
      fiscalCode.push(consonantsName[0], consonantsName[1], consonantsName[2]);
    }

    if (consonantsName.length < 3) {
      consonantsName.forEach(el => fiscalCode.push(el.toUpperCase()));
      for (let el of nameArr) {
        if (vowels.includes(el)) {
          fiscalCode.push(el.toUpperCase());
          if (fiscalCode.length === 6) break;
        }
      }
      if (fiscalCode.length < 6) fiscalCode.push('X');
    }

    // Generate 2 numbers, 1 letter and 2 numbers from date of birth and gender
    const dobGenderCode = [];
    const dateArr = this.dob.split('/');
    dobGenderCode.push(dateArr[2].slice(2), months[dateArr[1]]);

    if (this.gender === 'M') {
      if (parseInt(dateArr[0]) < 10) dobGenderCode.push(`0${dateArr[0]}`);
      else dobGenderCode.push(dateArr[0]);
    } else {
      dobGenderCode.push(`${parseInt(dateArr[0]) + 40}`);
    }

    return fiscalCode.concat(dobGenderCode).join('');
  }
}

const fiscalCode = new fiscalPerson('Marie', 'Curie', 'F', '7/11/1867').generateFiscalCode();
console.log(fiscalCode);


/////////////////////////////////////// Zadanie z dzielnikami które są liczbami pierwszymi ///////////////////////////////////////
const primeDivisors = number => {
  const primeDivisorsArr = [];
  for (let divisor = 2; divisor <= number; divisor++) {
    if (!(number % divisor)) {
      for (let el = 2; el <= divisor; el++) {
        if (el === divisor) primeDivisorsArr.push(el);
        if (!(divisor % el)) break;
      }
    }
  }

  console.log(primeDivisorsArr);
};

primeDivisors(99);

/////////////////////////////////// Zadanie "Secret Agent Password" ////////////////////////////////////
const secretPassword = msg => {
  // 1. Check if msg has exactly 9 letters
  if (msg.length !== 9 || !/^[a-z]+$/.test(msg)) return 'BANG! BANG! BANG!';

  // 2. Separate message into chunks containing 3 elemets
  const msgChunksArr = msg.split('').reduce((resultArr, cur, index) => {
    const chunkIndex = Math.floor(index / 3);
    if (!(index % 3)) {
      resultArr[chunkIndex] = [];
    }

    resultArr[chunkIndex].push(cur);
    return resultArr;
  }, []);

  // 3. Convert the first and third letter to the corresponding number, according to the English alphabets (ex. a = 1, b = 2, c = 3 ... z = 26, etc).
  msgChunksArr[0][0] = msgChunksArr[0][0].charCodeAt() - 96;
  msgChunksArr[0][2] = msgChunksArr[0][2].charCodeAt() - 96;

  // 4. Reverse the fourth, fifth, and sixth letters.
  msgChunksArr[1].reverse();

  // 5. Replace seventh, eighth, and ninth letter with next letter (z will be substituted with a).
  msgChunksArr[2] = msgChunksArr[2].map(el => {
    return String.fromCharCode(el.charCodeAt() < 122 ? el.charCodeAt() + 1 : 97);
  });

  // 6. Return the string in the following order: "Part_2+Part_3+Part_1"

  return [msgChunksArr[1], msgChunksArr[2], msgChunksArr[0]].map(el => el.join('')).join('');
};


//////////////////////////////////////////////////////// ZADANIE Z TWORZENIEM DIAMENTU ////////////////////////////////////////////////////////////////
const createDiamond = function(carat) {
  let diamond = [];
  diamond.length = carat % 2 ? carat : carat - 1;
  // console.log(diamond.length)

  for (let i = 0; i < diamond.length; i++) {
    // 1. Create top or bottom of a diamond.
    if (i === 0 || i === diamond.length - 1) {
      let row = Array(carat);
      const halfOfCarat = carat / 2;

      // 1a. If carat is a even value, edge of a diamond will be located between middle and middle - 1 position of a row.
      // If odd value, edge will be precisely on a median position of a row.
      if (!(carat % 2)) {
        for (let iOfRow = 0; iOfRow < row.length; iOfRow++) {
          row[iOfRow] = iOfRow === halfOfCarat - 1 || iOfRow === halfOfCarat ? 1 : 0;
        }
      } else {
        for (let iOfRow = 0; iOfRow < row.length; iOfRow++) {
          row[iOfRow] = iOfRow === halfOfCarat - 0.5 ? 1 : 0;
        }
      }

      diamond[i] = row;
      continue;
    }

    // 2. Create middle edge of a diamond.
    if (i === diamond.length / 2 - 0.5) {
      let row = Array(carat);
      for (let iOfRow = 0; iOfRow < row.length; iOfRow++) {
        row[iOfRow] = iOfRow === 0 || iOfRow === row.length - 1 ? 1 : 0;
      }
      diamond[i] = row;
      continue;
    }

    // 3. Create the rest of the rows.
    let row = Array(carat);

    // 3a. Create diamond's elements for the upper half
    if (i < diamond.length / 2 - 0.5) {
      if (!(carat % 2)) {
        for (let iOfRow = 0; iOfRow < row.length; iOfRow++) {
          row[iOfRow] = row.length / 2 - 1 - iOfRow === i || iOfRow - row.length / 2 === i ? 1 : 0;
        }
      } else {
        for (let iOfRow = 0; iOfRow < row.length; iOfRow++) {
          row[iOfRow] = row.length / 2 - 0.5 - iOfRow === i || iOfRow - (row.length / 2 - 0.5) === i ? 1 : 0;
        }
      }
      diamond[i] = row;
    }

    // 3b. Create diamond's elements for the lower half
    if (i > diamond.length / 2 - 0.5) {
      if (!(carat % 2)) {
        for (let iOfRow = 0; iOfRow < row.length; iOfRow++) {
          row[iOfRow] = row.length / 2 - 1 - iOfRow === diamond.length - 1 - i || iOfRow - row.length / 2 === diamond.length - 1 - i ? 1 : 0;
        }
      } else {
        for (let iOfRow = 0; iOfRow < row.length; iOfRow++) {
          row[iOfRow] =
            row.length / 2 - 0.5 - iOfRow === diamond.length - 1 - i || iOfRow - (row.length / 2 - 0.5) === diamond.length - 1 - i ? 1 : 0;
        }
      }
      diamond[i] = row;
    }
  }

  return [diamond, !(carat % 2) ? 'good cut' : 'perfect cut'];
};

[
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
];
console.log(createDiamond(11));

////////////////////////////////////////////////////////////////// Kaprekar Numbers ///////////////////////////////////////////////////////////
function kaprekarNumbers(min, max) {
  const res = [];
  for (let el = min; el <= max; el++) {
    const squaredElArr = (el * el).toString().split('');
    if (squaredElArr.slice(0, squaredElArr.length / 2).join('') * 1 + squaredElArr.slice(squaredElArr.length / 2).join('') * 1 === el) res.push(el);
  }
  return res.length ? res.join(' ') : 'INVALID RANGE';
}

console.log(kaprekarNumbers(2, 1));

/////////////////////////////////////////////////////////////// Polybius challange ////////////////////////////////////////////////////////////////////////////////////////
function polybius(text) {
  // if (!/^[a-zA-Z]+$/.test(text) && !/^[0-9]+$/.test(text)) return 'False input!';
  const polybiusSquareObj = {};
  for (let id = 11, charCode = 97; id <= 55; id++, charCode++) {
    polybiusSquareObj[id] = String.fromCharCode(charCode);
    if (id === 24) {
      charCode++;
      continue;
    }

    if (!(id % 5)) id = id + 5;
  }
  // console.log(polybiusSquareObj)
  if (isNaN(text[0] * 1)) {
    return text
      .toLowerCase()
      .split('')
      .map(el => {
        for (let property in polybiusSquareObj) {
          if (el === 'j') el = 'i';
          if (polybiusSquareObj[property] === el) return property;
        }
      })
      .join('');
  } else {
    const messageArr = [];
    text.split(' ').forEach(subArr => {
      const messagePart = [];
      for (let i = 0; i < subArr.length; i += 2) {
        messagePart.push(polybiusSquareObj[`${subArr[i]}${subArr[i + 1]}`]);
      }
      messageArr.push(messagePart);
    });
    const finalMessage = messageArr.map(el => el.join('')).join(' ');
    return finalMessage;
  }
}

console.log(polybius(`Just because I don't care doesn't mean that I don't understand`));

/////////////////////////////////////////////////////// Zadanie Lnad Perimeter //////////////////////////////////////////////////
function islandsPerimeter(grid) {
  let perimeters = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let rowEl = 0; rowEl < grid[row].length; rowEl++) {
      if (grid[row][rowEl]) {
        if (!grid[row][rowEl - 1]) perimeters++;
        if (!grid[row][rowEl + 1]) perimeters++;

        if (!grid[row - 1]) {
          perimeters++;
        } else {
          if (!grid[row - 1][rowEl]) perimeters++;
        }

        if (!grid[row + 1]) {
          perimeters++;
        } else {
          if (!grid[row + 1][rowEl]) perimeters++;
        }
      }
    }
  }
  return perimeters;
}

islandsPerimeter([
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1]
]);

///////////////////////////////// Zadanie maximum seatings /////////////////////////////////////////
function maximumSeating(arr) {
  let maxSeats = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      i += 2;
      continue;
    }

    if (!arr[i - 1] && !arr[i - 2] && !arr[i + 1] && !arr[i + 2]) {
      maxSeats++;
      arr[i] = 1;
      i += 2;
    }
  }
  return maxSeats;
}
console.log(maximumSeating([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

//////////////////////////////////////////////////////////// Zadanie "Frequency of nested elements" ///////////////////////////////////////////////
const freqCount = (arr, el) => {
  const result = [];
  let nestArr = [];

  for (let i = 0, level = 0; i < arr.length; i++) {
    if (!result[level]) result[level] = [level, 0];

    if (typeof arr[i] !== 'number') {
      nestArr.push(...arr[i]);
    } else {
      if (arr[i] !== el) {
        arr.splice(i, 1);
        i--;
      } else {
        result[level][1] += 1;
      }
    }

    if (!arr[i + 1]) {
      arr = [...nestArr];
      nestArr = [];
      i = -1;
      level++;
    }
  }

  return result;
};
freqCount([1, [2], 1, [[2]], 1, [[[2]]], 1, [[[[2]]]]], 2);

//////////////////////////////////////////////////////////// Zadanie "Who Won Tik Tac Toe" ///////////////////////////////////////////////
function whoWon(board) {
  const winners = [];

  // 1. Check if someone won in rows
  for (let row of board) {
    if (row.every(el => el === row[0])) if (!winners.includes(row[0])) winners.push(row[0]);
  }

  // 2. Check if someone won in columns
  for (let i = 0; i < board[0].length; i++) {
    const column = [board[0][i], board[1][i], board[2][i]];
    if (column.every(el => el === column[0])) if (!winners.includes(column[0])) winners.push(column[0]);
  }

  // 3. Chceck if someone won in diagonal
  const diagonals = [
    [board[0][0], board[1][1], board[2][2]],
    [board[2][0], board[1][1], board[0][2]]
  ];
  for (let diagonal of diagonals) {
    if (diagonal.every(el => el === diagonal[0])) if (!winners.includes(diagonal[0])) winners.push(diagonal[0]);
  }
  console.log(winners);
  return winners.length === 1 ? `${winners[0]}` : `Tie`;
}
console.log(
  whoWon([
    ['X', 'X', 'X'],
    ['O', 'X', 'O'],
    ['X', 'O', 'O']
  ])
);

////////////////////////////////////////////// Climbing Competition /////////////////////////////////////////////////////////////
function climb(stamina, obstacles) {
  let obstaclesPassed = 0;

  for (let i = 1; i < obstacles.length; i++) {
    let newStamina =
      obstacles[i] > obstacles[i - 1]
        ? stamina - Math.ceil(obstacles[i] - obstacles[i - 1]) * 2
        : stamina - Math.ceil(obstacles[i - 1] - obstacles[i]);

    if (newStamina >= 0) {
      obstaclesPassed++;
      stamina = newStamina;
    } else {
      break;
    }
  }
  return obstaclesPassed;
}
console.log(climb(10, [5, 4.2, 3, 3.5, 6, 4, 6, 8, 1]));


///////////////////////////////////////////////////////// Zadanie ascending //////////////////////////////////
function ascending(str) {
  const strArr = str.split('');

  for (let n = 1; n < strArr.length; n++) {
    if (!Number.isInteger(strArr.length / n)) continue;

    const sortedArr = strArr.reduce((resultArr, curEl, i) => {
      const chunkIndex = Math.floor(i / n);

      if (!resultArr[chunkIndex]) {
        resultArr[chunkIndex] = [];
      }
      resultArr[chunkIndex].push(curEl);
      return resultArr;
    }, []);

    if (
      sortedArr
        .map(el => el.join('') * 1)
        .every((el, i, arr) => {
          if (i === 0) return true;
          return el * 1 - arr[i - 1] === 1;
        })
    )
      return true;
  }
  return false;
}
console.log(ascending('666667'));

///////////////////////////////////////// canPatch zadanie ///////////////////////////////////
function canPatch(bridge, planks) {
  let holes = 0;
  for (let i = 0; i < bridge.length; i++) {
    if (!bridge[i]) {
      holes++;

      // Continue if there's another hole, or if the hole consists of only one 0
      if (!bridge[i + 1]) continue;
      if (holes === 1) {
        holes = 0;
        continue;
      }

      // If there isn't another hole, check if it can be repaired
      const fittingPlank = planks.find((el, i) => {
        if (el === holes || el === holes - 1) {
          planks.splice(i, 1);
          return el;
        }
      });

      // If there's no plank that fits, return false.
      if (!fittingPlank) return false;
      holes = 0;
    }
  }

  return true;
}
console.log(canPatch([1, 0, 0, 1, 1, 0, 0, 0, 1], [1, 1]));

///////////////////////////////////////// Know Your Neighbor //////////////////////////////////////////
function plusSign(str) {
  const strArr = str.split('');
  for (let i = 0; i < str.length; i++) {
    if (/[a-zA-Z]/.test(strArr[i])) {
      if (strArr[i - 1] !== '+' || strArr[i + 1] !== '+') return false;
    }
  }
  return true;
}

console.log(plusSign("+s+7+fg+r+8+"))

///////////////////////////////////////// Not Quite Perfect //////////////////////////////////////////
function admirable(num) {
  const divisorsArr = [];
  for (let divisor = 1; divisor <= num / 2; divisor++) {
    if (!(num % divisor)) {
      divisorsArr.push(divisor);
    }
  }

  if (divisorsArr.reduce((prev, cur) => prev + cur) === num) return 'Perfect';

  for (let i = 0; i < divisorsArr.length; i++) {
    const sumOfDivisors = divisorsArr.reduce((prev, cur) => prev + cur, -divisorsArr[i] * 2);
    if (sumOfDivisors === num) return divisorsArr[i]
  }

  return 'Neither'
}
console.log(admirable(5456))

///////////////////////////////// Stack Calculator /////////////////////////////////
class StackCalc {
  constructor() {
    this.stack = [];
    this.possibleCommands = ['DUP', 'POP', 'PSH'];
    this.possibleOperations = ['+', '-', '*', '/'];
  }

  run(instructions) {
    const instructionsArr = instructions.split(' ');

    for (let el of instructionsArr) {
      if (!Number.isNaN(el * 1)) {
        this.stack.push(el * 1);
        continue;
      } else if (this.possibleCommands.includes(el)) {
        if (el === 'DUP') {
          this.stack.push(this.stack[this.stack.length - 1]);
          continue;
        }
        if (el === 'POP') {
          this.stack.pop();
          continue;
        }
      } else if (this.possibleOperations.includes(el)) {
        let result = 0;
        if (el === '+') result = this.stack[this.stack.length - 1] + this.stack[this.stack.length - 2];
        else if (el === '-') result = this.stack[this.stack.length - 1] - this.stack[this.stack.length - 2];
        else if (el === '*') result = this.stack[this.stack.length - 1] * this.stack[this.stack.length - 2];
        else if (el === '/') result = this.stack[this.stack.length - 1] / this.stack[this.stack.length - 2];
        this.stack.pop();
        this.stack.pop();
        this.stack.push(result);
      } else {
        this.stack.push(`Invalid instruction: ${el}`);
        return;
      }
    }

    if (!this.stack.length) this.stack.push(0);
  }
  get value() {
    return this.stack[this.stack.length - 1];
  }
}

////////// Playing with nested object  ////////////////////
function getObject(obj) {
  const objValues = Object.values(obj);
  let propertyNum = 0;

  const resObj = objValues.reduce((finalObj, curValue) => {
    for (let prop in finalObj) {
      if (finalObj[prop].marks === curValue.marks) {
        if (curValue.age > finalObj[prop].age) {
          finalObj[prop] = curValue;
        }
        return finalObj;
      }
    }
    finalObj[propertyNum] = curValue;
    propertyNum++;
    return finalObj;
  }, {});

  return resObj;
}

getObject({
  0: { age: 18, name: 'john', marks: '400' },
  1: { age: 17, name: 'julie', marks: '400' },
  2: { age: 16, name: 'Robin', marks: '200' },
  3: { age: 16, name: 'Bella', marks: '300' },
  4: { age: 16, name: 'john', marks: '250' },
  5: { age: 15, name: 'julie', marks: '250' }
});

/////////////////////////////////////////////////////////// Rotate-Transform the Two-Dimensional Matrix //////////////////////////////////////////////
function rotateTransform(arr, num) {
  let rotationsNum = num % 4;

  if (rotationsNum < 0) {
    if (rotationsNum === -2) rotationsNum = Math.abs(rotationsNum);
    else rotationsNum = rotationsNum + 4;
  }

  let baseMatrix = [...arr];
  let newMatrix = [];

  for (let rotationsCompleted = 0; rotationsCompleted < rotationsNum; rotationsCompleted++) {
    for (let column = 0; column < baseMatrix.length; column++) {
      const newRow = [];
      for (let row = baseMatrix.length - 1; row > -1; row--) {
        newRow.push(baseMatrix[row][column]);
      }
      newMatrix.push(newRow);
    }
    baseMatrix = [...newMatrix];
    newMatrix = [];
  }

  return baseMatrix;
}

//////////////////////////////////////////////////////////////// Numbers First, Letters Second //////////////////////////////////////////
function numThenChar(arrays) {
  const arrLengths = arrays.map(el => el.length);
  const arrFlat = arrays.flat();
  const arrNums = arrFlat.filter(el => typeof el === 'number').sort((a, b) => a - b);
  const arrStr = arrFlat.filter(el => typeof el === 'string').sort();
  const arrFlatSorted = [...arrNums, ...arrStr];
  const resArr = [];

  for (let subArrLength of arrLengths) {
    let subArr = [];
    for (let i = 0; i < subArrLength; i++) {
      subArr.push(arrFlatSorted[i]);
    }
    resArr.push(subArr);
    arrFlatSorted.splice(0, subArrLength);
  }

  return resArr;
}

numThenChar([[1, 2, 4.4, 'f', 'a', 'b'], [0], [0.5, 'd', 'X', 3, 's'], ['f', 'e', 8], ['p', 'Y', 'Z'], [12, 18]]);

//////////////////////////////////////////////////////////////// Advanced Array Sorting //////////////////////////////////////////
function advancedSort(arr) {
  return arr.reduce((array, curEl) => {
    for (let subArr of array) {
      if (subArr.includes(curEl)) {
        subArr.push(curEl);
        return array;
      }
    }

    array.push([curEl]);
    return array;
  }, []);
}
console.log(advancedSort([5, 4, 5, 5, 4, 3]));

/////////////////////////////////////////////////////////// Ungroup Data in an Object //////////////////////////////////////////////
function ungroupStudents(students) {
  const resArr = [];

  for (let objEl of students) {
    for (let student of objEl.data) {
      resArr.push({ teacher: objEl.teacher, ...student });
    }
  }
  return resArr;
}

///////////////////////////////////////// Cup Swapping /////////////////////////////////////
function cupSwapping(swaps) {
  return swaps.reduce((position, swap) => {
    return swap.includes(position) ? swap.split('').find(el => el !== position) : position;
  }, 'B');
}
console.log(cupSwapping(['AB', 'CA']));


/////////////////////////////////////// Sort Positives, Keep Negatives //////////////////////////////////////////
function posNegSort(arr) {
  const negativesArrIds = [];
  arr.forEach((el, i) => {
    if (el < 0) negativesArrIds.push(i);
  });

  const resArr = [...arr.filter(el => el > 0).sort((a, b) => a - b)];
  negativesArrIds.forEach(el => {
    resArr.splice(el, 0, arr[el]);
  });

  return resArr;
}

console.log(posNegSort([-5, -5, -5, -5, 7, -5]));

////////////////////////////////////// Magic Square ////////////////////////////////////////////
function isMagicSquare(arr) {
  let valToCompare;

  // 1. Check if rows are equal
  for (let row of arr) {
    const sum = row.reduce((prev, cur) => prev + cur);
    if (!valToCompare) valToCompare = sum;
    else {
      if (valToCompare !== sum) return false;
    }
  }

  // 2. Check if columns are equal
  for (let column = 0; column < arr.length; column++) {
    let columnVal = 0;
    for (let row = 0; row < arr.length; row++) {
      columnVal = columnVal + arr[row][column];
    }

    if (columnVal !== valToCompare) return false;
  }

  // 3. Check if diagonals are equal
  // 3a. First diagonal
  let firstDiagonal = 0;
  for (let i = 0; i < arr.length; i++) {
    firstDiagonal += arr[i][i];
  }
  if (firstDiagonal !== valToCompare) return false;

  // 3b. Second diagonal
  let secondDiagonal = 0;
  for (let i = arr.length - 1; i > -1; i--) {
    secondDiagonal += arr[i][i];
  }

  if (secondDiagonal !== valToCompare) return false;

  return true;
}

