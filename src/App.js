import GameBoard from './components/GameBoard';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {
	return (
		<Provider store={store}>
			<GameBoard />
		</Provider>
	);
}

export default App;
