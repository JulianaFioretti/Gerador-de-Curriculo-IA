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

			{/* <div>
				<a href="#" target="_blank">
					<img src={codificaiLogo} className="logo" alt="Codificaí logo" />
				</a>
			</div> */}
			
			<h1>Codificaí</h1>

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
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur itaque aut velit eum incidunt, dicta possimus modi illo magni, praesentium necessitatibus autem quia neque repellat repellendus! Officiis quod ex maxime ipsum? Expedita alias quaerat minima ipsam, illo molestias dolorum! Voluptatibus temporibus dolorum sint harum veritatis excepturi quibusdam magni, reiciendis iusto aliquid ut, odio qui quidem. Saepe, harum sapiente. Ad excepturi praesentium impedit ea perferendis expedita eaque corporis id nisi? Totam magni labore sint necessitatibus id vitae nostrum veritatis nisi ex, dolore mollitia saepe adipisci nesciunt sunt quasi molestiae recusandae ea expedita. Reiciendis, omnis, magnam voluptatem dicta dolorum odio in harum fugiat architecto quisquam esse numquam, adipisci saepe est illo quibusdam aperiam inventore dolorem? Explicabo cumque sapiente doloribus suscipit quia illo et laborum. Quasi quam veritatis odio quos voluptates fugiat provident assumenda possimus obcaecati impedit? Voluptas aspernatur veniam eveniet error quo non ea dolores cupiditate recusandae quos incidunt velit voluptatibus sint hic repellendus beatae a iure cumque, ut voluptates modi suscipit consequuntur? Necessitatibus, velit similique neque, exercitationem non consectetur architecto ullam deleniti eaque autem distinctio blanditiis aliquid? Dignissimos, reiciendis animi? Sint, libero porro ducimus qui reprehenderit nobis veniam totam minus. Aperiam iure veritatis possimus fugit debitis ipsum neque incidunt deleniti, similique optio nulla quibusdam eveniet voluptatibus hic quae unde consequuntur, illo voluptatem accusantium minus magni ut? Quae veritatis tempore at nemo! Hic aliquid quia voluptates enim provident error. Vero ut autem mollitia. Corporis quia id ab quaerat, quae cum! Voluptas hic reprehenderit officiis exercitationem doloremque dolorum repellendus alias in optio similique harum perspiciatis animi perferendis obcaecati enim dolor, libero voluptate aperiam itaque. Illo earum consequuntur ex praesentium tempore? Harum cumque reprehenderit alias est ullam ad! Consectetur iste iure laboriosam fugiat, commodi fugit ipsum accusamus harum suscipit aspernatur. Iste eligendi maiores doloremque fugit veniam beatae non temporibus. Cumque voluptates doloremque eius minus ut numquam, distinctio ducimus quisquam eos omnis voluptate blanditiis expedita, accusamus ipsum modi ratione. Dolore quisquam at blanditiis nam ipsa? Repellendus quasi, porro illum sequi tempore neque saepe nisi ad blanditiis rem nemo beatae! Temporibus doloribus, harum quia non, quidem, fugit explicabo cumque ratione hic ex consequuntur excepturi facilis optio officiis blanditiis. Aperiam quas consequuntur sit, quasi soluta repellendus praesentium doloribus perspiciatis ex, illum in vel reprehenderit voluptatibus ducimus sapiente nihil accusamus fugiat laborum numquam qui dicta quidem blanditiis excepturi. Quidem, consequuntur! Neque repellendus numquam eos officia blanditiis iure asperiores ratione quo. Aspernatur suscipit voluptates ab eius aliquid, ad ex molestias accusantium quas ipsa, nihil quidem laudantium quam similique aut minus ea vel, omnis temporibus labore? Deleniti nam aut nostrum magnam atque! Quas, temporibus esse! Voluptates exercitationem quod, possimus atque sed aut nostrum hic a eos iure, aspernatur consectetur ipsum et facilis enim. Praesentium, ut quam vel enim laudantium nam sunt maxime id quo ad soluta ullam distinctio exercitationem magnam hic voluptatibus, consequatur minus inventore. Ut veritatis maxime aliquid, corrupti ipsum enim delectus atque assumenda rem repudiandae. Repudiandae animi nihil rerum soluta possimus explicabo quos doloremque quidem voluptatem maiores porro, recusandae asperiores nulla quam, beatae nobis! Ad quas doloribus vitae?
			</p>
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