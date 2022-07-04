import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	images: [],
	pages: 1,
	prevPage: null,
	nextPage: null,
	refresh: true,
};

const imagesSlice = createSlice({
	name: 'images',
	initialState,
	reducers: {
		updateImages(state, action) {
			state.images = action.payload.images;
			state.pages = action.payload.page;
			state.prevPage = action.payload.prevPage;
			state.nextPage = action.payload.nextPage;
		},
		nextPage(state) {
			state.pages++;
		},
		prevPage(state) {
			state.pages--;
		},
		updateRefresh(state, action) {
			state.refresh = false;
			state.pages = action.payload.page;
		},
	},
});

export const imageActions = imagesSlice.actions;

export default imagesSlice.reducer;
