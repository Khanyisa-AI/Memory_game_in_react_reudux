import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import reducer from '../redux/game/reducer';
import { Provider } from 'react-redux';

export function setupStore(preloadedState) {
	return configureStore({
		reducer: reducer,
		preloadedState,
	});
}

export function renderWithStore(component, store) {
	return render(<Provider store={store}>{component}</Provider>);
}
