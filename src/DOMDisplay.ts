import { Actor } from "./actors/Actor";
import { Level } from "./Level";
import { State } from "./State";

const SCALE = 20;

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

  private scrollPlayerIntoView(state: State): void {
    const width = this.dom.clientWidth;
    const height = this.dom.clientHeight;
    const margin = width / 3;

    // The viewport
    const left = this.dom.scrollLeft;
    const right = left + width;
    const top = this.dom.scrollTop;
    const bottom = top + height;

    const player = state.player!;
    const center = player.pos.plus(player.size.times(0.5)).times(SCALE);

    // Scroll position on X axis
    if (center.x < left + margin) {
      this.dom.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.dom.scrollLeft = center.x + margin - width;
    }

    // Scroll position on Y axis
    if (center.y < top + margin) {
      this.dom.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.dom.scrollTop = center.y + margin - height;
    }
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