/* eslint-disable react/prop-types */
const Box = ({ value, idx }) => {
  console.log(idx, value);
  return (
    <div className="px-7 py-4 rounded text-3xl  text-orange-500 bg-slate-700">
      {value}
    </div>
  );
};

export default Box;
