import { types } from './types';

export const selectCard = (card) => ({
	type: types.SELECT_CARD,
	payload: card,
});

export const matchCards = () => ({
	type: types.MATCH_CARDS,
});

export const resetGame = () => ({
	type: types.RESET_GAME,
});

export const createCards = () => ({
	type: types.CREATE_CARDS,
});

export const changeNumberOfCards = (numberOfCards) => ({
	type: types.UPDATE_NUMBER_OF_CARDS,
	payload: numberOfCards,
});

export const startTimer = () => ({
	type: types.START_TIMER,
});

export const tickTimer = () => ({
	type: types.TICK_TIMER,
});

export const stopTimer = () => ({
	type: types.STOP_TIMER,
});

export const setTimer = (timerId) => ({
	type: types.SET_TIMER,
	payload: timerId,
});

export const setGameOver = () => ({
	type: types.SET_GAME_OVER,
});

export const increaseFlipCount = (card) => ({
	type: types.INCREASE_FLIP_COUNT,
	payload: card,
});

export const setIsMatching = (isMatching) => {
	return {
		type: types.SET_IS_MATCHING,
		payload: isMatching,
	};
};
