import React, { useState, useContext } from "react";
import type { Skill } from "../../types/cv.types";
import { CVContext } from "../../App";
import "./PersonalInfo.css";

const Skills: React.FC = () => {
  const { state, setState } = useContext(CVContext);
  const [skill, setSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: "Básico",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSkill((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    if (!skill.name.trim()) {
      setError("O nome da habilidade não pode estar vazio.");
      return;
    }

    const newSkill: Skill = {
      ...skill,
      id: Math.random().toString(36).slice(2, 9),
    };

    setState((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));

    setSkill({
      name: "",
      level: "Básico",
    });
    setError("");
  };

  const removeSkill = (id: string) => {
    setState((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  return (
    
    <div className="form-container bg-white p-6 rounded-lg shadow-md max-w-3xl w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
        Habilidades
      </h2>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Ex: JavaScript, React, SQL"
          value={skill.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nível da Habilidade:
          <select
            name="level"
            value={skill.level}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
        </label>
        <button
          type="button"
          onClick={addSkill}
          className="submit-button"
        >
          Adicionar Habilidade
        </button>
        {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
      </div>

      <ul className="space-y-2 mt-4">
        {state.skills.map((s) => (
          <li
            key={s.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-gray-800">{s.name}</p>
              <p className="text-sm text-gray-500">Nível: {s.level}</p>
            </div>
            <button
              type="button"
              onClick={() => removeSkill(s.id)}
              className="text-red-600 hover:underline ml-4 bg-gray-200 rounded p-1 text-sm"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;