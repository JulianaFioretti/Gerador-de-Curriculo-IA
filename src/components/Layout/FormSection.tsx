
import PersonalInfo from '../Form/PersonalInfo'
import Skills from '../Form/Skills'
import Experience from '../Form/Experience';

function FormSection() {
	return (
		<>
			<div className="flex flex-col p-8 max-w-3xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">Monte seu curriculo </h1>
				<h2 className="text-xl font-bold mt-6 mb-4">Informações Pessoais</h2>
				<PersonalInfo />
				<h2 className="text-xl font-bold mt-6 mb-4">Habilidades</h2>
				<Skills />
				<h2 className="text-xl font-bold mt-6 mb-4">Experiências Profissionais</h2>
				<Experience />
			</div>
		</>
	)
};

export default FormSection;

