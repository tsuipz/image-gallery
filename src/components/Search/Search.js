import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../hook/http';
import { imageActions } from '../../store/images-slice';

import classes from './Search.module.css';

const Search = React.memo(() => {
	const dispatch = useDispatch();
	const pages = useSelector((state) => state.images.pages);
	const isRefresh = useSelector((state) => state.images.refresh);
	const [enteredSearch, setEnteredSearch] = useState('');
	const inputRef = useRef();
	const { isLoading, data, error, sendRequest, baseUrl } = useHttp();

	// Get Current and Search Images
	useEffect(() => {
		let currentPage, currentSearch;
		if (isRefresh) {
			if (sessionStorage.getItem('page')) {
				currentPage = sessionStorage.getItem('page');
			} else {
				currentPage = pages;
			}
			if (sessionStorage.getItem('query')) {
				currentSearch = sessionStorage.getItem('query');
				inputRef.current.value = currentSearch;
				setEnteredSearch(sessionStorage.getItem('query'));
			} else {
				currentSearch = enteredSearch;
			}
			dispatch(imageActions.updateRefresh({ page: currentPage }));
		} else {
			currentPage = pages;
			currentSearch = enteredSearch;
		}

		const timer = setTimeout(() => {
			if (currentSearch === inputRef.current.value) {
				const query =
					currentSearch.length === 0
						? `curated?page=${currentPage}&per_page=10`
						: `search?query=${currentSearch}&page=${currentPage}&per_page=10`;
				sessionStorage.setItem('page', currentPage);
				sessionStorage.setItem('query', currentSearch);
				sendRequest(baseUrl + query, 'GET');
			}
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [baseUrl, dispatch, enteredSearch, inputRef, isRefresh, pages, sendRequest]);

	// Updates Images
	useEffect(() => {
		if (!isLoading && !error && data) {
			const loadedImages = [];
			for (const key in data.photos) {
				loadedImages.push({
					id: key,
					imageurl: data.photos[key].src,
					photographer: data.photos[key].photographer,
					url: data.photos[key].photographer_url,
				});
			}
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
