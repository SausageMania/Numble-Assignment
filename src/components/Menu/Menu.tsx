import React from "react";
import { ISetting } from "App";

interface IProps {
  setting: ISetting;
}

const Menu: React.FC<IProps> = (props) => {
  const { setting } = props;
  return (
    <span>
      스테이지: {setting.stage}, 남은 시간: {setting.time}, 점수:{" "}
      {setting.score}
    </span>
  );
};
export default Menu;
