import { Button } from '../ui/button'

type ClockInButtonProps = {
  onClick?: ()=> void,
  isLoading?: boolean
}

const ClockInButton = ({onClick, isLoading}: ClockInButtonProps) => {
  return (
    <Button variant={"success"} size={"lg"} onClick={onClick} disabled={isLoading ? true : false} >{isLoading ? "Clocking-In" : "Clock In"}</Button>
  )
}

export default ClockInButton