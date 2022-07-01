import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useHttp from '../../hook/http';
import { imageActions } from '../../store/images-slice';

import classes from './Search.module.css';

const Search = React.memo(() => {
	const dispatch = useDispatch();
	const [enteredSearch, setEnteredSearch] = useState('');
	const inputRef = useRef();
	const { isLoading, data, error, sendRequest, baseUrl } = useHttp();

	// Get Current and Search Images
	useEffect(() => {
		const timer = setTimeout(() => {
			if (enteredSearch === inputRef.current.value) {
				const query =
					enteredSearch.length === 0
						? 'curated?page=1&per_page=10'
						: `search?query=${enteredSearch}&page=1&per_page=10`;
				sendRequest(baseUrl + query, 'GET');
			}
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [baseUrl, enteredSearch, inputRef, sendRequest]);

	// Updates Images
	useEffect(() => {
		if (!isLoading && !error && data) {
			const loadedImages = [];
			for (const key in data.photos) {
				loadedImages.push({
					id: key,
					imageurl: data.photos[key].src,
				});
			}
			dispatch(imageActions.updateImages(loadedImages));
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
