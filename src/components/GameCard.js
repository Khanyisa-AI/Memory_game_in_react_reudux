import { Card, CardMedia } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectCard, increaseFlipCount } from '../redux/game/actions';

function GameCard({ card, width, height, id }) {
	const isMatching = useSelector((state) => state.isMatching);
	const { imgUrl, flipped } = card;
	const dispatch = useDispatch();

	const handleClick = () => {
		if (isMatching) return;
		dispatch(selectCard(card));
		if (!card.flipped) dispatch(increaseFlipCount(card));
	};

	return (
		<Card
			data-testid={`game-card-${id}`}
			onClick={handleClick}
			sx={{
				width,
				height,
				transition: 'transform 0.5s',
				transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
			}}>
			<CardMedia
				component='img'
				image={require('../utils/images/7.jpg')}
				alt='hiding-face'
				sx={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					zIndex: flipped ? '-1' : '1',
				}}
			/>
			<CardMedia
				component='img'
				image={imgUrl}
				alt={imgUrl}
				sx={{
					width: '100%',
					height: '100%',
					objectFit: 'contain',
					zIndex: flipped ? '1' : '-1',
				}}
			/>
		</Card>
	);
}

export default GameCard;
