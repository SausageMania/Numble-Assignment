import React, { useEffect, useState, useCallback } from "react";
import { Menu, Game } from "./components";
import styled from "@emotion/styled";
export interface IGameInfo {
  stage: number;
  time: number;
  score: number;
}

export interface IRectInfo {
  filter: number;
  color: {
    hue: number;
    saturation: number;
    lightness: number;
  };
  answer: number;
}

const RootContainer = styled.div`
  width: 400px;
  height: 400px;
  margin: 6px;
`;

const App: React.FC = () => {
  const [gameInfo, setGameInfo] = useState<IGameInfo>({
    time: 15,
    stage: 1,
    score: 0,
  });

  const [rectInfo, setRectInfo] = useState<IRectInfo>({
    filter: 330,
    color: {
      hue: Math.floor(Math.random() * 360),
      saturation: Math.floor(Math.random() * 50) + 30,
      lightness: Math.floor(Math.random() * 30) + 50,
    },
    answer: Math.floor(Math.random() * 3),
  });

  const resetOnlyGameOver = useCallback(() => {
    if (gameInfo.time === 0) {
      alert(`GAME OVER!\n스테이지: ${gameInfo.stage}, 점수: ${gameInfo.score}`);
      setGameInfo({ time: 15, stage: 1, score: 0 });
      setRectInfo({
        filter: 330,
        color: {
          hue: Math.floor(Math.random() * 360),
          saturation: Math.floor(Math.random() * 50) + 30,
          lightness: Math.floor(Math.random() * 30) + 50,
        },
        answer: Math.floor(Math.random() * 3),
      });
    }
  }, [gameInfo]);

  const selectAnswer = () => {
    const newLevel = gameInfo.stage + 1;
    const newScore =
      gameInfo.score + Math.pow(gameInfo.stage, 3) * gameInfo.time;
    const totalRectCount = Math.pow(Math.round((newLevel + 0.5) / 2) + 1, 2);

    setGameInfo({ stage: newLevel, time: 15, score: newScore });
    setRectInfo({
      filter: rectInfo.filter + 0.5,
      color: {
        hue: Math.floor(Math.random() * 360),
        saturation: Math.floor(Math.random() * 50) + 30,
        lightness: Math.floor(Math.random() * 30) + 50,
      },
      answer: Math.floor(Math.random() * (totalRectCount - 1)),
    });
  };

  const selectWrong = () => {
    const newTime = gameInfo.time - 3;
    setGameInfo({ ...gameInfo, time: newTime > 0 ? newTime : 0 });
  };

  useEffect(() => {
    resetOnlyGameOver();
    const tick = setTimeout(() => {
      setGameInfo((setting) => ({ ...setting, time: setting.time - 1 }));
    }, 1000);

    return () => clearTimeout(tick);
  }, [resetOnlyGameOver]);

  return (
    <RootContainer>
      <Menu gameInfo={gameInfo} />
      <Game
        rectInfo={rectInfo}
        stage={gameInfo.stage}
        selectAnswer={selectAnswer}
        selectWrong={selectWrong}
      />
    </RootContainer>
  );
};

export default App;
