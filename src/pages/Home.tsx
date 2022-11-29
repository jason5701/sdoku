import { Grid, Numbers, ContentWrapper, NewGame } from '../components';
import styled, { css } from 'styled-components';

const Card = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: 15px;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    max-height: max-content;
    padding: 15px;
  `}
`;

const Name = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin-top: 5px;
    text-align: center;
    font-size: 15px;
  `}
`;
const Home = () => {
  return (
    <>
      <ContentWrapper>
        <Card>
          <NewGame />
          <Grid />
          <Numbers />
        </Card>
        <Name>
          JH -{' '}
          <a href='https://github.com/jason5701/sdoku.git' target='_blank'>
            GitHub
          </a>
        </Name>
      </ContentWrapper>
    </>
  );
};

export default Home;
