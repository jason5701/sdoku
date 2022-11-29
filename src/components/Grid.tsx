import { useCallback, useEffect, Children } from 'react';
import styled, { css } from 'styled-components';
import { BLOCK_COORDS, GRID, INDEX, N, NUMBERS } from '../constants';
import {
  CREATE_GRID,
  FILL_BLOCK,
  IReducer,
  SELECT_BLOCK,
} from '../redux/featrues/slice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useSelector } from 'react-redux';
import useMousetrap from 'react-hook-mousetrap';

interface BlockContainerProps {
  active?: boolean;
  puzzle?: boolean;
}

interface GridStateProps {
  selectedBlock?: BLOCK_COORDS;
  selectedValue: N;
  solvedGrid?: GRID;
}

interface BlockProps {
  colIndex: INDEX;
  rowIndex: INDEX;
}

interface BlockStateProps {
  isActive: boolean;
  isPuzzle: boolean;
  value: N;
}

const BlockContainer = styled.div<BlockContainerProps>`
  ${({ active, puzzle, theme }) => css`
    align-items: center;
    background-color: ${active ? theme.colors.blue : theme.colors.white};
    border: solid 1px ${theme.colors.kobaltblue};
    color: ${theme.colors.kobaltblue};
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    font-size: 20px;
    font-weight: ${puzzle ? 'normal' : 'bold'};
    /* height: fit-content; */
    justify-content: center;
    transition: ${theme.transition};
    user-select: none;
    &:before {
      padding-top: 100%;
      content: '';
      float: left;
    }
    &:hover {
      background-color: ${theme.colors.lightBlue};
    }
  `}
`;

const Block = ({ colIndex, rowIndex }: BlockProps) => {
  const state = useAppSelector((state: { grid: IReducer }): BlockStateProps => {
    const { selectedBlock, challengeGrid, workingGrid } = state.grid;
    return {
      isActive: selectedBlock
        ? selectedBlock[0] === rowIndex && selectedBlock[1] === colIndex
        : false,
      isPuzzle:
        challengeGrid && challengeGrid[rowIndex][colIndex] !== 0 ? true : false,
      value: workingGrid ? workingGrid[rowIndex][colIndex] : 0,
      // value: 0,
    };
  });

  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    if (!state.isActive) dispatch(SELECT_BLOCK([rowIndex, colIndex]));
  };

  return (
    <>
      <BlockContainer
        active={state.isActive}
        data-cy={`block-${rowIndex}-${colIndex}`}
        onClick={onClickHandler}
        puzzle={state.isPuzzle}
      >
        {state.value === 0 ? '' : state.value}
      </BlockContainer>
    </>
  );
};

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const Row = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-flow: row;
    &:nth-child(1) {
      div {
        border-top: solid 4px ${theme.colors.kobaltblue};
      }
    }
    &:nth-child(3),
    &:nth-child(6) {
      div {
        border-bottom: solid 3px ${theme.colors.kobaltblue};
      }
    }
    &:nth-child(9) {
      border-bottom: solid 4px ${theme.colors.kobaltblue};
    }
    div {
      &:nth-child(1) {
        border-left: solid 4px ${theme.colors.kobaltblue};
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        border-right: solid 4px ${theme.colors.kobaltblue};
      }
      &:nth-child(4),
      &:nth-child(7) {
        border-left: none;
      }
    }
  `}
`;

const Grid = () => {
  const state = useAppSelector((state: { grid: IReducer }): GridStateProps => {
    const { selectedBlock, solvedGrid, workingGrid } = state.grid;
    
    return {
      selectedBlock,
      selectedValue:
        workingGrid && selectedBlock
          ? workingGrid[selectedBlock[0]][selectedBlock[1]]
          : 0,
      solvedGrid,
    };
  });

  const dispatch = useAppDispatch();

  const create = useCallback(() => dispatch(CREATE_GRID()), [dispatch]);

  const fill = useCallback(
    (n: NUMBERS) => {
      if (state.selectedBlock && state.selectedValue === 0) {
        dispatch(FILL_BLOCK({ n, ...state.selectedBlock }));
      }
    },
    [dispatch, state.selectedBlock, state.selectedValue]
  );

  const moveDown = () => {
    if (state.selectedBlock && state.selectedBlock[0] < 8) {
      dispatch(
        SELECT_BLOCK([
          (state.selectedBlock[0] + 1) as INDEX,
          state.selectedBlock[1],
        ])
      );
    }
  };

  const moveLeft = () => {
    if (state.selectedBlock && state.selectedBlock[1] < 8) {
      dispatch(
        SELECT_BLOCK([
          state.selectedBlock[0],
          (state.selectedBlock[1] + 1) as INDEX,
        ])
      );
    }
  };

  const moveRight = () => {
    if (state.selectedBlock && state.selectedBlock[1] < 8)
      dispatch(
        SELECT_BLOCK([
          state.selectedBlock[0],
          (state.selectedBlock[1] + 1) as INDEX,
        ])
      );
  };

  const moveUp = () => {
    if (state.selectedBlock && state.selectedBlock[0] > 0)
      dispatch(
        SELECT_BLOCK([
          (state.selectedBlock[0] - 1) as INDEX,
          state.selectedBlock[1],
        ])
      );
  };

  useMousetrap('1', () => fill(1));
  useMousetrap('2', () => fill(2));
  useMousetrap('3', () => fill(3));
  useMousetrap('4', () => fill(4));
  useMousetrap('5', () => fill(5));
  useMousetrap('6', () => fill(6));
  useMousetrap('7', () => fill(7));
  useMousetrap('8', () => fill(8));
  useMousetrap('9', () => fill(9));
  useMousetrap('down', moveDown);
  useMousetrap('left', moveLeft);
  useMousetrap('right', moveRight);
  useMousetrap('up', moveUp);

  useEffect(() => {
    if (!state.solvedGrid) create();
  }, [create, state.solvedGrid]);

  return (
    <>
      <GridContainer>
        {Children.toArray(
          [...Array(9)].map((_, rowIndex) => (
            <Row>
              {Children.toArray(
                [...Array(9)].map((_, colIndex) => (
                  <Block
                    colIndex={colIndex as INDEX}
                    rowIndex={rowIndex as INDEX}
                  />
                ))
              )}
            </Row>
          ))
        )}
      </GridContainer>
    </>
  );
};

export default Grid;
