import './App.scss';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './slices/index.js'
import Main from './components/Main.jsx'

function App() {
  return (
    <Provider store={store}>  
      <Header />
      <Main />
    </Provider>
  );
}

export default App;
