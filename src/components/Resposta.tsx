import { useAnswer } from 'context/AnswerContext';

interface RespostaProps {
	name: string;
	value: string;
	onChange: () => void;
	text: string;
}

const Resposta = ({ name, value, onChange, text }: RespostaProps) => {
	const { selectedAnswer } = useAnswer();

	const handleChange = () => {
		onChange();
	};

	const isSelected = selectedAnswer[name] === value;
	return (
		<>
			<label
				className={`w-64 h-10 flex justify-center items-center bg-blue-300 text-center ${
					isSelected
						? 'bg-blue-700 text-white '
						: 'bg-blue-300 hover:bg-blue-400'
				} rounded-xl cursor-pointer`}
			>
				<input
					type='radio'
					name={name}
					required
					value={value}
					onChange={handleChange}
					className='appearance-none'
				/>
				<span className='text-lg font-bold'>{text}</span>
			</label>
		</>
	);
};
export default Resposta;
