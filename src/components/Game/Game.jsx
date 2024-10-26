import styled from "@emotion/styled";
import { useState, useEffect, useRef } from "react";

const Game = () => {
  const [obstaclePosition, setObstaclePosition] = useState(100);
  const [isJumping, setIsJuming] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const jump = () => {
    if (!isJumping) {
      setIsJuming(true);
      setTimeout(() => {
        setIsJuming(false);
      }, 500);
    }
  };

  const resetGame = () => {
    setIsGameRunning(true);
    setIsGameOver(true);
    setIsJuming(false);
    setObstaclePosition(100);
  };

  const checkCollision = () => {
    const playerLeft = 50;
    const playerRight = playerLeft + 30;

    const obstacleLeft = (obstaclePosition / 100) * window.innerWidth;
    const obstacleRight = obstacleLeft + 65;

    if (
      obstacleLeft <= playerRight &&
      obstacleRight >= playerLeft &&
      !isJumping
    ) {
      console.log("collision detected");
      setIsGameRunning(false);
      setIsGameOver(true);
    }
  };

  useEffect(() => {
    checkCollision();
  }, [obstaclePosition]);

  useEffect(() => {
    const handleSpaceBar = (e) => {
      if (e.code === "Space") jump();
    };

    document.addEventListener("keydown", handleSpaceBar);
    return () => document.removeEventListener("keydown", handleSpaceBar);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setObstaclePosition((prev) => {
        if (prev < -10) {
          return 100;
        } else {
          return prev - 1;
        }
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <section className="section-center">
        <div className="inner-wrapper">
          <Player isJumping={isJumping} />
          <Obstacle positon={obstaclePosition} />
        </div>
      </section>
    </Wrapper>
  );
};

export default Game;

const Wrapper = styled.div`
  .inner-wrapper {
    min-height: 300px;
    background-color: cyan;
    position: relative;
    overflow: hidden;
  }
`;

const Player = styled.div`
  height: 75px;
  width: 75px;
  background-color: red;
  position: absolute;
  left: 50px;
  bottom: ${(props) => (props.isJumping ? "150px" : 0)};
  transition: all 0.15s linear;
`;
const Obstacle = styled.div`
  height: 120px;
  width: 65px;
  background-color: purple;
  position: absolute;
  left: ${(props) => `${props.positon}%`};
  bottom: 0;
`;
