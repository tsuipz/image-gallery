import './App.css';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Card from './components/UI/Card';
import Header from './components/Header/Header';

function App() {
	return (
		<main className='center app'>
			<Card>
				<Header />
				<ImageGallery />
			</Card>
		</main>
	);
}

export default App;
