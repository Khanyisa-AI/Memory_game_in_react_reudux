import { Box, Typography, Button } from '@mui/material';

function GameComplete({ onOkay, completionTime, totalCardFlips }) {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 1,
			}}>
			<Box
				sx={{
					backgroundColor: '#fff',
					padding: '32px',
					borderRadius: '8px',
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.24)',
					textAlign: 'center',
				}}>
				<Typography
					data-testid='game-complete-text'
					variant='h5'
					component='h2'
					sx={{ marginBottom: '16px' }}>
					Congratulations! You won the game.
				</Typography>
				<Typography
					data-testid='completion-time-text'
					variant='body1'
					sx={{ marginBottom: '16px' }}>
					Completion Time: {completionTime} seconds
				</Typography>
				<Typography
					data-testid='completion-time-text'
					variant='body1'
					sx={{ marginBottom: '16px' }}>
					You made {totalCardFlips} flips
				</Typography>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button data-testid='ok-button' variant='outlined' onClick={onOkay}>
						OK
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default GameComplete;
