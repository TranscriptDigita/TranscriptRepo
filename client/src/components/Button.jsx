/* eslint-disable react/prop-types */

const Button = (props) => {
  const {btn} = props;
  return (
      <button className="bg-indigo-600 hover:bg-indigo-800 w-full text-white font-bold py-1 px-4 border-b-4 border-indigo-800 hover:border-indigo-800 rounded">
      {btn}
      </button>
  )
}

export default Button
