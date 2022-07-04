import React from 'react';

import classes from './ImageList.module.css';

const ImageList = React.memo((props) => {
	return (
		<section className={classes.images}>
			{props.images.map((photo) => (
				<div key={photo.id}>
					<img src={photo.imageurl.medium} alt='' />
				</div>
			))}
		</section>
	);
});

export default ImageList;
