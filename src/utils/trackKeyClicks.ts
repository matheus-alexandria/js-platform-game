export function trackClicks(keys: string[]): TrackReturn {
  const clicked = Object.create(null);
  keys.forEach((k) => clicked[k] = false);

  function track(event: KeyboardEvent) {
    if (keys.includes(event.key)) {
      clicked[event.key] = !clicked[event.key]
      event.preventDefault();
    }
  }

  function cleanEvents() {
    window.removeEventListener('keyup', track);  
  }

  window.addEventListener('keyup', track);

  return { keys: clicked, clean: cleanEvents };
}

export type TrackReturn = {
  keys: Record<string, boolean>;
  clean: () => void;
}
