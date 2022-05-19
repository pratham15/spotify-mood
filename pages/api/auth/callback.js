import request from "request";

export default function callback(req, res) {
  var code = req.query.code;
  console.log("callback function! ");
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: "http://localhost:3000/api/auth/callback",
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.NEXT_PUBLIC_CLIENT_ID +
            ":" +
            process.env.NEXT_PUBLIC_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json({ body });
      res.redirect("/");
    }
  });
}
