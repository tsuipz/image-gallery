import React from 'react';
import Search from '../Search/Search';

import classes from './Header.module.css';

const Header = () => {
	return (
		<div className={classes.header}>
			<h1>Image Gallery</h1>
			<Search />
		</div>
	);
};

export default Header;
