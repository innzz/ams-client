import { Button } from '../ui/button'

type OpenCameraButtonProps = {
    title: string,
    onClick: ()=> void,
    variant?: "default" | "success" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

const OpenCameraButton = ({title, onClick, variant="default"}: OpenCameraButtonProps) => {
  return (
    <Button size={"lg"} onClick={onClick} variant={variant} >{title}</Button>
  )
}

export default OpenCameraButton