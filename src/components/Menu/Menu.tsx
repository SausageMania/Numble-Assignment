import React from "react";
import { IGameInfo } from "App";

interface IProps {
  gameInfo: IGameInfo;
}

const Menu: React.FC<IProps> = (props) => {
  const { gameInfo } = props;
  return (
    <span>
      스테이지: {gameInfo.stage}, 남은 시간: {gameInfo.time}, 점수:{" "}
      {gameInfo.score}
    </span>
  );
};
export default Menu;
