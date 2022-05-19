export function waitSpotifySDKLoad() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (window.Spotify) {
        clearInterval(interval);
        resolve(window.Spotify);
      }
    }, 100);
  });
}
