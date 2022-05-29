export const GestureHandler = (player, gesture) => {
  switch (gesture) {
    case "scissors":
      player.nextTrack();
      break;
    case "paper":
      player.togglePlay();
      break;
    case "rock":
      player.prevTrack();
      break;
  }
};
