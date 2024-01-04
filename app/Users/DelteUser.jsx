import Button from '../Components/Button'
import { DeleteUser } from '../Actions/ActionUsers'

const DelteUser = ({ idu }) => {
  return (
    <form action={DeleteUser}>
      <input type="hidden" value={idu} name='iduser' />
      <Button val='DELETE'></Button>
    </form>
  )
}

export default DelteUser