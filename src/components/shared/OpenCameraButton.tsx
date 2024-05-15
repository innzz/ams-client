import { Button } from '../ui/button'

type OpenCameraButtonProps = {
    title: string,
    onClick: ()=> void,
    variant?: "default" | "success" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
    disabled?: boolean
}

const OpenCameraButton = ({title, onClick, variant="default", disabled}: OpenCameraButtonProps) => {
  return (
    <Button size={"lg"} onClick={onClick} variant={variant} disabled={disabled} >{title}</Button>
  )
}

export default OpenCameraButton