import axios from "axios";
import { useEffect, useState } from "react";

const GetTopMusic = (accessToken: string, type: string): Array<String> => {
  const [response, setResponse] = useState([]);
  const uri = "https://api.spotify.com/v1/me/top/" + type;

  useEffect(() => {
    axios
      .get(uri, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        const topArtists = response.data.items.map((item: any) => item.name);

        setResponse(topArtists);
      })
      .catch((error) => console.log(error));
  }, []);

  return response;
};

const Main = (props: { accessToken: string }) => {
  const topArtists = GetTopMusic(props.accessToken, "artists");
  const topTracks = GetTopMusic(props.accessToken, "tracks");

  return (
    <div>
      {topArtists} <br />
      {topTracks}
    </div>
  );
};

export default Main;
