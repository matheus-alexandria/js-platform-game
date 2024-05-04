export function trackKeys(keys: string[]): Record<string, boolean> {
  const downKeys = Object.create(null);
  function track(event: KeyboardEvent) {
    if (keys.includes(event.key)) {
      console.log(event.key);
      downKeys[event.key] = event.type === 'keydown';
      event.preventDefault();
    }
  }

  window.addEventListener('keydown', track);
  window.addEventListener('keyup', track);

  return downKeys;
}