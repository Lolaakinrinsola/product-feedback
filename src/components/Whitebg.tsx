
const Whitebg = ({children,className}:any) => {
  return (
    <div className={`rounded-[10px] min-h-[137px] w-full bg-white p-[24px] ${className}`}>{children}</div>
  )
}

export default Whitebg