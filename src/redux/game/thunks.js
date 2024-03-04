import {
	startTimer,
	tickTimer,
	setTimer,
	stopTimer,
	setIsMatching,
} from './actions';

export const startTimerThunk = () => (dispatch, getState) => {
	const { timer } = getState();
	if (!timer.isRunning) {
		dispatch(startTimer());
		const timerID = setInterval(() => {
			dispatch(tickTimer());
		}, 1000);
		dispatch(setTimer(timerID));
	}
};

export const stopTimerThunk = () => (dispatch, getState) => {
	const { timer } = getState();
	if (timer.isRunning) {
		clearInterval(timer.id);
		dispatch(stopTimer());
	}
};

export const setIsMatchingForOneSecond = () => (dispatch) => {
	dispatch(setIsMatching(true));
	setTimeout(() => {
		dispatch(setIsMatching(false));
	}, 1000);
};
