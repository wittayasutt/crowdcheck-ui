import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

let store;

const initialState = {
	showDensity: false,
	showLegend: false,
	place: null,
	showPlaceName: false,
	crowdData: null,
	zoom: 12,
	filter: [],
	poi: [],
	coord: null,
	eventId: null,
	vaccinated: 0,
	openVaccinatedModal: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SHOW_DENSITY':
			return {
				...state,
				showDensity: true,
				showLegend: false,
			};
		case 'SHOW_LEGEND':
			return {
				...state,
				showDensity: false,
				showLegend: true,
			};
		case 'HIDE_MENU':
			return {
				...state,
				showDensity: false,
				showLegend: false,
			};
		case 'SELECT_PLACE': {
			return {
				...state,
				place: action.place,
			};
		}
		case 'DESELECT_PLACE':
			return {
				...state,
				place: null,
			};
		case 'TOGGLE_PLACE_NAME': {
			return {
				...state,
				showPlaceName: !state.showPlaceName,
			};
		}
		case 'SET_CROWD_DATA': {
			return {
				...state,
				crowdData: action.crowdData,
			};
		}
		case 'SET_ZOOM': {
			return {
				...state,
				zoom: action.zoom,
			};
		}
		case 'SET_FILTER': {
			return {
				...state,
				filter: action.filter,
			};
		}
		case 'SET_POI': {
			return {
				...state,
				poi: action.poi,
			};
		}
		case 'TO_LOCATION': {
			return {
				...state,
				coord: action.coord,
			};
		}
		case 'SET_EVENT_ID': {
			return {
				...state,
				eventId: action.eventId,
			};
		}
		case 'SET_VACCINATED': {
			return {
				...state,
				vaccinated: action.vaccinated,
			};
		}
		case 'SET_OPEN_VACCINATED_MODAL': {
			return {
				...state,
				openVaccinatedModal: action.openVaccinatedModal,
			};
		}
		default:
			return state;
	}
};

function initStore(preloadedState = initialState) {
	return createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware()));
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
