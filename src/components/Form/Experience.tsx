import React, { useState, useContext } from "react";
import type { Experience as ExperienceType } from "../../types/cv.types";
import { CVContext } from '../../App';
import './PersonalInfo.css';

const Experience: React.FC = () => {
	const { state, setState } = useContext(CVContext);
	const [experience, setExperience] = useState<ExperienceType>({
		id: '',
		company: "",
		role: "",
		periodStart: "",
		periodEnd: "",
		current: false,
		description: "",
	});
	const [error, setError] = useState<string>("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;
		if (type === "checkbox") {
			setExperience({
				...experience,
				[name]: (e.target as HTMLInputElement).checked,
			});
		} else {
			setExperience({
				...experience,
				[name]: value,
			});
		}
	};

	const addExperience = () => {
		if (!experience.company || !experience.role) {
			setError("Preencha os campos obrigatórios: Empresa e Cargo.");
			return;
		}
		const newExperience = { ...experience, id: Math.random().toString(36).slice(2, 9) };
		setState(prev => ({
			...prev,
			experiences: [...prev.experiences, newExperience],
		}));
		setExperience({
			id: '',
			company: "",
			role: "",
			periodStart: "",
			periodEnd: "",
			current: false,
			description: "",
		});
		setError("");
	};

	const removeExperience = (id: string) => {
		setState(prev => ({
			...prev,
			experiences: prev.experiences.filter((exp) => exp.id !== id),
		}));
	};

	return (
	<div className="form-container bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
			<h2 className="text-xl font-semibold mb-4 text-center text-gray-700 dark:text-gray-100">Experiências Profissionais</h2>
			<div>
				<input
					type="text"
					name="company"
					placeholder="Empresa"
					value={experience.company}
					onChange={handleChange}
					className="w-full border p-2 rounded mb-2"
				/>
				<input
					type="text"
					name="role"
					placeholder="Cargo"
					value={experience.role}
					onChange={handleChange}
					className="w-full border p-2 rounded mb-2"
				/>
				<input
					type="text"
					name="periodStart"
					placeholder="Início (ex: Jan/2020)"
					value={experience.periodStart}
					onChange={handleChange}
					className="w-full border p-2 rounded mb-2"
				/>
				<input
					type="text"
					name="periodEnd"
					placeholder="Fim (ex: Dez/2022)"
					value={experience.periodEnd}
					onChange={handleChange}
					className="w-full border p-2 rounded mb-2"
				/>
				<textarea
					name="description"
					placeholder="Descrição das atividades"
					value={experience.description}
					onChange={handleChange}
					className="w-full border p-2 rounded mb-2"
				/>
				<label className="flex items-center space-x-2 mb-2">
					<input
						type="checkbox"
						name="current"
						checked={experience.current}
						onChange={handleChange}
					/>
					<span>Trabalho Atual</span>
				</label>
				<button
					type="button"
					onClick={addExperience}
					className="submit-button"
				>
					Adicionar Experiência
				</button>
				{error && (
					<div className="text-red-600 mt-2 text-sm">{error}</div>
				)}
			</div>

			<ul className="space-y-2 mt-4">
				{state.experiences.map((exp) => (
					<li
						key={exp.id}
						className="border p-3 rounded flex justify-between items-start"
					>
						<div>
							<p className="font-semibold text-gray-800">{exp.role} - {exp.company}</p>
							<p className="text-sm text-gray-600">{exp.periodStart} {exp.periodEnd && `- ${exp.periodEnd}`}</p>
							<p>{exp.description}</p>
							{exp.current && <p className="text-green-600 text-sm">(Emprego Atual)</p>}
						</div>
						<button
							type="button"
							onClick={() => removeExperience(exp.id)}
							className="w-1/4 ml-4 bg-remove"
						>
							Remover
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Experience;
