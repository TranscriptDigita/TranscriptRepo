/* eslint-disable react/prop-types */

const InputLabel = (props) => {

    const { label } = props

  return (
    <label className="block uppercase tracking-wide text-gray-800 text-xs font-semibold mb-2" >
        {label}
    </label>
  )
}

export default InputLabel
