import styled from "@emotion/styled";
import PlayerGif from "../../assets/player-gif.webp";
import React from "react";

const Player = React.memo(({ isJumping }) => {
  return (
    <PlayerWrapper isJumping={isJumping}>
      <img src={PlayerGif} alt="" />
    </PlayerWrapper>
  );
});

export default Player;

const PlayerWrapper = styled.div`
  position: absolute;
  left: 50px;
  bottom: ${(props) => (props.isJumping ? "120px" : 0)};
  transition: bottom 0.15s ease-in-out;
  z-index: 2;
  width: 70px;
  img {
    object-fit: contain;
    height: 100%;
  }
`;
