import {
  mouse,
  straightTo,
  centerOf,
  screen,
  imageResource,
} from "@nut-tree/nut-js";
import "@nut-tree/template-matcher";

(async () => {
  await mouse.move(
    straightTo(centerOf(screen.find(imageResource("pattern.png"))))
  );
})();
