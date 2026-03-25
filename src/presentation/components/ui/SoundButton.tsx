interface Props {
  cryUrl: string
  label?: string
}

function SoundButton({ cryUrl, label }: Props) {
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    new Audio(cryUrl).play()
  }

  return (
    <button
      onClick={handleClick}
      className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
      aria-label={label}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    </button>
  )
}

export default SoundButton
