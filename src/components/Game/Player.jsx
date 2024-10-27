import styled from "@emotion/styled";
import PlayerGif from "../../assets/player-gif.webp";
import React from "react";
import PlayerStatic from "../../assets/player-stop.png";

const Player = React.memo(({ isJumping, isGameRunning }) => {
  return (
    <PlayerWrapper isJumping={isJumping}>
      <img src={isGameRunning ? PlayerGif : PlayerStatic} alt="" />
    </PlayerWrapper>
  );
});

export default Player;

const PlayerWrapper = styled.div`
  position: absolute;
  left: 50px;
  bottom: ${(props) => (props.isJumping ? "130px" : 0)};
  transition: all 250ms ease-in-out;
  z-index: 2;
  width: 70px;
  img {
    object-fit: contain;
    height: 100%;
  }
`;
