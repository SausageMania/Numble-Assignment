import React from "react";
import { RootContainer, RectItem } from "./Game.styled";
import { IRectInfo } from "App";

interface IProps {
  rectInfo: IRectInfo;
  stage: number;
  selectAnswer: () => void;
  selectWrong: () => void;
}

const Game: React.FC<IProps> = (props) => {
  const { rectInfo, stage, selectAnswer, selectWrong } = props;

  const onClickHandle: (isAnswer: boolean) => void = (isAnswer) => {
    if (isAnswer) selectAnswer();
    else selectWrong();
  };

  return (
    <RootContainer row={Math.round((stage + 0.5) / 2) + 1}>
      {[...Array(Math.pow(Math.round((stage + 0.5) / 2) + 1, 2))].map(
        (_, idx) => (
          <RectItem
            key={idx}
            rectInfo={rectInfo}
            isAnswer={rectInfo.answer === idx}
            onClick={() => onClickHandle(rectInfo.answer === idx)}
          />
        )
      )}
    </RootContainer>
  );
};

export default Game;
