import React from 'react';
import { fireEvent, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameBoard from '../components/GameBoard';
import { setupStore, renderWithStore } from './testUtils';
import { createCards, resetGame } from '../redux/game/actions';
import { initialState } from '../redux/game/reducer';

describe('GameBoard component', () => {
	let store;
	beforeEach(() => {
		store = setupStore(initialState);
	});

	it('should render a game board with cards', () => {
		renderWithStore(<GameBoard />, store);
		const cards = screen.getAllByTestId(/^game-card-\d$/);
		expect(cards.length).toBe(4);
	});

	it('should add a card to store when a card is clicked', async () => {
		renderWithStore(<GameBoard />, store);
		const card = screen.getByTestId('game-card-1');
		expect(store.getState().selectedCards.length).toBe(0);
		fireEvent.click(card);
		await waitFor(() => {
			expect(store.getState().selectedCards.length).toBe(1);
		});
	});

	it('should dispatch resetGame and createCards actions when the Restart button is clicked', () => {
		store.dispatch = jest.fn();
		renderWithStore(<GameBoard />, store);
		const restartButton = screen.getByText('Restart');
		fireEvent.click(restartButton);
		expect(store.dispatch).toHaveBeenCalledWith(resetGame());
		expect(store.dispatch).toHaveBeenCalledWith(createCards());
	});

	it('should display 2x2 grid size by default', () => {
		renderWithStore(<GameBoard />, store);
		const dropdown = screen.getByRole('combobox');
		expect(dropdown.value).toBe('2x2');
	});

	it('should change grid size when the dropdown value is changed', () => {
		renderWithStore(<GameBoard />, store);
		const dropdown = screen.getByRole('combobox');
		fireEvent.change(dropdown, { target: { value: '3x4' } });
		expect(dropdown.value).toBe('3x4');
	});
	it('should start the timer when the first card is clicked', () => {
		renderWithStore(<GameBoard />, store);
		const cards = screen.getAllByTestId('game-card-1');
		const card = cards[0];
		expect(store.getState().timer.isRunning).toBeFalsy();
		fireEvent.click(card);
		expect(store.getState().timer.isRunning).toBeTruthy();
	});

	it('should update the timer after some time', async () => {
		renderWithStore(<GameBoard />, store);
		const cards = screen.getAllByTestId('game-card-1');
		const card = cards[0];
		fireEvent.click(card);
		await waitFor(() => {
			expect(store.getState().timer.elapsedTime).toBeGreaterThan(0);
		});
	});

	it('should stop the timer when the game is over', async () => {
		jest.useFakeTimers();
		renderWithStore(<GameBoard />, store);
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

	it('should increase the flipCount state once when a card is clicked', async () => {
		jest.useFakeTimers();
		renderWithStore(<GameBoard />, store);
		const card = screen.queryByTestId('game-card-1');
		expect(store.getState().flipCount).toBe(0);
		fireEvent.click(card);
		expect(store.getState().flipCount).toBe(1);
		fireEvent.click(card);
		expect(store.getState().flipCount).toBe(1);
	});
});
