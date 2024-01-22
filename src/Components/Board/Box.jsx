/* eslint-disable react/prop-types */
const Box = ({ value, idx, handleClick }) => {
  return (
    <div
      onClick={() => handleClick(idx)}
      className={`h-[80px] w-[80px] rounded text-3xl font-semibold   bg-slate-700 cursor-pointer text-center pt-6 ${
        value === "X" ? "text-green-500" : "text-orange-500"
      }`}
    >
      {value}
    </div>
  );
};

export default Box;
