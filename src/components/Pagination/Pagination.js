import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { imageActions } from '../../store/images-slice';

import classes from './Pagination.module.css';

const Pagination = () => {
	const dispatch = useDispatch();
	const pages = useSelector((state) => state.images.pages);
	const prevPage = useSelector((state) => state.images.prevPage);
	const nextPage = useSelector((state) => state.images.nextPage);

	const decreasePage = () => {
		dispatch(imageActions.prevPage());
	};

	const increasePage = () => {
		dispatch(imageActions.nextPage());
	};

	const showLeftArrow = () => {
		const button = (
			<button className={classes.prev} onClick={decreasePage}>
				&lt;
			</button>
		);
		return prevPage !== undefined && pages > 1 ? button : <div></div>;
	};

	const showRightArrow = () => {
		const button = (
			<button className={classes.next} onClick={increasePage}>
				&gt;
			</button>
		);
		return nextPage !== undefined ? button : <div></div>;
	};

	return (
		<section className={classes.button}>
			{showLeftArrow()}
			{pages}
			{showRightArrow()}
		</section>
	);
};

export default Pagination;
