const SummaryCard = ({ title, text }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-800">{text}</p>
    </div>
  );
};

export default SummaryCard;
