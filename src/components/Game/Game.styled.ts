import styled from "@emotion/styled";
import { IRectInfo } from "App";

interface IRoot {
  row: number;
}

interface IRect {
  rectInfo: IRectInfo;
  isAnswer: boolean;
}

const RootContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: ${(props: IRoot) => {
    const { row } = props;
    return `repeat(${row}, 1fr)`;
  }};
  grid-template-rows: ${(props: IRoot) => {
    const { row } = props;
    return `repeat(${row}, 1fr)`;
  }};
  gap: 4px;
`;

const RectItem = styled.div`
  background-color: ${(props: IRect) => {
    const { hue, saturation, lightness } = props.rectInfo.color;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }};
  filter: ${(props: IRect) => {
    const { isAnswer, rectInfo } = props;
    if (isAnswer) return `hue-rotate(${rectInfo.filter}deg)`;
    return null;
  }};
  width: 100%;
  height: 100%;
`;

export { RootContainer, RectItem };
