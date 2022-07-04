import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../hook/http';
import { imageActions } from '../../store/images-slice';

import classes from './Search.module.css';

const Search = React.memo(() => {
	const dispatch = useDispatch();
	const pages = useSelector((state) => state.images.pages);
	const [enteredSearch, setEnteredSearch] = useState('');
	const inputRef = useRef();
	const { isLoading, data, error, sendRequest, baseUrl } = useHttp();

	// Get Current and Search Images
	useEffect(() => {
		const timer = setTimeout(() => {
			if (enteredSearch === inputRef.current.value) {
				const query =
					enteredSearch.length === 0
						? `curated?page=${pages}&per_page=10`
						: `search?query=${enteredSearch}&page=${pages}&per_page=10`;
				sendRequest(baseUrl + query, 'GET');
			}
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [baseUrl, enteredSearch, inputRef, pages, sendRequest]);

	// Updates Images
	useEffect(() => {
		if (!isLoading && !error && data) {
			const loadedImages = [];
			console.log(data);
			for (const key in data.photos) {
				loadedImages.push({
					id: key,
					imageurl: data.photos[key].src,
					photographer: data.photos[key].photographer,
					url: data.photos[key].photographer_url,
				});
			}
			console.log(loadedImages);
			dispatch(
				imageActions.updateImages({
					images: loadedImages,
					page: data.page,
					prevPage: data.prev_page,
					nextPage: data.next_page,
				})
			);
		}
	}, [data, isLoading, error, dispatch]);

	const inputHandler = (event) => setEnteredSearch(event.target.value);
	return (
		<input
			ref={inputRef}
			type='text'
			placeholder='Search'
			id={classes.search}
			onChange={inputHandler}
		/>
	);
});

export default Search;
