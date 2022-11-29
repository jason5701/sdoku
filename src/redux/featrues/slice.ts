import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { BLOCK_COORDS, GRID } from '../../constants';
import {
  compareArrays,
  copyGrid,
  createFullGrid,
  removeNumbers,
} from '../../utils';

export interface IReducer {
  challengeGrid?: GRID;
  selectedBlock?: BLOCK_COORDS;
  solvedGrid?: GRID;
  workingGrid?: GRID;
}

const initialState: IReducer = {};

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    create_grid: (state) => {
      const solvedGrid = createFullGrid();
      const gridCopy = copyGrid(solvedGrid);
      const challengeGrid = removeNumbers(gridCopy);
      const workingGrid = copyGrid(challengeGrid);
      return {
        ...state,
        challengeGrid,
        solvedGrid,
        workingGrid,
      };
    },
    fill_block: (state, action: any) => {
      if (state.workingGrid && state.solvedGrid) {
        if (
          state.solvedGrid[action.payload[0]][action.payload[1]] !==
          action.payload.value
        ) {
          alert('Incorrect option!');
          return state;
        }

        state.workingGrid[action.payload[0]][action.payload[1]] =
          action.payload.value;
        if (compareArrays(state.workingGrid, state.solvedGrid))
          alert('Yes, you did it');
        // return { ...state, workingGrid: [...state.workingGrid] as GRID };
      }
      return state;
    },
    select_block: (state, action: any) => {
      return {
        ...state,
        selectedBlock: action.payload,
      };
    },
  },
});

export const {
  create_grid: CREATE_GRID,
  fill_block: FILL_BLOCK,
  select_block: SELECT_BLOCK,
} = gridSlice.actions;

export default gridSlice.reducer;
