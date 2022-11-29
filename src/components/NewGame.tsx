import { useCallback } from 'react';
import styled from 'styled-components';
import { CREATE_GRID } from '../redux/featrues/slice';
import { useAppDispatch } from '../redux/store';
import { Button } from './Button';

const NewGameContainer = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

const NewGame = () => {
  const dispatch = useAppDispatch();

  const createNewSudoku = useCallback(() => {
    if (window.confirm(' Are you sure ?')) dispatch(CREATE_GRID());
  }, [dispatch]);

  return (
    <>
      <NewGameContainer>
        <Button onClick={createNewSudoku}>New Game</Button>
      </NewGameContainer>
    </>
  );
};

export default NewGame;
