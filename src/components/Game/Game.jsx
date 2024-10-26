import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import RestartImg from "../../assets/restart.png";
import Player from "./Player";
import Obstacle from "./Obstacle";

const Game = () => {
  const [obstaclePosition, setObstaclePosition] = useState(100);
  const [isJumping, setIsJumping] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const jump = () => {
    if (!isJumping && isGameRunning) {
      setIsJumping(true);
      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    }
  };

  const resetObstacle = () => {
    setObstaclePosition(100);
  };

  const restartGame = () => {
    setIsGameRunning(true);
    setIsGameOver(false);
    setObstaclePosition(100);
  };

  const checkCollision = () => {
    const playerLeft = 50;
    const playerRight = playerLeft + 70;

    const obstacleLeft = (obstaclePosition / 100) * window.innerWidth;
    const obstacleRight = obstacleLeft + 80;

    if (
      obstacleLeft <= playerRight &&
      obstacleRight >= playerLeft &&
      !isJumping
    ) {
      setIsGameRunning(false);
      setIsGameOver(true);
    }
  };

  useEffect(() => {
    if (isGameRunning) {
      const interval = setInterval(() => {
        setObstaclePosition((prev) => {
          if (prev < -10) {
            resetObstacle();
            return 100;
          }
          return prev - 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isGameRunning]);

  useEffect(() => {
    if (isGameRunning) {
      checkCollision();
    }
  }, [obstaclePosition, isJumping, isGameRunning]);

  useEffect(() => {
    const handleSpaceBar = (e) => {
      if (e.code === "Space" && isGameRunning) jump();
    };

    const handleTouch = () => {
      jump();
    };

    document.addEventListener("keydown", handleSpaceBar);
    document.addEventListener("touchstart", handleTouch);
    return () => {
      document.removeEventListener("keydown", handleSpaceBar);
      document.removeEventListener("touchstart", handleTouch);
    };
  }, [isJumping, isGameRunning]);

  return (
    <Wrapper>
      <section className="section-center">
        <h1>Score: {score}</h1>
        <div>
          {isGameOver && (
            <div className="game-over">
              <p>GAME OVER</p>
              <button onClick={restartGame}>
                <img src={RestartImg} alt="" />
              </button>
            </div>
          )}
          <Player isJumping={isJumping} isGameRunning={isGameRunning} />
          <Obstacle obstaclePosition={obstaclePosition} />
        </div>
      </section>
    </Wrapper>
  );
};

export default Game;

const Wrapper = styled.div`
  .section-center {
    > h1 {
      text-align: right;
      margin-right: 5px;
    }

    > div {
      min-height: 350px;
      /* background: url("https://wallpapers.com/images/hd/sunrise-aesthetic-anime-art-desktop-txpgq2aaue31ektv.jpg"); */
      background: url("https://static.vecteezy.com/system/resources/previews/000/524/720/non_2x/fantasy-wide-sci-fi-martian-background-for-ui-game-vector.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      overflow: hidden;
      border-radius: 8px;

      .game-over {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 10px;
        padding: 1rem 0.5rem;
        width: 50%;
        max-width: 200px;
        display: grid;
        place-items: center;

        p {
          font-weight: bold;
          font-size: 24px;
          letter-spacing: 1px;
          text-align: center;
        }

        button {
          margin-top: 20px;
          display: block;
          cursor: pointer;
          background: transparent;
        }
      }
    }
  }
`;
