import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faPhone} from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithub} from '@fortawesome/free-brands-svg-icons'

import './PersonalInfo.css'; 

interface applicationForm {
	name: string;
	email:string;
	phone:string;
	linkedin?: string;
	github?:string;
	resume:string;
}
function PersonalInfo() {
	const { register, handleSubmit, watch, formState: {errors}} =useForm<applicationForm> ();
	const [characterCount, setCharacterCount] =useState(0);

	const onSubmit = (data:applicationForm) => {
		console.log(data);
		alert ('Formulario enviado com sucesso!');
	};

	const resumeValue = watch('resume', '');

	React.useEffect(() => {
		setCharacterCount(resumeValue.length);
	},[resumeValue]);

	return (
		<div className="form-container bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
		<p className="text-sm text-slate-500 mb-6">Informações básicas para contato</p>
			

			<form onSubmit= {handleSubmit(onSubmit)}>
				<div className = "form-group flex flex-col">
					<label htmlFor="name" className="text-sm font-medium text-slate-700 mb-1">
						<div className="flex items-center">
							<FontAwesomeIcon icon={faUser} className="mr-2 text-slate-500" />
              <span>Nome Completo<span className="text-red-500">*</span></span>
              </div>
					</label>
					<input
					id="name"
					type="text"
					placeholder ="Nome Completo"
					className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
					{...register('name', {required:'Campo obrigatório'})}
					/>
					{errors.name && <p className="error-message">{errors.name.message}</p>}
				</div>

				<div className="form-group flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-1">
            <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} color= "#696969"/>
                Email <span className="text-red-500">*</span>
                </div>
            </label>
					<input
					id="email"
					type="email"
					 placeholder="seu.email@exemplo.com"
					 className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
					{...register('email',{
						required:'Campo obrigatório',
						pattern:{
					    value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
						message:'Email inválido',	
					},
				})}
				/>
				{errors.email && <p className="error-message">{errors.email.message}</p>}
				</div>

				 <div className="form-group flex flex-col">
                <label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-1">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faPhone} color= "#696969"/>
		         	Telefone <span className="text-red-500">*</span>
              </div>
		      	</label>
           <input
            id="phone"
            type="tel"
			placeholder="Ex: (99) 99999-9999"
			className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register('phone', {
              required: 'O telefone é obrigatório',
              pattern: {
                value: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
                message: 'Telefone inválido',
              },
            })}
          />
          {errors.phone && <p className="error-message">{errors.phone.message}</p>}
        </div>

        <div className="form-group flex flex-col">
                    <label htmlFor="linkedin" className="text-sm font-medium text-slate-700 mb-1">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faLinkedin} color= "#696969"/>
                        LinkedIn
                        </div>
                    </label>
          <input
            id="linkedin"
            type="url"
			placeholder="https://www.linkedin.com/in/seu-perfil"
			className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register('linkedin', {
              pattern: {
                value: /^(https?:\/\/(www\.)?)?linkedin\.com\/.*$/,
                message: 'URL do Linkedin inválida',
              },
            })}
          />
          {errors.linkedin && <p className="error-message">{errors.linkedin.message}</p>}
        </div>
                

				<div className="form-group flex flex-col">
  <label htmlFor="github" className="text-sm font-medium text-slate-700 mb-1">
    <div className="flex items-center">
    <FontAwesomeIcon icon={faGithub} className="mr-2 text-slate-500" />
    GitHub
    </div>
  </label>
  <input
    id="github"
    type="url"
    placeholder="https://github.com/seu-perfil"
    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    {...register('github', {
      pattern: {
        value: /^(https?:\/\/(www\.)?)?github\.com\/.*$/,
        message: 'URL do GitHub inválida',
      },
    })}
  />
  {errors.github && <p className="error-message text-xs text-red-500 mt-1">{errors.github.message}</p>}
</div>


        <div className="form-group flex flex-col">
          <label htmlFor="resume" className="text-sm font-medium text-slate-700 mb-1">
            <div className="flex items-center">
                        Resumo Profissional
                        </div>
                    </label>
          <textarea
            id="resume"
			placeholder="Conte um pouco sobre suas experiencias e habilidades profissionais"
			className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm resize-y focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register('resume', { maxLength: { value: 450, message: 'Máximo de 450 caracteres' } })}
          />
          <div className="char-counter">
            {characterCount} / 450
          </div>
          {errors.resume && <p className="error-message">{errors.resume.message}</p>}
        </div>

        <button type="submit" className="submit-button">Salvar</button>
      </form>
    </div>
  );
}

export default PersonalInfo;