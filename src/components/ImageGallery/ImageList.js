import React from 'react';
import useHttp from '../../hook/http';

import classes from './ImageList.module.css';

const ImageList = React.memo((props) => {
	const { isLoading } = useHttp();

	return (
		<section className={classes.images}>
			{!isLoading &&
				props.images.map((photo) => (
					<div key={photo.id}>
						<img src={photo.imageurl.medium} alt='' />
					</div>
				))}
		</section>
	);
});

export default ImageList;
