import { firestore } from '../../firebase'; // replace with the actual path to your Firebase configuration file
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

interface Form {
	theme: string;
	id: string;
}
const Home = () => {
	const [forms, setForms] = useState<Form[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchForms = async () => {
			const formsCollection = collection(firestore, 'forms');
			const formsSnapshot = await getDocs(formsCollection);
			setForms(
				formsSnapshot.docs.map((doc) => ({
					id: doc.id,
					theme: doc.data().theme,
					// add other form fields here
				}))
			);
		};

		fetchForms();
	}, []);

	return (
		<>
			<div className='flex flex-col mx-auto text-center py-10'>
				<div className=''>
					<h1 className='text-6xl'>Formulários de Satisfação</h1>
				</div>
				<h1 className='text-3xl my-10'>Formulários Disponíveis:</h1>
				<div className=' items-center flex-col flex'>
					{forms.map((form) => (
						<button
							onClick={() => navigate(`/forms/${form.id}`)}
							key={form.id}
							className='bg-blue-500 p-4 m-2 w-full md:w-[80%] text-2xl rounded-full text-white font-bold'
						>
							<h2 className=''>{form.theme}</h2>
							{/* Render other form fields here */}
						</button>
					))}
				</div>
			</div>
		</>
	);
};

export default Home;
