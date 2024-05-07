import { DOMDisplay } from "./DOMDisplay";
import { Level } from "./Level";
import { State } from "./State";
import { levelPlans } from "./levelPlans";
import { trackClicks } from "./utils/trackKeyClicks";
import { trackKeys } from "./utils/trackKeys";

function runAnimation(frameFunction: (timeStep: number) => boolean) {
  let lastTime: number | null = null;
  function frame(time: number) {
    if (lastTime !== null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (!frameFunction(timeStep)) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function runLevel(level: Level, Display: typeof DOMDisplay, config: { playerLives: number }) {
  const display: DOMDisplay = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  const keyEvents = trackKeys(['ArrowLeft', 'ArrowUp', 'ArrowRight', 'Escape']);
  const clicked = trackClicks(['Escape']);

  return new Promise(resolve => {
    runAnimation((time) => {
      if (!clicked.keys.Escape) {
        state = state.update(time, keyEvents.keys);
        display.syncState(state);
      }

      if (state.status === 'playing') {
        return true;
      } else if (state.status === 'pause') {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        keyEvents.clean();
        clicked.clean();
        resolve(state.status);
        return false;
      }
    })
  });
}

async function runGame(plans: string[], Display: typeof DOMDisplay) {
  let config = { 
    playerLives: 10
  };
  let finalMessage = 'Você venceu!';

  for(let level = 0; level < plans.length;) {
    const nextLevel = new Level(plans[level]);
    const status = await runLevel(nextLevel, Display, config);
    if (status === 'won') level++;
    if (status === 'lost') {
      config.playerLives--;
      console.log(`Você tem ${config.playerLives} vidas restantes`);
      if (config.playerLives <= 0) {
        finalMessage = 'Game Over';
        break;
      };
    }
  }

  console.log(finalMessage);
}

window.addEventListener('load', () => {
  runGame(levelPlans, DOMDisplay);
});