import { Button } from '../ui/button'

type ClockOutButtonProps = {
  onClick?: ()=> void,
}

const ClockOutButton = ({onClick}: ClockOutButtonProps) => {
  return (
    <Button variant={"destructive"} size={"lg"} onClick={onClick} >Clock Out</Button>
  )
}

export default ClockOutButton