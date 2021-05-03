import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FormGroup, Row, Input, Button } from 'reactstrap'
import { addEvent } from '../../actions/collectionAction'
const EventForm = ({ id }) => {
  const [elementForm, setElementForm] = useState({ value: '' })
  const dispatch = useDispatch()
  return (
    <Row>
      <FormGroup className='mb-1 mr-3'>
        <Input
          value={elementForm.value}
          onChange={(e) =>
            setElementForm({
              ...elementForm,
              value: e.target.value,
            })
          }
          id='event-here'
          className='form-control-alternative'
          placeholder='Add Event ...'
          type='text'
          size='sm'
        />
      </FormGroup>
      <Button
        type='button'
        size='sm'
        onClick={(e) => {
          e.preventDefault()
          if (elementForm.value) {
            dispatch(
              addEvent({ title: elementForm.value, color: 'default' }, id)
            )
            setElementForm({
              ...elementForm,
              value: '',
            })
          }
        }}
        color='success'
      >
        ADD
      </Button>
    </Row>
  )
}

export default EventForm
