import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Redirect, Router } from "react-router-dom";
import { TokenContext, RequestRequirements } from "../../App";
import GetAdditional from "./Additional/GetAdditional";

const getTopArtists = (
  token: string
): [JSX.Element[], string[] | undefined] => {
  const response = GetDataFromSpotifyAPI("artists", token);
  const htmlList: JSX.Element[] = [];
  const artistsIds: string[] = [];

  if (response[0] === "error") {
    return [GetRedirectHtml(), []];
  }

  response.forEach((items, index) => {
    const image = items.images[1].url;
    const artist = items.name;
    artistsIds.push(items.id);

    if (index === 2) {
      console.log("Artists", items);
    }

    htmlList.push(buildJSX("artist", index + 1, image, artist));
  });

  return [htmlList, artistsIds];
};

const getTopTracks = (token: string): [JSX.Element[], string[] | undefined] => {
  const response = GetDataFromSpotifyAPI("tracks", token);
  const htmlList: JSX.Element[] = [];
  const albumsIds: string[] = [];

  if (response[0] === "error") {
    return [GetRedirectHtml(), []];
  }

  response.map((items, index) => {
    const image = items.album.images[1].url;
    const track = items.name;
    albumsIds.push(items.id);

    if (index === 0) {
      console.log("Tracks", items);
    }

    htmlList.push(buildJSX("track", index + 1, image, track));
  });

  return [htmlList, albumsIds];
};

const GetRedirectHtml = () => {
  return [
    <div>
      <Redirect to="/login" />
    </div>,
  ];
};

const GetDataFromSpotifyAPI = (type: string, token: string): Array<any> => {
  const [response, setResponse] = useState<any[]>([]);
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
  const requestRequirements = useContext(TokenContext);
  const token = requestRequirements.token;
  const [topArtists, artistsIds] = getTopArtists(token);
  const [topTracks, albumsIds] = getTopTracks(token);
  requestRequirements.artistsId = artistsIds;
  requestRequirements.albumsId = albumsIds;

  return (
    <div>
      {topArtists} <br />
      {topTracks}
      <TokenContext.Provider value={requestRequirements}>
        <GetAdditional />
      </TokenContext.Provider>
    </div>
  );
};

export default Personalization;
