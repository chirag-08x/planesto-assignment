import styled from "@emotion/styled";
import Game from "./components/Game/Game";

function App() {
  return (
    <Wrapper>
      <h1>Chrome Dino Game</h1>
      <Game />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  background-color: #f1f5f9;
  min-height: 100vh;
  > h1 {
    text-align: center;
    padding: 3rem 0;
  }
`;
