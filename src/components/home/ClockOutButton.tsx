import { Button } from '../ui/button'

type ClockOutButtonProps = {
  onClick?: ()=> void,
  isLoading?: boolean
}

const ClockOutButton = ({onClick, isLoading}: ClockOutButtonProps) => {
  return (
    <Button variant={"destructive"} size={"lg"} onClick={onClick} disabled={isLoading ? true : false} >{isLoading ? "Clocking-Out" : "Clock Out"}</Button>
  )
}

export default ClockOutButton