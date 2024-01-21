import { GameMap, Point, Step } from "./types";

const MAP_WIDTH = 10;
const MAP_HEIGHT = 16;

export const getSteps = (gameMap: GameMap) => {
  const steps: Step[] = [];
  const next = (_gameMap: GameMap) => {
    const step = getNextStep(_gameMap);
    if (!step) return steps;
    steps.push(step);
    const [start, end] = step;
    const newMap = _gameMap.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        if (
          rowIndex >= start[1] &&
          rowIndex <= end[1] &&
          colIndex >= start[0] &&
          colIndex <= end[0]
        ) {
          return null;
        }
        return col;
      })
    );
    return next(newMap);
  };
  return next(gameMap);
};

export const getNextStep = (gameMap: GameMap) => {
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const point: Point = [x, y];
      const step = getStepFromPoint(gameMap, point);
      if (step) return step;
    }
  }
};

export const getStepFromPoint = (gameMap: GameMap, point: Point) => {
  for (let boxHeight = 0; point[1] + boxHeight < MAP_HEIGHT; boxHeight++) {
    for (let boxWidth = 0; point[0] + boxWidth < MAP_WIDTH; boxWidth++) {
      const end: Point = [point[0] + boxWidth, point[1] + boxHeight];
      const sum = getSumWithinRange(point, end, gameMap);
      if (sum === 10) return [point, end] as const;
    }
  }
};

export const getSumWithinRange = (
  start: Point,
  end: Point,
  gameMap: GameMap
) => {
  const nums: number[] = [];
  for (let row = start[1]; row <= end[1]; row++) {
    const num = getRowSum(gameMap, start, end, row);
    nums.push(num);
  }
  return nums.reduce((prev, cur) => prev + cur);
};

export const getRowSum = (
  gameMap: GameMap,
  start: Point,
  end: Point,
  row: number
) => {
  const nums: number[] = [];
  for (let col = start[0]; col <= end[0]; col++) {
    const num = gameMap[row][col];
    if (num) {
      nums.push(num);
    }
  }
  return nums.reduce((prev, cur) => prev + cur, 0);
};
