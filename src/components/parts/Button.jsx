function Button(props) {
  const className = `flex justify-center px-3 py-2 rounded-md text-white disabled:bg-gray-300 ${props.className || ''}`
  return (
    <div>
      <button {...props} className={className}>
        {props.title}
      </button>
    </div>
  );
}

export default Button;