import React from 'react';
import PersonalHeader from './PersonalHeader';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';

const CVPreview: React.FC = () => {
  return (
    <aside className="w-1/2 p-6 bg-gradient-to-b from-white to-slate-50"> 
      <div className="h-full overflow-y-auto flex justify-center">
        <div id="cv-preview" className="w-[820px] bg-white rounded-xl shadow p-8">
          <PersonalHeader />
          <hr className="my-5 border-[#f1f5f9]" />
          <SkillsSection />
          <hr className="my-5 border-[#f1f5f9]" />
          <ExperienceSection />
          <div className="mt-6 text-xs text-slate-400">
            <span>* Campos vazios aparecem com indicação visual.</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CVPreview;

