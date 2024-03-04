import { configureStore } from '@reduxjs/toolkit';
import reducer from '../redux/game/reducer';

export function setupStore(preloadedState) {
  return configureStore({
    reducer: reducer,
    preloadedState
  });
}

