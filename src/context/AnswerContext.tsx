// AnswerContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface AnswerContextProps {
	selectedAnswer: Record<string, string>;
	setSelectedAnswer: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>;
}

const AnswerContext = createContext<AnswerContextProps | undefined>(undefined);

export const AnswerProvider: React.FC = ({ children }) => {
	const [selectedAnswer, setSelectedAnswer] = useState<
		Record<string, string>
	>({});

	return (
		<AnswerContext.Provider value={{ selectedAnswer, setSelectedAnswer }}>
			{children}
		</AnswerContext.Provider>
	);
};

export const useAnswer = () => {
	const context = useContext(AnswerContext);
	if (!context) {
		throw new Error('useAnswer must be used within an AnswerProvider');
	}
	return context;
};
