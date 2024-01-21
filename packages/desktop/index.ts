import * as robot from "robotjs";
import sharp from "sharp";
import screenshot from "screenshot-desktop";
import fs from "fs";
import { createWorker } from "tesseract.js";
import { getSteps } from "core";

(async () => {
  const LT = [100 / 2, 340 / 2];
  const cellSize = 750 / 10 / 2;
  const screenshotBuffer = await screenshot();
  const img = await sharp(screenshotBuffer)
    .extract({
      left: 68,
      top: 324,
      width: 750,
      height: 1210,
    })
    .grayscale()
    .modulate({
      brightness: 65,
    })
    .toBuffer();
  fs.writeFileSync("test.png", img);
  const worker = await createWorker("eng");
  await worker.setParameters({
    tessedit_char_whitelist: "0123456789",
  });
  const ret = await worker.recognize(img);
  const numbers = ret.data.text.replace(/\n/g, "");
  await worker.terminate();
  if (numbers.length !== 10 * 16) {
    throw new Error("识别错误");
  }
  // 把 numbers 转换为 10 * 16 的二维数组
  const numbers2d = [];
  for (let i = 0; i < 16; i++) {
    numbers2d.push(
      numbers
        .slice(i * 10, (i + 1) * 10)
        .split("")
        .map(Number)
    );
  }
  const steps = getSteps(numbers2d);
  console.log(steps);
  robot.setMouseDelay(50);
  robot.moveMouse(LT[0], LT[1]);
  robot.mouseClick();
  steps.forEach(([from, to]) => {
    robot.moveMouseSmooth(
      LT[0] + from[0] * cellSize,
      LT[1] + from[1] * cellSize
    );
    robot.mouseToggle("down");
    robot.moveMouseSmooth(
      LT[0] + to[0] * cellSize + 5,
      LT[1] + to[1] * cellSize + 10
    );
    robot.mouseToggle("up");
  });
})();
