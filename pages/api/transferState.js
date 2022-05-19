import { useRouter } from "next/router";
import getActiveDevices from "../../lib/spotify/get-active-devices";

export default async function transferState(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const {
    query: { device_id },
  } = req;

  console.log("Transferring State to user!", device_id);

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
