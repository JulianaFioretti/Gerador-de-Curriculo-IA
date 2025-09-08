
import PersonalInfo from '../Form/PersonalInfo'
import Skills from '../Form/Skills'
import Experience from '../Form/Experience';

function FormSection() {
	return (
		<>
			<div className="flex flex-col p-8 max-w-3xl mx-auto">
				<h1 className="text-2xl font-bold mt-4">Monte seu currículo </h1>
				<PersonalInfo />
				<Skills />
				<Experience />
			</div>
		</>
	)
};

export default FormSection;

