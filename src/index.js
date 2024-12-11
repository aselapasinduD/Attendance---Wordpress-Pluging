import {createRoot} from 'react-dom';
import App from './app';
import './style.scss';

const root = createRoot(document.getElementById('attendance-app-root'));
window.addEventListener('DOMContentLoaded', function () {
	root.render(<App />);
}, false);