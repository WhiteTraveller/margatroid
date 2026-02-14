StartupEvents.registry('sound_event', event => {
  let music = [
    'l1.07',
  ]
  music.forEach(key => {
    event.create(`kubejs:${key}`);
  });
})