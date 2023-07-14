/* eslint-disable react/prop-types */

const Button = (props) => {
  const {btn} = props;
  return (
      <button type="submit" className="bg-primary hover:bg-primary w-full text-white font-bold py-1 px-4 border-b-4 border-primary hover:border-primary rounded ">
      {btn}
      </button>
  )
}

export default Button
