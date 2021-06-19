import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { TokenContext } from "../../App";
import GetAdditional from "./Additional/GetAdditional";

const getTopArtists = (token: string): [JSX.Element[], string[]] => {
	const response = GetDataFromSpotifyAPI("artists", token);
	const htmlList: JSX.Element[] = [];
	const artistIDs: string[] = [];

	if (response[0] === "error") {
		return [GetRedirectHtml(), []];
	}

	response.forEach((items, index) => {
		const image = items.images[1].url;
		const artist = items.name;
		artistIDs.push(items.id);

		if (index === 2) {
			console.log("Artists", items);
		}

		htmlList.push(buildJSX("artist", index + 1, image, artist));
	});

	return [htmlList, artistIDs];
};

const getTopTracks = (token: string): [JSX.Element[], string[]] => {
	const response = GetDataFromSpotifyAPI("tracks", token);
	const htmlList: JSX.Element[] = [];
	const albumIDs: string[] = [];

	if (response[0] === "error") {
		return [GetRedirectHtml(), []];
	}

	response.forEach((items, index) => {
		const image = items.album.images[1].url;
		const track = items.name;
		albumIDs.push(items.album.id);

		if (index === 0) {
			console.log("Tracks", items);
		}

		htmlList.push(buildJSX("track", index + 1, image, track));
	});

	return [htmlList, albumIDs];
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
	/**
	 * TODO: メモリリークが起こらないように limit を50にする
	 * offset を使う？
	 */
	const uri = `https://api.spotify.com/v1/me/top/${type}?limit=30`;

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
	const token = useContext(TokenContext);
	const [topArtists, artistIDs] = getTopArtists(token);
	const [topTracks, albumIDs] = getTopTracks(token);

	return (
		<div>
			{topArtists} <br />
			{topTracks}
			<GetAdditional artistIDs={artistIDs} albumIDs={albumIDs} />
		</div>
	);
};

export default Personalization;
