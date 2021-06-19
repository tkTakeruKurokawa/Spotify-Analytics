import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import { TokenContext } from "../../../App";

type Props = {
	artistIDs: string[];
	albumIDs: string[];
};

const FetchAlbums = (token: string, albumIDs: string[]) => {
	const [response, setResponse] = useState<any>([]);
	const uri = "https://api.spotify.com/v1/albums?ids=" + albumIDs;
	console.log(uri);

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
				setResponse(response);
			})
			.catch((error) => {
				setResponse(["error"]);
				console.log(error);
			});
	}, []);

	return response;
};

const GetAdditional: FC<Props> = ({ artistIDs, albumIDs }) => {
	const token = useContext(TokenContext);
	const albums = FetchAlbums(token, albumIDs);

	console.log(albums);

	return <></>;
};

export default GetAdditional;
