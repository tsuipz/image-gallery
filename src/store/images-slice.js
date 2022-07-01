import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	images: [],
	pages: 1,
	MAX_PAGES: 800,
};

const imagesSlice = createSlice({
	name: 'images',
	initialState,
	reducers: {
		updateImages(state, action) {
			state.images = action.payload;
		},
		nextPage(state) {
			state.pages++;
		},
		prevPage(state) {
			state.pages--;
		},
	},
});

export const imageActions = imagesSlice.actions;

export default imagesSlice.reducer;
