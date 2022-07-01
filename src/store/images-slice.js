import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	images: [],
	startPage: 1,
	MAX_PAGES: 800,
};

const imagesSlice = createSlice({
	name: 'images',
	initialState,
	reducers: {
		updateImages(state, action) {
			console.log(action.payload);
			state.images = action.payload;
		},
		nextPage(state) {
			state.startPage++;
		},
		prevPage(state) {
			state.endPage--;
		},
	},
});

export const imageActions = imagesSlice.actions;

export default imagesSlice.reducer;
