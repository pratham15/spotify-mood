export default async function getActiveDevices(token) {
  console.log("Looking for active devices!");

  const resp = fetch("https://api.spotify.com/v1/me/player/devices", {
    //method get
    // oauth required

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    //content type application/json
  });
  const response = await resp;
  const json = await response.json();
  return await json;
}
