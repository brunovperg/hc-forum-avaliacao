import Resposta from 'components/Resposta';
import { useAnswer } from 'context/AnswerContext';
import { setDoc, doc, collection, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../../firebase';

const Form = () => {
	const { formId } = useParams<{ formId: string }>();
	const navigate = useNavigate();
	const { setSelectedAnswer, selectedAnswer } = useAnswer();
	const [theme, setTheme] = useState('');
	const [question4, setQuestion4] = useState('');
	// const [email, setEmail] = useState('');
	const [ala, setAla] = useState('');
	const alas = [
		'ALA A',
		'ALA B',
		'ALA C',
		'ALA D',
		'ALA E',
		'ALA F',
		'ALA G',
		'ALA H',
		'ALA I',
		'ALA K',
		'ALA U',
		'ALA V',
		'ALA V (UTI CARDIO)',
		'ALA W',
		'ALA X (UTI)',
		'ALA Y (UTI)',
		'ALMOXARIFADO',
		'AMBULATÓRIO CONSULTÓRIO',
		'AMBULATÓRIO GERAL',
		'ANGIOCOR',
		'ARQUIVO GERAL',
		'ARQUIVO ONCOLÓGICO',
		'ASCOM',
		'ASSEJUR',
		'AUDITORIA CONVÊNIO',
		'AUDITORIA DE PRONTUÁRIOS',
		'AUDITORIA SUS',
		'BUCO-MAXILO FACIAL',
		'CAF',
		'CAPTAÇÃO DE RECURSOS',
		'CASA MATERNAL',
		'CCIH',
		'CENTRAL DE EQUIPAMENTOS',
		'CENTRO CIRÚRGICO DA CARDIO',
		'CENTRO CIRÚRGICO GERAL',
		'CME',
		'COMISSÃO DE ÓBITOS',
		'COMPLEXO TÉCNICO CIENTÍFICO',
		'COMPRAS',
		'CONSULTÓRIO URGÊNCIA',
		'CONTABILIDADE E PATRIMÔNIO',
		'CONTROLADORIA',
		'CONVÊNIOS',
		'COOPERCADIO',
		'COORDENAÇÃO DE ENFERMAGEM',
		'COREME',
		'DIREÇÃO GERAL',
		'DIRETORIA GERAL',
		'ESCOLA',
		'ESCOLA AUXILIAR DE ENFERMAGEM',
		'ESCRITORIO DA QUALIDADE',
		'FADERASE',
		'FARMÁCIA',
		'FARMÁCIA ALA U',
		'FARMÁCIA ALA V',
		'FARMÁCIA ALA X',
		'FARMÁCIA ALA Y',
		'FARMÁCIA CENTRO CIRÚRGICO',
		'FATURAMENTO',
		'FEDERASE',
		'FINANCEIRO',
		'FISIOTERAPIA',
		'FONOAUDIOLOGIA',
		'GESTÃO DE OBRAS E PROJETOS',
		'HEMOSE',
		'HEMOTERAPIA',
		'HIGIENE E LIMPEZA',
		'HOTELARIA',
		'IPES',
		'LABORATÓRIO',
		'LABORATORIO ANALISE CLINICA',
		'LABORATÓRIO IPES',
		'LAVANDERIA',
		'MANUTEN?O E CONSERVA?O',
		'MANUTENÇÃO',
		'MANUTENÇÃO E CONSERVAÇÃO',
		'MULTIPROFISSONAL',
		'NEA',
		'NEP',
		'NEW DATA',
		'NIR AMBULATORIAL',
		'NIR DIREÇÃO',
		'NIR URGÊNCIA',
		'NSP',
		'NÚCLEO DA ONCOLOGIA',
		'NÚCLEO DE REVISÃO DE PRONTUÁRIOS',
		'NÚCLEO ESTRATÉGICO',
		'NUTRIÇÃO E DIETÉTICA',
		'ONCOCIRURGIA',
		'ONCORADIUM',
		'OPME',
		'OUVIDORIA',
		'PATOLOGIA',
		'PEQUENOS PROCEDIMENTOS',
		'PORTARIA',
		'PSICOLOGIA',
		'RAIO X',
		'RECEPÇÃO DA ONCOCIRURGIA',
		'RECEPÇÃO HISTÓRICA',
		'RH',
		'SALA DE ENTREGA DE EXAMES',
		'SALA DE PRESCRIÇÃO',
		'SALA DO CONSELHO',
		'SANTA ISABEL',
		'SECRETARIAS DE CLÍNICA',
		'SERVIÇO SOCIAL',
		'SESMT',
		'TESOURARIA',
		'TI',
		'TI (ANEXO)',
		'TOMOGRAFIA',
		'TRANSPORTE',
		'AMBULATÓRIO',
		'DIREÇÃO',
		'SERVIÇO SOCIAL',
		'UDI',
		'UNIDADE MÓVEL',
		'URGÊNCIA ORTOPÉDICA',
		'UTI U',
	];
	useEffect(() => {
		const fetchForm = async () => {
			if (!formId) {
				console.error('Form ID is undefined');
				return;
			}

			const formDoc = doc(firestore, 'forms', formId);
			const formSnapshot = await getDoc(formDoc);
			if (formSnapshot.exists()) {
				setTheme(formSnapshot.data().theme);
			}
		};

		fetchForm();
	}, [formId]);

	const handleAnswerChange = (questionName: string, answerValue: string) => {
		setSelectedAnswer((prevState) => ({
			...prevState,
			[questionName]: answerValue,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!ala ||
			!question4 ||
			!selectedAnswer.question1 ||
			!selectedAnswer.question2 ||
			!selectedAnswer.question3
		) {
			alert('Por favor, responda todas as perguntas');
			return;
		}
		// const answersCollection = collection(
		// 	firestore,
		// 	'forms',
		// 	formId,
		// 	'answers'
		// );
		// const answersSnapshot = await getDocs(answersCollection);
		// const answers = answersSnapshot.docs.map((doc) => doc.data());

		// Check if email already exists
		// const emailExists = answers.some((answer) => answer.email === email);
		// if (emailExists) {
		// 	alert('Este e-mail já respondeu o formulário!');
		// 	return;
		// }
		const answersDoc = doc(
			collection(firestore, 'forms', formId, 'answers')
		);
		await setDoc(answersDoc, selectedAnswer);
		// Reset the fields
		// setEmail('');
		setQuestion4('');
		setAla('');
		setSelectedAnswer({});
		navigate('/');
	};

	return (
		<>
			<form className='max-w-3xl p-4 mx-auto' onSubmit={handleSubmit}>
				<button
					className='w-fit bg-blue-700 text-white p-2 text-xl rounded-xl'
					onClick={() => navigate('/')}
				>
					{'< Retornar a página inicial'}
				</button>
				<h1 className='text-2xl my-6'>
					Tema: <span className='font-bold'>{theme}</span>
				</h1>

				{/* <label>
					E-mail
					<br />
					<input
						className='border-4 border-black'
						type='email'
						value={email}
						required
						onChange={(e) => {
							setEmail(e.target.value);
							handleAnswerChange('email', e.target.value);
						}}
					/>
				</label> */}
				<div className='mb-6'>
					<h1 className='text-xl font-bold mb-4 text-justify'>
						Em qual setor você trabalha?
					</h1>
					<select
						className='border-4 border-blue-400 rounded-lg py-2 px-4 w-[50%]'
						value={ala}
						onChange={(e) => {
							setAla(e.target.value);
							handleAnswerChange('setor', e.target.value);
						}}
					>
						<option value=''>Selecione o setor</option>
						{alas.map((ala, index) => (
							<option key={index} value={ala}>
								{ala}
							</option>
						))}
					</select>
				</div>

				<div className='mb-6'>
					<h1 className='text-xl font-bold mb-4 text-justify'>
						Como você avalia a qualidade das ações educativas
						e treinamentos oferecidos no hospital cirurgia?
					</h1>
					<div className='space-y-2 flex-col flex'>
						<Resposta
							name='question1'
							value='10'
							onChange={() =>
								handleAnswerChange('question1', '10')
							}
							text='Excelente'
						/>
						<Resposta
							name='question1'
							value='5'
							text='Regular'
							onChange={() =>
								handleAnswerChange('question1', '5')
							}
						/>
						<Resposta
							name='question1'
							value='0'
							text='Insatisfatório'
							onChange={() =>
								handleAnswerChange('question1', '0')
							}
						/>
					</div>
				</div>
				<div className='mb-6 '>
					<h1 className='text-xl font-bold mb-4 text-justify'>
						Como você avalia a qualidade do material didático
						utilizado?
					</h1>
					<div className='space-y-2 flex-col flex'>
						<Resposta
							name='question2'
							value='10'
							onChange={() =>
								handleAnswerChange('question2', '10')
							}
							text='Excelente'
						/>
						<Resposta
							name='question2'
							value='5'
							text='Regular'
							onChange={() =>
								handleAnswerChange('question2', '5')
							}
						/>
						<Resposta
							name='question2'
							value='0'
							onChange={() =>
								handleAnswerChange('question2', '0')
							}
							text='Insatisfatório'
						/>
					</div>
				</div>
				<div className='mb-6'>
					<h1 className='text-xl font-bold mb-4 text-justify'>
						Você acredita que esta atividade trará mudanças
						para a sua prática profissional?
					</h1>
					<div className='space-y-2 flex-col flex'>
						<Resposta
							name='question3'
							value='10'
							text='Sim'
							onChange={() =>
								handleAnswerChange('question3', '10')
							}
						/>
						<Resposta
							name='question3'
							value='0'
							onChange={() =>
								handleAnswerChange('question3', '0')
							}
							text='Não'
						/>
						<Resposta
							name='question3'
							value='5'
							text='Talvez'
							onChange={() =>
								handleAnswerChange('question3', '5')
							}
						/>
					</div>
				</div>
				<div className='mb-6'>
					<h1 className='text-xl font-bold mb-4 text-justify'>
						Qual sua maior dificuldade no processo de
						trabalho?
					</h1>
					<div className='space-y-2 flex-col flex'>
						<textarea
							className='border-4 border-blue-600 rounded-xl py-2 px-6 w-full h-fit text-wrap'
							value={question4}
							onChange={(e) => {
								setQuestion4(e.target.value);
								handleAnswerChange(
									'question4',
									e.target.value
								);
							}}
						/>
					</div>
				</div>
				<button
					onClick={handleSubmit}
					className='bg-blue-700 text-white font-bold rounded-xl p-4 text-2xl mx-auto w-full my-4'
				>
					{'Enviar >'}
				</button>
			</form>
		</>
	);
};

export default Form;
