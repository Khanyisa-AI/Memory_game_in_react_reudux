import reducer from '../redux/game/reducer';
import { types } from '../redux/game/types';
import {
	tickTimer,
	startTimer,
	stopTimer,
	setTimer,
	resetGame,
} from '../redux/game/actions';

const {
	SELECT_CARD,
	MATCH_CARDS,
	INCREASE_FLIP_COUNT,
	RESET_GAME,
	CREATE_CARDS,
	UPDATE_NUMBER_OF_CARDS,
} = types;

const initialState = {
	selectedCards: [],
	matchedCards: 0,
	totalCards: 4,
	cards: [],
	gameOver: false,
	isMatching: false,
	flipCount: 0,
	timer: {
		id: null,
		isRunning: false,
		elapsedTime: 0,
	},
};

describe('Reducer', () => {
	it('returns initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('handles SELECT_CARD', () => {
		const card = { id: 1 };
		const prevState = {
			selectedCards: [],
			matchedCards: 0,
			totalCards: 12,
			cards: [card],
			gameOver: false,
		};
		const action = { type: SELECT_CARD, payload: card };
		const expectedState = {
			selectedCards: [{ ...card, flipped: true }],
			matchedCards: 0,
			totalCards: 12,
			cards: [{ ...card, flipped: true }],
			gameOver: false,
		};
		expect(reducer(prevState, action)).toEqual(expectedState);
	});

	it('handles MATCH_CARDS', () => {
		const card1 = { id: 2, flipped: true };
		const card2 = { id: 2, flipped: true };
		const prevState = {
			...initialState,
			selectedCards: [card1, card2],
			cards: [card1, card2],
		};
		const action = { type: MATCH_CARDS };
		const expectedState = {
			...prevState,
			matchedCards: 2,
			cards: [
				{ ...card1, matched: true },
				{ ...card2, matched: true },
			],
			selectedCards: [],
		};
		expect(reducer(prevState, action)).toEqual(expectedState);
	});

	it('handles CREATE_CARDS', () => {
		const action = { type: CREATE_CARDS };
		const expectedState = {
			...initialState,
			cards: expect.any(Array),
		};
		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('handles RESET_GAME', () => {
		const prevState = {
			...initialState,
			matchedCards: 6,
			selectedCards: [{ id: 1 }, { id: 2 }],
			cards: [{ id: 1, matched: true }, { id: 2 }],
			gameOver: true,
		};
		const action = { type: RESET_GAME };
		const expectedState = {
			...initialState,
			gameOver: false,
		};
		expect(reducer(prevState, action)).toEqual(expectedState);
	});

	it('handles UPDATE_NUMBER_OF_CARDS', () => {
		const prevTotalCards = 12;
		const newTotalCards = 4;
		const prevState = { ...initialState, totalCards: prevTotalCards };
		const action = { type: UPDATE_NUMBER_OF_CARDS, payload: newTotalCards };
		const expectedState = { ...prevState, totalCards: newTotalCards };
		expect(reducer(prevState, action)).toEqual(expectedState);
	});

	it('should update the timer elapsed time on TICK_TIMER', () => {
		const state = {
			...initialState,
			timer: { ...initialState.timer, elapsedTime: 5 },
		};
		const nextState = reducer(state, tickTimer());
		expect(nextState.timer.elapsedTime).toEqual(6);
	});

	it('should start the timer on START_TIMER', () => {
		const nextState = reducer(initialState, startTimer());
		expect(nextState.timer.isRunning).toBe(true);
	});

	it('should stop the timer on STOP_TIMER', () => {
		const state = {
			...initialState,
			timer: { ...initialState.timer, isRunning: true },
		};
		const nextState = reducer(state, stopTimer());
		expect(nextState.timer.isRunning).toBe(false);
	});

	it('should set the timer ID on SET_TIMER', () => {
		const timerID = 123;
		const nextState = reducer(initialState, setTimer(timerID));
		expect(nextState.timer.id).toEqual(timerID);
	});

	it('should reset the timer elapsed time on RESET_GAME', () => {
		const state = {
			...initialState,
			timer: { ...initialState.timer, elapsedTime: 10 },
		};
		const nextState = reducer(state, resetGame());
		expect(nextState.timer.elapsedTime).toEqual(0);
	});

	it('should increase the flipCount state', () => {
		const prevState = {
			...initialState,
			flipCount: 3,
		};
		const action = { type: INCREASE_FLIP_COUNT };
		const expectedState = {
			...prevState,
			flipCount: 4,
		};
		expect(reducer(prevState, action)).toEqual(expectedState);
	});
});
