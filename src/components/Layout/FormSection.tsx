
import PersonalInfo from '../Form/PersonalInfo'
import Skills from '../Form/Skills'
import Experience from '../Form/Experience'

function FormSection() {
  return (
    <div className="flex flex-col p-8">
      <h1 className="text-2xl font-bold mb-6">Monte seu curriculo </h1>

      <form className="space-y-6" autoComplete="off">
        <PersonalInfo />
		<Skills />
		< Experience/>
      </form>
    </div>
  );
}

export default FormSection;

const styles = `

	.formTest {
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 6px;
		max-width: 400px;
		margin: 0 auto;
	}

	input {
		width: 100%;
		box-sizing: border-box;
	}
`
