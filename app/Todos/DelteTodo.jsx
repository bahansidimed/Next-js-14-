import React from 'react'
import Button from '../Components/Button'
import { DeleteTodo } from '../Actions/ActionsTodos'

const DelteTodo = ({ ids }) => {
  return (
    <form action={DeleteTodo}>
      <input type="hidden" value={ids} name='ids' />
      <Button val='DELETE'></Button>
    </form>
  )
}

export default DelteTodo