MusicEvents.chooseMusic((event) => {
  let currentMusic = event.currentMusic();
  if (currentMusic != null) {
    if (currentMusic.sound.location == "kubejs:l107" || currentMusic.sound.location == "kubejs:l115") {
      return;
    }
  }
  if (event.player == null) {
    return;
  }


  if (event.player.level.dimension == "dimdungeons:dungeon_dimension") {
    if (event.player.z >= -512 && event.player.z <= 512) {
      event.add(
        100,
        Music.of(
          "kubejs:l1.07",
          20 * 1,
          20 * 1,
          true
        )
      );
    }
  }
});