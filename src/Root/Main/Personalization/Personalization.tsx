import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../App";

const GetTopMusic = (type: string): Array<string> => {
  const [response, setResponse] = useState([]);
  const token = useContext(TokenContext);
  const uri = "https://api.spotify.com/v1/me/top/" + type;

  useEffect(() => {
    if (!token) {
      return;
    }

    axios
      .get(uri, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const topMusic = response.data.items.map((item: any) => item.name);

        setResponse(topMusic);
      })
      .catch((error) => console.log(error));
  }, [token]);

  return response;
};

const Personalization = () => {
  const topArtists = GetTopMusic("artists");
  const topTracks = GetTopMusic("tracks");

  return (
    <div>
      {topArtists} <br />
      {topTracks}
    </div>
  );
};

export default Personalization;
