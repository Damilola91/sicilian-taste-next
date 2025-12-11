const RecipeHeader = ({ name, img, description }) => {
  return (
    <header className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
        {name}
      </h1>

      {img && (
        <div className="w-full max-h-[420px] overflow-hidden rounded-2xl shadow-lg mb-6">
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>
      )}

      {description && (
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">{description}</p>
      )}
    </header>
  );
};

export default RecipeHeader;
