import { Actor } from "./Actor";
import { Level } from "./Level";
import { State } from "./State";

const SCALE = 30;

export class DOMDisplay {
  public dom: HTMLElement;
  public actorLayer: HTMLElement | null;

  constructor(parent: HTMLElement, level: Level) {
    this.dom = elt('div', { class: 'game' }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() { this.dom.remove(); }

  syncState(state: State) {
    if (this.actorLayer) this.actorLayer.remove();
    this.actorLayer = this.drawActors(state.actors);
    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
  }

  private drawActors(actors: Actor[]) {
    return elt('div', {}, ...actors.map((actor) => {
      let rect = elt('div', { class: `actor ${actor.type}`});
      rect.style.width = `${actor.size.x * SCALE}px`;
      rect.style.height = `${actor.size.y * SCALE}px`;
      rect.style.left = `${actor.pos.x * SCALE}px`;
      rect.style.top = `${actor.pos.y * SCALE}px`;
      return rect;
    }));
  }
}

function elt(name: string, attrs: Object, ...children: any): HTMLElement {
  let dom = document.createElement(name);
  for (const attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }

  for (const child of children) {
    dom.appendChild(child);
  }

  return dom;
}

function drawGrid(level: Level): HTMLElement {
  return elt(
    'table', 
    { class: 'background', style: `width: ${level.width * SCALE}px`},
    ...level.rows.map((row) => elt(
      'tr', { style: `height: ${SCALE}px`}, ...row.map((type) => elt('td', { class: type }))
    ))
  )
}