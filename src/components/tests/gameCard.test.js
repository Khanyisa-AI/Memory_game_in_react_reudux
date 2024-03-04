import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import GameCard from '../GameCard';

const mockStore = configureStore([]);

describe('GameCard', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			selectedCards: [],
			cards: [{ id: 1, imgUrl: '1.avif', flipped: false }],
		});
	});

	

	it('should render the hiding-face image when flipped is false', () => {
		render(
			<Provider store={store}>
				<GameCard card={{ id: 1, imgUrl: '1.avif', flipped: false }} />
			</Provider>
		);
		const hidingFaceImage = screen.getByAltText('hiding-face');
		expect(hidingFaceImage).not.toBeNull();
	});
});
