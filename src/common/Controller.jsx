const Controller = ({ setActive }) => {
  return (
    <div className="container w-100 text-center mt-3">
      <button
        className="btn btn-primary ml-2"
        onClick={() => setActive("holdings")}
      >
        Holdings
      </button>
      <button
        className="btn btn-primary ml-2"
        onClick={() => setActive("transitions")}
      >
        Transactions
      </button>
    </div>
  );
};

export default Controller;
