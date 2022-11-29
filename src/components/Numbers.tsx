import { useCallback } from 'react';
import styled from 'styled-components';
import { BLOCK_COORDS, N, NUMBERS } from '../constants';
import { FILL_BLOCK, IReducer } from '../redux/featrues/slice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Button } from './Button';

interface ButtonProps {
  value: NUMBERS;
}

interface ButtonStateProps {
  selectedBlock?: BLOCK_COORDS;
  selectedValue: N;
}

const NumberButton = ({ value }: ButtonProps) => {
  const state = useAppSelector(
    (state: { grid: IReducer }): ButtonStateProps => {
      const { selectedBlock, workingGrid } = state.grid;
      return {
        selectedBlock,
        selectedValue:
          workingGrid && selectedBlock
            ? workingGrid[selectedBlock[0]][selectedBlock[1]]
            : 0,
      };
    }
  );

  const dispatch = useAppDispatch();

  const fill = useCallback(() => {
    if (state.selectedBlock && state.selectedValue === 0) {
      dispatch(FILL_BLOCK({ value, ...state.selectedBlock }));
    }
  }, [dispatch, state.selectedBlock, state.selectedValue, value]);

  return <Button onClick={fill}>{value}</Button>;
};

const NumbersContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: auto;
`;

const Numbers = () => {
  return (
    <NumbersContainer>
      {([1, 2, 3, 4, 5, 6, 7, 8, 9] as NUMBERS[]).map((value) => (
        <NumberButton key={value} value={value} />
      ))}
    </NumbersContainer>
  );
};

export default Numbers;
