import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

let store;

const initialState = {
	showFilter: false,
	showLegend: false,
	place: {
		name: 'Place',
	},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SHOW_FILTER':
			return {
				...state,
				showFilter: true,
				showLegend: false,
			};
		case 'SHOW_LEGEND':
			return {
				...state,
				showFilter: false,
				showLegend: true,
			};
		case 'HIDE_MENU':
			return {
				...state,
				showFilter: false,
				showLegend: false,
			};
		case 'SELECT_PLACE': {
			console.log('action', action);

			return {
				...state,
				place: null,
			};
		}
		case 'DESELECT_PLACE':
			return {
				...state,
				place: null,
			};
		default:
			return state;
	}
};

function initStore(preloadedState = initialState) {
	return createStore(
		reducer,
		preloadedState,
		composeWithDevTools(applyMiddleware())
	);
}

export const initializeStore = (preloadedState) => {
	let _store = store ?? initStore(preloadedState);

	// After navigating to a page with an initial Redux state, merge that state
	// with the current state in the store, and create a new store
	if (preloadedState && store) {
		_store = initStore({
			...store.getState(),
			...preloadedState,
		});
		// Reset the current store
		store = undefined;
	}

	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store;
	// Create the store once in the client
	if (!store) store = _store;

	return _store;
};

export const useStore = (initialState) => {
	const store = useMemo(() => initializeStore(initialState), [initialState]);

	return store;
};
