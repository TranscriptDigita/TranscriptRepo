/* eslint-disable react/prop-types */
const Input = (props) => {

  const { type, name, placeholder, id, } = props
  return (
      <input type={type} name={name} placeholder={placeholder} id={id} className="bg-gray-100 border border-gray-500  block w-full text-gray-700 rounded-lg py-1.5 px-4 mb-3 leading-tight"/>
  )
}



export default Input
