import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Redirect, Router } from "react-router-dom";
import { TokenContext } from "../../App";

const getTopArtists = (): JSX.Element => {
  const response = GetDataFromSpotifyAPI("artists");

  if (response[0] === "error") {
    return (
      <div>
        <Redirect to="/login" />
      </div>
    );
  }

  return (
    <div className="artists">
      {response.map((items, index) => {
        const image = items.images[1].url;
        const artist = items.name;

        if (index === 2) {
          console.log("Artists", items);
        }

        return buildJSX("artist", index + 1, image, artist);
      })}
    </div>
  );
};

const getTopTracks = (): JSX.Element => {
  const response = GetDataFromSpotifyAPI("tracks");

  if (response[0] === "error") {
    return (
      <div>
        <Redirect to="/login" />
      </div>
    );
  }

  return (
    <div className="tracks">
      {response.map((items, index) => {
        const image = items.album.images[1].url;
        const track = items.name;

        if (index === 0) {
          console.log("Tracks", items);
        }

        return buildJSX("track", index + 1, image, track);
      })}
    </div>
  );
};

const GetDataFromSpotifyAPI = (type: string): Array<any> => {
  const [response, setResponse] = useState<any[]>([]);
  const token = useContext(TokenContext);
  const uri = "https://api.spotify.com/v1/me/top/" + type;

  useEffect(() => {
    axios
      .get(uri, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // const topMusic = response.data.items.map((item: any) => item.name);

        setResponse(response.data.items);
      })
      .catch((error) => {
        setResponse(["error"]);
        console.log(error);
      });
  }, []);

  return response;
};

const buildJSX = (
  className: string,
  index: number,
  image: string,
  data: string
): JSX.Element => {
  const keyImage = "image-" + index;
  const keyData = className + "-" + index;

  return (
    <div className={className}>
      <span>{index}</span>
      <img key={keyImage} src={image} alt={data} width="200" height="200" />
      <span key={keyData}>{data}</span>
      <br />
    </div>
  );
};

const Personalization = () => {
  const topArtists = getTopArtists();
  const topTracks = getTopTracks();

  return (
    <div>
      {topArtists} <br />
      {topTracks}
    </div>
  );
};

export default Personalization;
