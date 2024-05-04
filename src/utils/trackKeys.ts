export function trackKeys(keys: string[], endEvent = false): TrackReturn {
  const downKeys = Object.create(null);
  function track(event: KeyboardEvent) {
    if (keys.includes(event.key)) {
      downKeys[event.key] = event.type === 'keydown';
      event.preventDefault();
    }
  }
  function cleanEvents() {
    window.removeEventListener('keydown', track);
    window.removeEventListener('keyup', track);  
  }

  window.addEventListener('keydown', track);
  window.addEventListener('keyup', track);

  return { keys: downKeys, clean: cleanEvents };
}

export type TrackReturn = {
  keys: Record<string, boolean>;
  clean: () => void;
}
