import React, { useEffect, useState, useCallback } from "react";
import { Menu, Game } from "./components";
import styled from "@emotion/styled";
export interface ISetting {
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
`;

const App: React.FC = () => {
  const [setting, setSetting] = useState<ISetting>({
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
    if (setting.time === 0) {
      alert(`GAME OVER!\n스테이지: ${setting.stage}, 점수: ${setting.score}`);
      setSetting({ time: 15, stage: 1, score: 0 });
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
  }, [setting]);

  const selectAnswer = () => {
    const newLevel = setting.stage + 1;
    const newScore = setting.score + Math.pow(setting.stage, 3) * setting.time;
    const totalRectCount = Math.pow(Math.round((newLevel + 0.5) / 2) + 1, 2);

    setSetting({ stage: newLevel, time: 15, score: newScore });
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
    const newTime = setting.time - 3;
    setSetting({ ...setting, time: newTime > 0 ? newTime : 0 });
  };

  useEffect(() => {
    resetOnlyGameOver();
    const tick = setTimeout(() => {
      setSetting((setting) => ({ ...setting, time: setting.time - 1 }));
    }, 1000);

    return () => clearTimeout(tick);
  }, [resetOnlyGameOver]);

  return (
    <RootContainer>
      <Menu setting={setting} />
      <Game
        rectInfo={rectInfo}
        level={setting.stage}
        selectAnswer={selectAnswer}
        selectWrong={selectWrong}
      />
    </RootContainer>
  );
};

export default App;
