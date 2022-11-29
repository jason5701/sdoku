import { GRID, SQUARE } from '../constants';
import { checkGrid, copyGrid, identifySquare } from '../utils';
import { isInCol, isInRow, isInSquare } from '../utils/is-in';

/**
 * check grid test
 */
// describe('checkGrid', () => {
//   it('returns false when grid is not complete', () => {
//     expect(
//       checkGrid([
//         [0, 4, 2, 6, 5, 1, 3, 9, 7],
//         [5, 3, 7, 2, 8, 9, 6, 4, 1],
//         [6, 9, 1, 7, 3, 4, 5, 2, 8],
//         [1, 6, 3, 8, 4, 5, 9, 7, 2],
//         [7, 5, 8, 1, 9, 2, 4, 6, 3],
//         [9, 2, 4, 3, 7, 6, 1, 8, 5],
//         [4, 7, 6, 5, 1, 8, 2, 3, 9],
//         [2, 8, 5, 9, 6, 3, 7, 1, 4],
//         [3, 1, 9, 4, 2, 7, 8, 5, 6],
//       ])
//     ).toBeFalsy();

//     expect(
//       checkGrid([
//         [8, 4, 2, 6, 5, 1, 3, 9, 7],
//         [5, 3, 7, 2, 8, 9, 6, 4, 1],
//         [6, 9, 1, 7, 3, 4, 5, 2, 8],
//         [1, 6, 3, 8, 4, 5, 9, 7, 2],
//         [7, 5, 8, 1, 0, 2, 4, 6, 3],
//         [9, 2, 4, 3, 7, 6, 1, 8, 5],
//         [4, 7, 6, 5, 1, 8, 2, 3, 9],
//         [2, 8, 5, 9, 6, 3, 7, 1, 4],
//         [3, 1, 9, 4, 2, 7, 8, 5, 6],
//       ])
//     ).toBeFalsy();

//     expect(
//       checkGrid([
//         [8, 4, 2, 6, 5, 1, 3, 9, 7],
//         [5, 3, 7, 2, 8, 9, 6, 4, 1],
//         [6, 9, 1, 7, 3, 4, 5, 2, 8],
//         [1, 6, 3, 8, 4, 5, 9, 7, 2],
//         [7, 5, 8, 1, 9, 2, 4, 6, 3],
//         [9, 2, 4, 3, 7, 6, 1, 8, 5],
//         [4, 7, 6, 5, 1, 8, 2, 3, 9],
//         [2, 8, 5, 9, 6, 3, 7, 1, 4],
//         [3, 1, 9, 4, 2, 7, 8, 5, 0],
//       ])
//     ).toBeFalsy();
//   });

//   it('returns true when grid is complete', () => {
//     expect(
//       checkGrid([
//         [8, 4, 2, 6, 5, 1, 3, 9, 7],
//         [5, 3, 7, 2, 8, 9, 6, 4, 1],
//         [6, 9, 1, 7, 3, 4, 5, 2, 8],
//         [1, 6, 3, 8, 4, 5, 9, 7, 2],
//         [7, 5, 8, 1, 9, 2, 4, 6, 3],
//         [9, 2, 4, 3, 7, 6, 1, 8, 5],
//         [4, 7, 6, 5, 1, 8, 2, 3, 9],
//         [2, 8, 5, 9, 6, 3, 7, 1, 4],
//         [3, 1, 9, 4, 2, 7, 8, 5, 6],
//       ])
//     ).toBeTruthy();
//   });
// });

/**
 * copy grid
 */
// describe('copyGrid', () => {
//   it('returns a copy of a given grid', () => {
//     expect(
//       copyGrid([
//         [8, 4, 2, 6, 5, 1, 3, 9, 7],
//         [5, 3, 7, 2, 8, 9, 6, 4, 1],
//         [6, 9, 1, 7, 3, 4, 5, 2, 8],
//         [1, 6, 3, 8, 4, 5, 9, 7, 2],
//         [7, 5, 8, 1, 9, 2, 4, 6, 3],
//         [9, 2, 4, 3, 7, 6, 1, 8, 5],
//         [4, 7, 6, 5, 1, 8, 2, 3, 9],
//         [2, 8, 5, 9, 6, 3, 7, 1, 4],
//         [3, 1, 9, 4, 2, 7, 8, 5, 6],
//       ])
//     ).toStrictEqual([
//       [8, 4, 2, 6, 5, 1, 3, 9, 7],
//       [5, 3, 7, 2, 8, 9, 6, 4, 1],
//       [6, 9, 1, 7, 3, 4, 5, 2, 8],
//       [1, 6, 3, 8, 4, 5, 9, 7, 2],
//       [7, 5, 8, 1, 9, 2, 4, 6, 3],
//       [9, 2, 4, 3, 7, 6, 1, 8, 5],
//       [4, 7, 6, 5, 1, 8, 2, 3, 9],
//       [2, 8, 5, 9, 6, 3, 7, 1, 4],
//       [3, 1, 9, 4, 2, 7, 8, 5, 6],
//     ]);
//   });
// });

/**
 * isInCol
 */
// describe('isInCol', () => {
//   it('it returns true when value is in grid column', () => {
//     const grid: GRID = [
//       [8, 4, 2, 6, 5, 1, 3, 9, 7],
//       [5, 3, 7, 2, 8, 9, 6, 4, 1],
//       [6, 9, 1, 7, 3, 4, 5, 2, 8],
//       [1, 6, 3, 8, 4, 5, 9, 7, 2],
//       [7, 5, 8, 1, 9, 2, 4, 6, 3],
//       [9, 2, 4, 3, 7, 6, 1, 8, 5],
//       [4, 7, 6, 5, 1, 8, 2, 3, 9],
//       [2, 8, 5, 9, 6, 3, 7, 1, 4],
//       [3, 1, 9, 4, 2, 7, 8, 5, 6],
//     ];
//     expect(isInCol({ col: 0, grid, value: 9 })).toBeTruthy();
//     expect(isInCol({ col: 5, grid, value: 9 })).toBeTruthy();
//     expect(isInCol({ col: 8, grid, value: 9 })).toBeTruthy();
//   });

//   it('it returns false when value is not in the grid column', () => {
//     const grid: GRID = [
//       [8, 4, 2, 6, 5, 1, 3, 9, 7],
//       [5, 3, 7, 2, 8, 0, 6, 4, 1],
//       [6, 9, 1, 7, 3, 4, 5, 2, 8],
//       [1, 6, 3, 8, 4, 5, 9, 7, 2],
//       [7, 5, 8, 1, 9, 2, 4, 6, 3],
//       [0, 2, 4, 3, 7, 6, 1, 8, 5],
//       [4, 7, 6, 5, 1, 8, 2, 3, 0],
//       [2, 8, 5, 9, 6, 3, 7, 1, 4],
//       [3, 1, 9, 4, 2, 7, 8, 5, 6],
//     ];
//     expect(isInCol({ col: 8, grid, value: 9 })).toBeFalsy();
//     expect(isInCol({ col: 0, grid, value: 9 })).toBeFalsy();
//     expect(isInCol({ col: 5, grid, value: 9 })).toBeFalsy();
//   });
// });

/**
 * isInRow
 */
// describe('isInRow', () => {
//   it('it returns true when value is in grid row', () => {
//     const grid: GRID = [
//       [8, 4, 2, 6, 5, 1, 3, 9, 7],
//       [5, 3, 7, 2, 8, 9, 6, 4, 1],
//       [6, 9, 1, 7, 3, 4, 5, 2, 8],
//       [1, 6, 3, 8, 4, 5, 9, 7, 2],
//       [7, 5, 8, 1, 9, 2, 4, 6, 3],
//       [9, 2, 4, 3, 7, 6, 1, 8, 5],
//       [4, 7, 6, 5, 1, 8, 2, 3, 9],
//       [2, 8, 5, 9, 6, 3, 7, 1, 4],
//       [3, 1, 9, 4, 2, 7, 8, 5, 6],
//     ];
//     expect(isInRow({ grid, row: 0, value: 9 })).toBeTruthy();
//     expect(isInRow({ grid, row: 5, value: 9 })).toBeTruthy();
//     expect(isInRow({ grid, row: 8, value: 9 })).toBeTruthy();
//   });

//   it('it returns false when value is not in the grid row', () => {
//     const grid: GRID = [
//       [8, 4, 2, 6, 5, 1, 3, 0, 7],
//       [5, 3, 7, 2, 8, 9, 6, 4, 1],
//       [6, 9, 1, 7, 3, 4, 5, 2, 8],
//       [1, 6, 3, 8, 4, 5, 9, 7, 2],
//       [7, 5, 8, 1, 9, 2, 4, 6, 3],
//       [0, 2, 4, 3, 7, 6, 1, 8, 5],
//       [4, 7, 6, 5, 1, 8, 2, 3, 9],
//       [2, 8, 5, 9, 6, 3, 7, 1, 4],
//       [3, 1, 0, 4, 2, 7, 8, 5, 6],
//     ];
//     expect(isInRow({ grid, row: 0, value: 9 })).toBeFalsy();
//     expect(isInRow({ grid, row: 5, value: 9 })).toBeFalsy();
//     expect(isInRow({ grid, row: 8, value: 9 })).toBeFalsy();
//   });
// });

/**
 * isInSquare
 */
describe('isInSquare', () => {
  it('returns true when value is in grid square', () => {
    const square: SQUARE = [
      [1, 3, 4],
      [8, 2, 7],
      [6, 9, 5],
    ];

    expect(isInSquare({ square, value: 1 })).toBeTruthy();
    expect(isInSquare({ square, value: 9 })).toBeTruthy();
  });

  it('returns false when value is not in grid square', () => {
    const square: SQUARE = [
      [0, 3, 4],
      [8, 2, 7],
      [6, 0, 5],
    ];

    expect(isInSquare({ square, value: 1 })).toBeFalsy();
    expect(isInSquare({ square, value: 9 })).toBeFalsy();
  });
});

/**
 * identifySquare
 */
// describe('identifySquare', () => {
//   it('identifies the correct square with a given grid, row index and column index', () => {
//     const grid: GRID = [
//       [8, 4, 2, 6, 5, 1, 3, 9, 7],
//       [5, 3, 7, 2, 8, 9, 6, 4, 1],
//       [6, 9, 1, 7, 3, 4, 5, 2, 8],
//       [1, 6, 3, 8, 4, 5, 9, 7, 2],
//       [7, 5, 8, 1, 9, 2, 4, 6, 3],
//       [9, 2, 4, 3, 7, 6, 1, 8, 5],
//       [4, 7, 6, 5, 1, 8, 2, 3, 9],
//       [2, 8, 5, 9, 6, 3, 7, 1, 4],
//       [3, 1, 9, 4, 2, 7, 8, 5, 6],
//     ];

//     expect(identifySquare({ col: 2, grid, row: 2 })).toStrictEqual([
//       [8, 4, 2],
//       [5, 3, 7],
//       [6, 9, 1],
//     ]);

//     expect(identifySquare({ col: 5, grid, row: 5 })).toStrictEqual([
//       [8, 4, 5],
//       [1, 9, 2],
//       [3, 7, 6],
//     ]);

//     expect(identifySquare({ col: 8, grid, row: 8 })).toStrictEqual([
//       [2, 3, 9],
//       [7, 1, 4],
//       [8, 5, 6],
//     ]);
//   });
// });
