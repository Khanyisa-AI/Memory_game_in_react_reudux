import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import GameCard from '../components/GameCard';
import { selectCard, increaseFlipCount } from '../redux/game/actions';
import { renderWithStore } from './testUtils';

const mockStore = configureStore([]);

describe('GameCard', () => {
	let store;
	let card;

	beforeEach(() => {
		card = { id: 1, imgUrl: '1.avif', flipped: false };
		store = mockStore({
			selectedCards: [],
			cards: [card],
		});
		store.dispatch = jest.fn();
	});

	it('should render the hiding-face image when flipped is false', () => {
		renderWithStore(<GameCard card={card} />, store);
		const hidingFaceImage = screen.getByAltText('hiding-face');
		expect(hidingFaceImage).toBeInTheDocument();
	});

	it('should dispatch selectCard and increaseFlipCount when clicked', () => {
		renderWithStore(<GameCard card={card} id={1} />, store);
		const gameCard = screen.getByTestId(`game-card-1`);
		expect(gameCard).toBeInTheDocument();
		fireEvent.click(gameCard);
		expect(store.dispatch).toHaveBeenCalledWith(selectCard(card));
		expect(store.dispatch).toHaveBeenCalledWith(increaseFlipCount(card));
	});
});
