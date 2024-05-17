import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../../firebase';
interface Form {
	theme: string;
	id: string;
	answers?: any[];
}

const Admin = () => {
	const [theme, setTheme] = useState('');
	const [forms, setForms] = useState<Form[]>([]);
	const [visibleForms, setVisibleForms] = useState<Record<string, boolean>>(
		{}
	);
	const [visibleAnswers, setVisibleAnswers] = useState<
		Record<string, boolean>
	>({});
	const createForm = async (formData: Form) => {
		const formId = Date.now().toString(); // use the current timestamp as the form ID
		await setDoc(doc(collection(firestore, 'forms'), formId), formData);
	};

	useEffect(() => {
		const fetchForms = async () => {
			const formsCollection = collection(firestore, 'forms');
			const formsSnapshot = await getDocs(formsCollection);
			const formsData = await Promise.all(
				formsSnapshot.docs.map(async (doc) => {
					const form = doc.data();
					const answersSnapshot = await getDocs(
						collection(doc.ref, 'answers')
					);
					const answers = answersSnapshot.docs.map((doc) =>
						doc.data()
					);
					return { id: doc.id, theme: form.theme, answers };
				})
			);
			setForms(formsData);
			setVisibleForms(
				formsData.reduce(
					(acc, form) => ({ ...acc, [form.id]: false }),
					{}
				)
			);
			setVisibleAnswers(
				formsData.reduce(
					(acc, form) => ({ ...acc, [form.id]: false }),
					{}
				)
			);
		};

		fetchForms();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!theme) return;
		await createForm({ theme });
		setTheme('');
		window.location.reload();
	};

	const handleFormClick = (form: Form) => {
		setVisibleForms({
			...visibleForms,
			[form.id]: !visibleForms[form.id],
		});
	};
	const handleAnswerClick = (form: Form) => {
		setVisibleAnswers({
			...visibleAnswers,
			[form.id]: !visibleAnswers[form.id],
		});
	};

	return (
		<>
			<div className='flex flex-col justify-center align-middle text-center mt-8'>
				<h1 className='text-3xl'>Novo Formulário</h1>
				<form
					onSubmit={handleSubmit}
					className='flex place-items-center self-center w-[90%] md:w-[60%] p-5 flex-col'
				>
					<input
						type='text'
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						placeholder='Tema do Formulário'
						className='border-4 border-blue-400 p-2 m-2 w-full md:w-[80%] rounded-2xl'
					/>
					<button
						className='bg-blue-600 text-white p-2 rounded-lg'
						type='submit'
					>
						Criar Formulário
					</button>
				</form>
			</div>

			<h1 className='text-3xl my-10 text-center'>
				Formulários Disponíveis:
			</h1>
			<div className=' items-center text-center flex-col flex'>
				{forms.map((form) => {
					const totalsBySetor: {
						[key: string]: {
							sum1: number;
							sum2: number;
							sum3: number;
							count: number;
						};
					} = {};

					form.answers?.forEach((answer) => {
						if (!totalsBySetor[answer.setor]) {
							totalsBySetor[answer.setor] = {
								sum1: 0,
								sum2: 0,
								sum3: 0,
								count: 0,
							};
						}
						totalsBySetor[answer.setor].sum1 += parseInt(
							answer.question1
						);
						totalsBySetor[answer.setor].count += 1;
						totalsBySetor[answer.setor].sum2 += parseInt(
							answer.question2
						);

						totalsBySetor[answer.setor].sum3 += parseInt(
							answer.question3
						);
					});

					let totalQuestion1 = 0;
					let totalQuestion2 = 0;
					let totalQuestion3 = 0;
					const totalQuestion4: string[] = [];

					form.answers?.map((answer) => {
						totalQuestion1 += parseInt(answer.question1);
						totalQuestion2 += parseInt(answer.question2);
						totalQuestion3 += parseInt(answer.question3);
						totalQuestion4.push(answer.question4);
					});

					return (
						<div
							className='w-full flex flex-col items-center justify-center'
							key={form.id}
						>
							<button
								onClick={() => handleFormClick(form)}
								className='bg-blue-500 p-4 w-full md:w-[70%] min-w-fit m-2 text-2xl rounded-2xl text-white font-bold'
							>
								<h2 className=''>{form.theme}</h2>
								{/* Render other form fields here */}
							</button>
							{form.answers?.length ? (
								<div
									style={{
										maxHeight: visibleForms[
											form.id
										]
											? '2000px'
											: '0',
										transition:
											'max-height 0.5s ease-in-out',
										overflow: 'hidden',
									}}
									className=' max-w-[70%] flex justify-center w-full overflow-hidden flex-col'
								>
									<table className='my-4 self-center'>
										<tr>
											<td className=''>
												Quantidade de
												Respostas:
											</td>
											<td className='text-center '>
												{
													form.answers
														?.length
												}
											</td>
										</tr>
										<tr>
											<td className=''>
												Média Pergunta 1:
											</td>
											<td className='text-center '>
												{(
													totalQuestion1 /
													form.answers
														.length
												).toFixed(2)}
											</td>
										</tr>
										<tr>
											<td className=''>
												Média Pergunta 2:
											</td>
											<td className='text-center '>
												{(
													totalQuestion2 /
													form.answers
														.length
												).toFixed(2)}
											</td>
										</tr>
										<tr>
											<td className=''>
												Média Pergunta 3:
											</td>
											<td className='text-center '>
												{(
													totalQuestion3 /
													form.answers
														.length
												).toFixed(2)}
											</td>
										</tr>
									</table>
									<h1 className='text-xl font-bold'>
										Médias por setor
									</h1>
									<table className='w-[70%] my-4 self-center'>
										<tr>
											<th>Setor</th>
											<th>Pergunta 1</th>
											<th>Pergunta 2</th>
											<th>Pergunta 3</th>
										</tr>
										{Object.entries(totalsBySetor)
											.sort(
												(
													[setorA],
													[setorB]
												) =>
													setorA.localeCompare(
														setorB
													)
											)
											.map(
												([
													setor,
													{
														sum1,
														sum2,
														sum3,
														count,
													},
												]) => (
													<tr
														key={
															setor
														}
													>
														<td>
															{
																setor
															}
														</td>
														<td>
															{(
																sum1 /
																count
															).toFixed(
																2
															)}
														</td>
														<td>
															{(
																sum2 /
																count
															).toFixed(
																2
															)}
														</td>
														<td>
															{(
																sum3 /
																count
															).toFixed(
																2
															)}
														</td>
													</tr>
												)
											)}
									</table>
									<button
										className='bg-blue-400 p-4 w-full md:w-[50%] min-w-fit m-2 text-2xl rounded-2xl text-white font-bold self-center'
										onClick={() =>
											handleAnswerClick(form)
										}
									>
										Mostrar Respostas Escritas
									</button>
									<ul
										style={{
											maxHeight:
												visibleAnswers[
													form.id
												]
													? '2000px'
													: '0',
											transition:
												'max-height 0.5s ease-in-out',
											overflow: 'hidden',
										}}
									>
										{totalQuestion4.map(
											(question4) => (
												<>
													<li className='text-justify'>{`"${question4}"`}</li>
													<br />
												</>
											)
										)}
									</ul>
								</div>
							) : null}
						</div>
					);
				})}
			</div>
		</>
	);
};
export default Admin;
