const Loader = () => {
  const vertical = {
    "margin-top": "20%",
  };
  return (
    <div className="text-center" style={vertical}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
