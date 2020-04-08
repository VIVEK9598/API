import React from 'react'
import { Dialog, DialogTitle, TextField, DialogContent, Button } from '@material-ui/core';

const ModalForm = (props) => {

  const { open, onClose, editing, handleChange, doSubmit, title, body } = props

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <DialogContent>
        <form onSubmit={doSubmit} noValidate autoComplete="off">
          <TextField
            value={editing && title? title:null}
            name="title"
            onChange={handleChange}
            id="title"
            label="Title" /><br />
          <TextField
            value={editing && body?body:null}
            name="body"
            onChange={handleChange}
            id="body"
            label="Body" /><br /><br />
          <Button type="submit" variant="contained" color="primary">
            {editing ? "Update" : "Submit"}
          </Button>
         
        </form>

      </DialogContent>


    </Dialog>
  )

}

export default ModalForm;