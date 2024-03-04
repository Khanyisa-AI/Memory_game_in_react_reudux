import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import GameCard from './GameCard';
import { useSelector, useDispatch } from 'react-redux';
import {
	startTimerThunk,
	stopTimerThunk,
	setIsMatchingForOneSecond,
} from '../redux/game/thunks';
import { resetGame, matchCards, createCards } from '../redux/game/actions';
import {
	calculateGridSize,
	updateCardSize,
	updateGridSize,
} from '../utils/helper functions/helperFunctions';
import GameComplete from './GameComplete';

const GridContainer = styled('div')(({ theme }) => ({
	display: 'grid',
	gridGap: theme.spacing(2),
}));

function GameBoard() {
	const dispatch = useDispatch();
	const cards = useSelector((state) => state.cards);
	const selectedCards = useSelector((state) => state.selectedCards);
	const cardFlips = useSelector((state) => state.flipCount);
	const gameOver = useSelector((state) => state.gameOver);
	const [showPopup, setShowPopup] = useState(false);
	const [gridSize, setGridSize] = useState('2x2');
	const elapsedTime = useSelector((state) => state.timer.elapsedTime);
	const [resizedWidth, setResizedWidth] = useState(160);
	const [resizedHeight, setResizedHeight] = useState(160);

	useEffect(() => {
		dispatch(createCards());
	}, [dispatch]);

	useEffect(() => {
		if (gameOver) {
			dispatch(stopTimerThunk());
			setShowPopup(true);
		}
	}, [gameOver, dispatch]);

	useEffect(() => {
		if (selectedCards.length === 1) {
			dispatch(startTimerThunk());
		} else if (selectedCards.length === 2) {
			dispatch(setIsMatchingForOneSecond());
			setTimeout(() => {
				dispatch(matchCards());
			}, 1000);
		}
	}, [selectedCards, dispatch]);

	function onOkay() {
		setShowPopup(false);
	}

	function onRestart() {
		dispatch(stopTimerThunk());
		dispatch(resetGame());
		dispatch(createCards());
	}

	function handleGridSizeChange(event) {
		const newGridSize = event.target.value;
		setGridSize(newGridSize);
		updateGridSize(newGridSize, dispatch, onRestart);
	}

	useEffect(() => {
		const [newWidth, newHeight] = updateCardSize();
		setResizedWidth(newWidth);
		setResizedHeight(newHeight);
		window.addEventListener('resize', updateCardSize);
		return () => {
			window.removeEventListener('resize', updateCardSize);
		};
	}, []);

	return (
		<Box
			data-testid='game-card'
			sx={{
				position: 'relative',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: '20px',
				}}>
				<Typography variant='h6' sx={{ marginBottom: '8px' }}>
					Elapsed Time: {elapsedTime} seconds
				</Typography>
				<Typography variant='h6'>Moves: {cardFlips}</Typography>
			</Box>
			<Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '20px',
					}}>
					<GridContainer style={calculateGridSize(gridSize)}>
						{cards.map((card, index) => (
							<GameCard
								key={index}
								card={card}
								id={index}
								width={resizedWidth}
								height={resizedHeight}
							/>
						))}
					</GridContainer>
				</Box>
				{showPopup && (
					<GameComplete
						onOkay={onOkay}
						completionTime={elapsedTime}
						totalCardFlips={cardFlips}
					/>
				)}
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						variant='contained'
						onClick={onRestart}
						style={{ marginRight: '16px' }}>
						Restart
					</Button>
					<select value={gridSize} onChange={handleGridSizeChange}>
						<option value='2x2'>2 x 2</option>
						<option value='2x3'>2 x 3</option>
						<option value='3x4'>3 x 4</option>
					</select>
				</Box>
			</Box>
		</Box>
	);
}

export default GameBoard;
