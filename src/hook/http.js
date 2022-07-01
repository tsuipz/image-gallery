import { useCallback, useReducer } from 'react';

const API_KEY = '563492ad6f917000010000011c86afa1de1f4efe922ec4304d06edc5';
const BASE_URL = 'https://api.pexels.com/v1/';

const initialState = {
	loading: false,
	error: null,
	data: null,
	baseUrl: BASE_URL,
};

const httpReducer = (curHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return {
				loading: true,
				error: null,
				data: null,
				baseUrl: BASE_URL,
			};
		case 'RESPONSE':
			return { ...curHttpState, loading: false, data: action.responseData };
		case 'ERROR':
			return { location: false, error: action.errorMessage };
		case 'CLEAR':
			return initialState;
		default:
			throw new Error('Should not be reached!');
	}
};

const useHttp = () => {
	const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

	const sendRequest = useCallback(async (url, method, body) => {
		try {
			dispatchHttp({ type: 'SEND' });
			const response = await fetch(url, {
				method,
				body,
				headers: {
					Accept: 'application/json',
					Authorization: API_KEY,
				},
			});

			if (!response.ok) throw new Error('Send Request Failed');

			const responseData = await response.json();
			console.log(responseData);
			dispatchHttp({ type: 'RESPONSE', responseData: responseData });
		} catch (error) {
			dispatchHttp({ type: 'ERROR', errorMessage: error.message });
		}
	}, []);

	return {
		isLoading: httpState.loading,
		error: httpState.error,
		data: httpState.data,
		sendRequest: sendRequest,
		baseUrl: BASE_URL,
	};
};

export default useHttp;
