import { Button } from '../ui/button'

type ClockInButtonProps = {
  onClick?: ()=> void,
}

const ClockInButton = ({onClick}: ClockInButtonProps) => {
  return (
    <Button variant={"success"} size={"lg"} onClick={onClick} >Clock In</Button>
  )
}

export default ClockInButton