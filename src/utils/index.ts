import { GRID, INDEX, NUMBERS, SQUARE } from '../constants';
import global from '../global';
import { isInCol, isInRow, isInSquare } from './is-in';

interface identifySquare {
  grid: GRID;
  row: number;
  col: number;
}

/**
 * A function to check if the grid is full
 * @param grid A 9x9 array consisting of values from 0-9
 * @returns boolean
 */
export const checkGrid = (grid: GRID): boolean => {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++) if (grid[i][j] === 0) return false;
  return true;
};

/**
 * compares two arrays of any dimensions and returns true if they are equal, otherwise returns false
 * @param arr1 first array to be compared
 * @param arr2 second array to be compared
 * @returns
 */
export const compareArrays = (arr1: any[], arr2: any[]): boolean => {
  if (!Array.isArray(arr1) && !Array.isArray(arr2)) return arr1 === arr2;

  if (arr1.length !== arr2.length) return false;
  for (let i = 0, len = arr1.length; i < len; i++)
    if (!compareArrays(arr1[i], arr2[i])) return false;

  return true;
};

export const copyGrid = (grid: GRID): GRID => {
  const gridCopy: GRID = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  for (let r: INDEX = 0; r < 9; r++)
    for (let c: INDEX = 0; c < 9; c++) gridCopy[r][c] = grid[r][c];

  return gridCopy;
};

export const createFullGrid = (): GRID => {
  const grid: GRID = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  fillGrid(grid);
  return grid;
};

const numbers: NUMBERS[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const fillGrid = (grid: GRID) => {
  let row = 0;
  let col = 0;

  for (let i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;

    if (grid[row][col] === 0) {
      shuffle(numbers);

      for (let value of numbers) {
        // is it not in the grid row?
        if (!isInRow({ grid, row, value }))
          if (!isInCol({ col, grid, value })) {
            // is it not in the grid column?
            // is it not in the grid square?
            // if so...
            const square = identifySquare({ col, grid, row });
            if (!isInSquare({ square, value })) {
              // ...
              grid[row][col] = value;
              // check grid if it is full, if so, stop and return true
              if (checkGrid(grid)) return true;
              else if (fillGrid(grid)) return true;
              // otherwise we run fullGrid(grid) again
            }
          }
      }

      break;
    }
  }
  grid[row][col] = 0;
};

export const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const identifySquare = ({ col, grid, row }: identifySquare): SQUARE => {
  const square = [];
  if (row < 3) {
    if (col < 3)
      for (let x = 0; x < 3; x++) {
        square.push([grid[x][0], grid[x][1], grid[x][2]]);
      }
    else if (col < 6)
      for (let x = 0; x < 3; x++) {
        square.push([grid[x][3], grid[x][4], grid[x][5]]);
      }
    else
      for (let x = 0; x < 3; x++) {
        square.push([grid[x][6], grid[x][7], grid[x][8]]);
      }
  } else if (row < 6) {
    if (col < 3)
      for (let x = 3; x < 6; x++) {
        square.push([grid[x][0], grid[x][1], grid[x][2]]);
      }
    else if (col < 6)
      for (let x = 3; x < 6; x++) {
        square.push([grid[x][3], grid[x][4], grid[x][5]]);
      }
    else
      for (let x = 3; x < 6; x++) {
        square.push([grid[x][6], grid[x][7], grid[x][8]]);
      }
  } else {
    if (col < 3)
      for (let x = 6; x < 9; x++) {
        square.push([grid[x][0], grid[x][1], grid[x][2]]);
      }
    else if (col < 6)
      for (let x = 6; x < 9; x++) {
        square.push([grid[x][3], grid[x][4], grid[x][5]]);
      }
    else
      for (let x = 6; x < 9; x++) {
        square.push([grid[x][6], grid[x][7], grid[x][8]]);
      }
  }

  return square as SQUARE;
};

export const getRandomIndex = () => {
  return Math.floor(Math.random() * Math.floor(9));
};

export const removeNumbers = (grid: GRID, attempts = 5): GRID => {
  while (attempts > 0) {
    let row = getRandomIndex();
    let col = getRandomIndex();

    while (grid[row][col] === 0) {
      row = getRandomIndex();
      col = getRandomIndex();
    }

    const backup = grid[row][col];
    grid[row][col] = 0;

    // copy grid
    const gridCopy = copyGrid(grid);
    // set a global counter
    global.counter = 0;

    // attempt to solve the grid
    solveGrid(gridCopy);

    // if global counter is not 1
    // grid[row][col] = backup
    // decrement attempts
    if (global.counter !== 1) {
      grid[row][col] = backup;
      attempts--;
    }
  }
  return grid;
};

export const solveGrid = (grid: GRID) => {
  let row = 0;
  let col = 0;

  for (let i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;

    if (grid[row][col] === 0) {
      for (let value of numbers)
        if (!isInRow({ grid, row, value }))
          if (!isInCol({ col, grid, value })) {
            const square = identifySquare({ col, grid, row });
            if (!isInSquare({ square, value })) {
              grid[row][col] = value;
              if (checkGrid(grid)) {
                global.counter++;
                break;
              } else if (solveGrid(grid)) return true;
            }
          }
      break;
    }
  }
  grid[row][col] = 0;
};
