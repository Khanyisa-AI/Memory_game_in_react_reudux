import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameComplete from '../components/GameComplete';

describe('GameComplete component', () => {
	it('renders a message and an "OK" button', () => {
		const onOkay = jest.fn();
		render(<GameComplete onOkay={onOkay} />);
		expect(screen.getByText('Congratulations! You won the game.')).toBeTruthy();
		expect(screen.getByRole('button', { name: 'OK' })).toBeTruthy();
	});

	it('calls the onOkay callback when the "OK" button is clicked', () => {
		const onOkay = jest.fn();
		render(<GameComplete onOkay={onOkay} />);
		const okButton = screen.getByRole('button', { name: 'OK' });
		fireEvent.click(okButton);
		expect(onOkay).toHaveBeenCalledTimes(1);
	});
});
