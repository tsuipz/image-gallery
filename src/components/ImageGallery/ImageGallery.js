import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import ImageList from './ImageList';

const ImageGallery = () => {
	const imagesList = useSelector((state) => state.images.images);

	const imageList = useMemo(() => {
		return <ImageList images={imagesList} />;
	}, [imagesList]);

	return <section>{imageList}</section>;
};

export default ImageGallery;
