export default async function transferPlayback(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const {
    query: { device_id },
  } = req;

  console.log("Transferring playback to user -", device_id);

  // PUT REQUEST TO TRANSFER PLAYBACK

  const status = await fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      device_ids: [device_id],
      play: true,
    }),
  });
  console.log(status.status);
  res.status(200).json({ Value: "Success" });
}
