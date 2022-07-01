import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../hook/http';
import { imageActions } from '../../store/images-slice';

const Pagination = () => {
	const dispatch = useDispatch();
	const pages = useSelector((state) => state.images.pages);
	const MAX_PAGES = useSelector((state) => state.images.MAX_PAGES);

	const decreasePage = () => {
		dispatch(imageActions.prevPage());
	};

	const increasePage = () => {
		dispatch(imageActions.nextPage());
	};

	const showLeftArrow = () => {
		const button = <button onClick={decreasePage}>&lt;</button>;
		return pages > 1 ? button : '';
	};

	const showRightArrow = () => {
		const button = <button onClick={increasePage}>&gt;</button>;
		return pages < MAX_PAGES ? button : '';
	};

	return (
		<section className=''>
			{showLeftArrow()}
			{pages}
			{showRightArrow()}
		</section>
	);
};

export default Pagination;
