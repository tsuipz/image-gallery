import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import ImageList from './ImageList';
import classes from './ImageGallery.module.css';

const ImageGallery = () => {
	const imagesList = useSelector((state) => state.images.images);

	const imageList = useMemo(() => {
		console.log(imagesList);
		console.log('hello');
		return <ImageList images={imagesList} />;
	}, [imagesList]);

	return <section>{imageList}</section>;
};

export default ImageGallery;
