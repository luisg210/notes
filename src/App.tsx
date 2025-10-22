import './App.css';
import { useEffect } from 'react';
import { AppRouter } from './router/AppRouter';
import { Loading, MainTitle } from './shared';
import { useAppDispatch, useAppSelector } from './store';
import { renewTokenThunk } from './features/auth';

function App() {
  const dispatch = useAppDispatch();
  const { sessionChecked } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(renewTokenThunk());
  }, [dispatch]);

  if (!sessionChecked) {
    return (
      <>
        <MainTitle title="Restaurando sesion..." />
        <Loading />
      </>
    );
  }

  return <AppRouter />;
}

export default App;
