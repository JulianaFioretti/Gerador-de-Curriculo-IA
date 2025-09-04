import React, { useState } from "react";
import { CVData } from "../types/cv";

interface Props {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
}

const ExperienceInput: React.FC<Props> = ({ cvData, setCvData }) => {
  const [experience, setExperience] = useState({
    empresa: "",
    cargo: "",
    periodo: "",
    descricao: "",
    atual: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setExperience({
      ...experience,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addExperience = () => {
    if (!experience.empresa || !experience.cargo) return;

    setCvData({
      ...cvData,
      experiencias: [...cvData.experiencias, experience],
    });

    // Resetar formulário
    setExperience({
      empresa: "",
      cargo: "",
      periodo: "",
      descricao: "",
      atual: false,
    });
  };

  const removeExperience = (index: number) => {
    setCvData({
      ...cvData,
      experiencias: cvData.experiencias.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          name="empresa"
          placeholder="Empresa"
          value={experience.empresa}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          name="cargo"
          placeholder="Cargo"
          value={experience.cargo}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          name="periodo"
          placeholder="Período (ex: Jan/2020 - Dez/2022)"
          value={experience.periodo}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          name="descricao"
          placeholder="Descrição das atividades"
          value={experience.descricao}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            name="atual"
            checked={experience.atual}
            onChange={handleChange}
          />
          <span>Trabalho Atual</span>
        </label>
        <button
          type="button"
          onClick={addExperience}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Experiência
        </button>
      </div>

      <ul className="space-y-2">
        {cvData.experiencias.map((exp, index) => (
          <li
            key={index}
            className="border p-3 rounded flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{exp.cargo} - {exp.empresa}</p>
              <p className="text-sm text-gray-600">{exp.periodo}</p>
              <p>{exp.descricao}</p>
              {exp.atual && <p className="text-green-600 text-sm">(Emprego Atual)</p>}
            </div>
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:underline ml-4"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceInput;
