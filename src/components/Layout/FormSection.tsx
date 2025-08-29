import { useState } from 'react'
import codificaiLogo from '../../assets/logo_codificai_b.png'

// import './FormSection.css'


//importando o tipo para não usar a forma mais verbosa devido ao typescript:
// React.FormEvent<HTMLFormElement>
// React.KeyboardEvent<HTMLInputElement>
// apenas <FormEvent> e <KeyboardEvent>
// por isso o type em import
import type { FormEvent } from 'react'
import type { KeyboardEvent } from 'react'
// Import FontAwesomeIcon and the floppy-disk icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


function FormSection() {
	const [estado, setEstado] = useState('')
	const [ultimoEstado, setUltimoEstado] = useState('')

	// Salva o texto atual e limpa o campo
	const handleSave = () => {
		if (estado.trim() !== '') {
			setUltimoEstado(estado)
			setEstado('')
		}
	}

	// Permite salvar com Enter
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSave()
		}
	}

	// Evita submit padrão do form
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		handleSave()
	}

	return (
		<>
			<style>{styles}</style> {/* Estilos globais */}

			<div>
				<a href="#" target="_blank">
					<img src={codificaiLogo} className="logo" alt="Codificaí logo" />
				</a>
			</div>
			
			<h1>Codificaí FormSection</h1>

			<form className="formTest" onSubmit={handleSubmit} autoComplete="off">
				<label htmlFor="campoTexto" style={{ display: 'block', marginBottom: 8 }}>
					Digite algo:
				</label>

				<input
					id="campoTexto"

					//estilo css inline
					style={{ padding: '8px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '6px' }}

					type="text"
					value={estado}
					onChange={e => setEstado(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Digite aqui..."
					autoFocus
					aria-label="Campo de texto"
				/>
				<p>
					{ultimoEstado
						? `Texto anterior: ${ultimoEstado}`
						: 'Nenhum texto anterior.'}
				</p>
				<button
					type="submit"
					style={{
						marginTop: '8px',
						padding: '8px 16px',
						borderRadius: '6px',
						border: 'none',
						background: '#007bff',
						color: '#fff',
						cursor: 'pointer',
						fontWeight: 'bold'
					}}
					disabled={estado.trim() === ''}
				>
					{/* ícone utilizando FontAwesome */}
					<FontAwesomeIcon icon={faFloppyDisk} />
					Salvar texto
				</button>
			</form>
		</>
	)
}

export default FormSection

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