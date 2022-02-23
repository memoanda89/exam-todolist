import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { ITask } from 'models/ITask';
import { useDispatch } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import { addTask } from 'actions/app.action';
import { FormControl, MenuItem, Select } from '@material-ui/core';


//#region Props

/**
 * props
 */
type IProps = {
  isOpen: boolean;
  handleCloseDialogAddTask: () => void;
  task?:ITask;
 
};

export default function TaskAddModal({ isOpen, handleCloseDialogAddTask,task }: IProps) {

  const dispatch = useDispatch();
  const [title, settitle] = useState( '' );
  const [description, setDescription] = useState( '');
  const [time, setTime] = useState( '' );
  const [status, setStatus] = useState( '' );
  const [isOpenModal, setIsOpen] = useState(isOpen);
 
  function handleChange (value: any):void{
      setStatus(value.value);
  }

  function handleSave(): void {
  var newTask:ITask={
    'tittle':title,
    'time':new Date(),
    'estimatedTime':Number.parseInt(time),
    'timeRemaining':Number.parseInt(time),
    'description':description,
    'status':status,
    'isActive':true
  }
  dispatch(
    addTask(newTask)
   ); 
   handleCloseDialogAddTask()
  
  }
  
  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={isOpen} aria-labelledby="max-width-dialog-title">
        <DialogContent>
          <Typography variant="h6" color="textPrimary">
            Add Task
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth id="title" label="Title" variant="outlined" value={task?.tittle} onChange={e => settitle(e.target.value)}  />
            </Grid>
            
            <Grid item xs={12}>
              <TextField fullWidth id="time" label="Estimated Time" variant="outlined" type="number" InputProps={{ inputProps: { min: 1, max: 120 } }} value={task?.estimatedTime} onChange={e => setTime(e.target.value)}  />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Severity"
                  value={task?.status}
                  onChange={e=> handleChange(e.target)}
                >
                 
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="In progress">In progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography variant="subtitle1" color="textPrimary">
            Description
            </Typography>
            <TextField multiline rows={6} fullWidth variant="outlined" placeholder="add desccription" onChange={e => setDescription(e.target.value)}  value={task?.description} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogAddTask} color="primary">
            Close
          </Button>
          <Button variant="contained" color="primary" size="small" onClick={handleSave} >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

