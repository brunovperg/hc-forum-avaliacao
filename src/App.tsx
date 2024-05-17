import { AnswerProvider } from 'context/AnswerContext';
import Admin from 'pages/Admin';
import Form from 'pages/Form';
import Home from 'pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<AnswerProvider>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route
							path='/forms/:formId'
							element={<Form />}
						/>
						<Route path='/admin' element={<Admin />} />
						<Route path='*' element={<h1>Not Found</h1>} />
					</Routes>
				</BrowserRouter>
			</AnswerProvider>
		</>
	);
}

export default App;
