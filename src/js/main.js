// required for styleshee to be included during webpack bundling
import '../sass/screen.scss';
import App from './App';

var app;
const startMeUp = () => {
	app = new App();
	app.start();
};

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
	startMeUp();
} else {
	document.addEventListener('DOMContentLoaded', startMeUp);
}
