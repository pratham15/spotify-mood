export const GestureHandler = (player, gesture) => {
  switch (gesture) {
    case "scissors":
      player.nextTrack();
      break;
    case "paper":
      player.previousTrack();
      break;
    case "rock":
      player.togglePlay();
      break;
  }
};
