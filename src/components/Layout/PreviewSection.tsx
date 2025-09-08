import CVPreview from "../Preview/CVPreview";

function PreviewSection() {
  return (
    <div className="flex-1 bg-violet-100 p-4 flex flex-col items-center min-h-screen overflow-auto">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <CVPreview />
      </div>
    </div>
  );
}

export default PreviewSection;
