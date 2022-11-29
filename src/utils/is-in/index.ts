import { GRID, NUMBERS, SQUARE } from '../../constants';

interface isInCol {
  col: number;
  grid: GRID;
  value: NUMBERS;
}

interface isInRow {
  grid: GRID;
  row: number;
  value: NUMBERS;
}

interface isInSquare {
  square: SQUARE;
  value: NUMBERS;
}

export const isInCol = ({ col, grid, value }: isInCol): boolean => {
  for (let i = 0; i < 9; i++) {
    if (value === grid[i][col]) return true;
  }
  return false;
};

export const isInRow = ({ grid, row, value }: isInRow): boolean => {
  return grid[row].includes(value);
};

export const isInSquare = ({ square, value }: isInSquare): boolean => {
  return [...square[0], ...square[1], ...square[2]].includes(value);
};
