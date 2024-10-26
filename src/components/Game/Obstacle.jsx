import styled from "@emotion/styled";
import ObstacleImg from "../../assets/obstacle.png";

const Obstacle = ({ obstaclePosition }) => {
  return (
    <ObstacleWrapper positon={obstaclePosition}>
      <img src={ObstacleImg} alt="" />
    </ObstacleWrapper>
  );
};

export default Obstacle;

const ObstacleWrapper = styled.div`
  height: 80px;
  position: absolute;
  left: ${(props) => `${props.positon}%`};
  bottom: 0;
  width: 80px;

  img {
    object-fit: contain;
    height: 100%;
  }
`;
