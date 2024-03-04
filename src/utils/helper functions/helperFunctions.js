import { changeNumberOfCards } from '../../redux/game/actions';

export function createCards(totalCards) {
	const newCards = [];
	for (let i = 1; i <= totalCards / 2; i++) {
		newCards.push({
			id: i,
			imgUrl: require(`../images//${i}.png`),
		});
	}
	const shuffledCards = newCards
		.concat(newCards.map((card) => ({ ...card })))
		.sort(() => Math.random() - 0.5);
	return shuffledCards;
}

export function checkForMatch(state, newCards, card1, card2) {
	let newMatchedCards = state.matchedCards;
	let newGameOver = state.gameOver;
	const card1Index = newCards.indexOf(card1);
	const card2Index = newCards.indexOf(card2);

	if (card1.id === card2.id) {
		newMatchedCards += 2;
		newCards[card1Index] = { ...newCards[card1Index], matched: true };
		newCards[card2Index] = { ...newCards[card2Index], matched: true };
	} else {
		newCards[card1Index] = { ...newCards[card1Index], flipped: false };
		newCards[card2Index] = { ...newCards[card2Index], flipped: false };
	}

	if (newMatchedCards === state.totalCards) {
		newGameOver = true;
	}

	return { newMatchedCards, newCards, newGameOver };
}

export function calculateGridSize(gridSize) {
	const [rows, columns] = gridSize.split('x').map(Number);
	const newNumberOfCards = rows * columns;
	const isLargeMobile = window.innerWidth < 481;
	const isTablet = window.innerWidth < 1186;
	let gridColumnCount = columns;
	if (isLargeMobile) {
		gridColumnCount = 2;
	}
	if (isLargeMobile && newNumberOfCards > 6) {
		gridColumnCount = 3;
	}
	if (isTablet && gridColumnCount === 4) gridColumnCount = 3;

	return {
		gridTemplateColumns: `repeat(${gridColumnCount}, 1fr)`,
	};
}

export function updateCardSize() {
	const cardWidth = 160;
	const cardHeight = 160;

	const maxWidth = window.innerWidth * 0.8;
	const maxHeight = window.innerHeight * 0.8;

	const aspectRatio = cardWidth / cardHeight;

	let newWidth = cardWidth;
	let newHeight = cardHeight;

	if (cardWidth > maxWidth) {
		newWidth = maxWidth;
		newHeight = newWidth / aspectRatio;
	}

	if (newHeight > maxHeight) {
		newHeight = maxHeight;
		newWidth = newHeight * aspectRatio;
	}
	return [newWidth, newHeight];
}

export function updateGridSize(newGridSize, dispatch, onRestart) {
	const gridSize = newGridSize.split('x');
	const rows = parseInt(gridSize[0]);
	const columns = parseInt(gridSize[1]);
	dispatch(changeNumberOfCards(rows * columns));
	onRestart();
}
