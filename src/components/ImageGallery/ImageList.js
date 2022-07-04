import React from 'react';

import classes from './ImageList.module.css';

const ImageList = React.memo((props) => {
	return (
		<section className={classes.images}>
			{props.images.map((photo) => (
				<div key={photo.id} className={classes.photo}>
					<a href={photo.url} target='_blank' rel='noopener noreferrer'>
						<div className={classes.image}>
							<img src={photo.imageurl.medium} alt={photo.photographer} />
						</div>
						<p>{photo.photographer}</p>
					</a>
				</div>
			))}
		</section>
	);
});

export default ImageList;
