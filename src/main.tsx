import ReactDOM from 'react-dom/client';
import App from './App';
import 'normalize.css';
import './global.css';
const RootElement = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
RootElement.render(<App />);
