const authUri = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",
];

export const getUriHash = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial: any, item: string) => {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

const Login = () => {
  const loginUri = `${authUri}?client_id=${
    process.env.REACT_APP_SPOTIFY_CLIENT_ID
  }&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;

  return (
    <div className="login">
      <h1>ログインする</h1>
      <a href={loginUri}>Spotifyにログイン</a>
    </div>
  );
};

export default Login;
