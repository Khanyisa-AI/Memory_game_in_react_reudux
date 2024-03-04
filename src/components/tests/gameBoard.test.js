import React from 'react';
import {
	render,
	fireEvent,
	screen,
	waitFor,
	act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import GameBoard from '../GameBoard';
import { setupStore } from '../../redux/testStore';
import { createCards, resetGame } from '../../redux/game/actions';

describe('GameBoard component', () => {
	let store;
	const initialState = {
		selectedCards: [],
		matchedCards: 0,
		totalCards: 4,
		cards: [],
		gameOver: false,
		timer: {
			id: null,
			isRunning: false,
			elapsedTime: 0,
		},
	};

	beforeEach(() => {
		store = setupStore(initialState);
	});

	it('should render a game board with cards', () => {
		render(
			<Provider store={store}>
				<GameBoard />
			</Provider>
		);
		const cards = screen.getAllByTestId(/^game-card-\d$/);
		expect(cards.length).toBe(4);
	});

	it('should add a card to store when a card is clicked', async () => {
		render(
			<Provider store={store}>
				<GameBoard />
			</Provider>
		);
		const card = screen.getByTestId('game-card-1');
		expect(store.getState().selectedCards.length).toBe(0);
		fireEvent.click(card);
		await waitFor(() => {
			expect(store.getState().selectedCards.length).toBe(1);
		});
	});

	it('should dispatch resetGame and createCards actions when the Restart button is clicked', () => {
		store.dispatch = jest.fn();
		render(
			<Provider store={store}>
				<GameBoard />
			</Provider>
		);
		const restartButton = screen.getByText('Restart');
		fireEvent.click(restartButton);
		expect(store.dispatch).toHaveBeenCalledWith(resetGame());
		expect(store.dispatch).toHaveBeenCalledWith(createCards());
	});

	it('should display 2x2 grid size by default', () => {
		render(
			<Provider store={store}>
				<GameBoard />
			</Provider>
		);
		const dropdown = screen.getByRole('combobox');
		expect(dropdown.value).toBe('2x2');
	});

	it('should change grid size when the dropdown value is changed', () => {
		render(
			<Provider store={store}>
				<GameBoard />
			</Provider>
		);
		const dropdown = screen.getByRole('combobox');
		fireEvent.change(dropdown, { target: { value: '3x4' } });
		expect(dropdown.value).toBe('3x4');
	});
	it('should start the timer when the first card is clicked', () => {
		render(
			<Provider store={store}>
				<GameBoard />
			</Provider>
		);
		const cards = screen.getAllByTestId('game-card-1');
		const card = cards[0];
		expect(store.getState().timer.isRunning).toBeFalsy();
		fireEvent.click(card);
		expect(store.getState().timer.isRunning).toBeTruthy();
	});
	it('should update the timer after some time', async () => {
		render(
			<Provider store={store}>
				<GameBoard />
			</Provider>
		);
		const cards = screen.getAllByTestId('game-card-1');
		const card = cards[0];
		fireEvent.click(card);
		await waitFor(() => {
			expect(store.getState().timer.elapsedTime).toBeGreaterThan(0);
		});
	});

	it('should stop the timer when the game is over', async () => {
		jest.useFakeTimers();
		render(
			<Provider store={store}>
				<GameBoard />
			</Provider>
		);
		const cards = screen.queryAllByTestId(/^game-card-\d+$/);
		for (let i = 1; i <= cards.length / 2; i++) {
			const cardsToMatch = screen.getAllByAltText(`${i}.png`);
			fireEvent.click(cardsToMatch[0]);
			expect(store.getState().timer.isRunning).toBeTruthy();
			fireEvent.click(cardsToMatch[1]);
			await act(async () => {
				jest.advanceTimersByTime(1000);
			});
		}
		expect(store.getState().timer.isRunning).toBeFalsy();
	});
});
