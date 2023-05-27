/* eslint-disable react/prop-types */
function Button(props) {
  const className = `flex justify-center px-6 py-3 bg-primary-3 text-white rounded-full disabled:opacity-60 hover:bg-primary-1 transition-colors ${props.className || ''}`
  return (
    <div>
      <button {...props} className={className}>
        {props.title}
      </button>
    </div>
  );
}

export default Button;