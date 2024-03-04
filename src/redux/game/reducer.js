import { types } from './types';
import {
	checkForMatch,
	createCards,
} from '../../utils/helper functions/helperFunctions';

const {
	SELECT_CARD,
	MATCH_CARDS,
	RESET_GAME,
	CREATE_CARDS,
	UPDATE_NUMBER_OF_CARDS,
	SET_TIMER,
	TICK_TIMER,
	START_TIMER,
	STOP_TIMER,
	INCREASE_FLIP_COUNT,
	SET_IS_MATCHING,
} = types;

const initialState = {
	selectedCards: [],
	matchedCards: 0,
	totalCards: 4,
	cards: [],
	gameOver: false,
	isMatching: false,
	timer: {
		id: null,
		isRunning: false,
		elapsedTime: 0,
	},
	flipCount: 0,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case SELECT_CARD:
			if (
				action.payload.matched ||
				state.selectedCards.length === 2 ||
				state.selectedCards.some((card) => card === action.payload)
			) {
				return state;
			}
			const cardIndex = state.cards.indexOf(action.payload);
			const card = state.cards[cardIndex];
			const cardsCopy = [...state.cards];
			cardsCopy[cardIndex] = { ...card, flipped: !card?.flipped };
			return {
				...state,
				selectedCards: [...state.selectedCards, cardsCopy[cardIndex]],
				cards: cardsCopy,
			};

		case MATCH_CARDS:
			let [card1, card2] = state.selectedCards;
			const { newMatchedCards, newCards, newGameOver } = checkForMatch(
				state,
				[...state.cards],
				card1,
				card2
			);
			return {
				...state,
				matchedCards: newMatchedCards,
				cards: newCards,
				selectedCards: [],
				gameOver: newGameOver,
			};

		case CREATE_CARDS:
			const cards = createCards(state.totalCards, '../../utils/images');
			return { ...state, cards };

		case RESET_GAME:
			return {
				...state,
				matchedCards: 0,
				selectedCards: [],
				cards: [],
				gameOver: false,
				flipCount: 0,
				timer: {
					...state.timer,
					elapsedTime: 0,
					isRunning: false,
				},
			};

		case UPDATE_NUMBER_OF_CARDS:
			return { ...state, totalCards: action.payload };

		case SET_TIMER:
			return { ...state, timer: { ...state.timer, id: action.payload } };

		case TICK_TIMER:
			return {
				...state,
				timer: { ...state.timer, elapsedTime: state.timer.elapsedTime + 1 },
			};

		case START_TIMER:
			return { ...state, timer: { ...state.timer, isRunning: true } };

		case STOP_TIMER:
			return { ...state, timer: { ...state.timer, isRunning: false } };

		case INCREASE_FLIP_COUNT:
			return {
				...state,
				flipCount: state.flipCount + 1,
			};
		case SET_IS_MATCHING:
			return {
				...state,
				isMatching: action.payload,
			};

		default:
			return state;
	}
}
export default reducer;
