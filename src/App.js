import styled from "@emotion/styled";
import Game from "./components/Game/Game";

function App() {
  return (
    <Wrapper>
      <h1>Chrom Dino Game</h1>
      <Game />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  > h1 {
    text-align: center;
    padding: 3rem 0;
  }
`;
