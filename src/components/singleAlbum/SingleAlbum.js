import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useAlbumsServices from "../../services/AlbumsServices";
import Loading from "../loading/Loading";

import './singleAlbum.scss';

const SingleAlbum = () => {
	const [album, setAlbum] = useState({});
	const {albumId} = useParams();
	const {getAlbums, loading, error} = useAlbumsServices();

	console.log('render!');

	useEffect(() => {
		getAlbums(`http://localhost:3131/albums/${albumId}`)
			.then(response => setAlbum(response));
	}, []);

	const isLoading = loading && !error ? <Loading/> : null;
	const content = !loading && !error ? <View album={album}/> : null;

	return (
		<>
			{isLoading}
			{content}
		</>
	)
}

const View = ({album}) => {
	return (
		<div className="album">
			<div className="album__title">{album.title}</div>
			<div className="album__artist">{album.artist}</div>
		</div>
	)
}

export default SingleAlbum;