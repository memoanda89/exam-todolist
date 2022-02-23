import React, { useCallback, useEffect, useState } from 'react';
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
import { updateTask} from 'actions/app.action';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import {IPropsModal} from 'models/IPropsModal'

 

export default function TaskEditModal({ isOpen, handleCloseDialogAddTask,id ,...IPropsModal}: IPropsModal) {
 //#region "Variables"
 const nullableEntry = {
  title:"",
  description: "",
  time:0,
  timeRemaining:0,
  status:"",
  isActive:false,
  id:id?.id
};
const dispatch = useDispatch();
const [updateTasklocal, settask] = useState( nullableEntry );
const [isOpenModal, setIsOpen] = useState(isOpen);

const [titleVar, settitle] = useState('');
 //#endregion
 
  //#region "functions"

  /**
   * funcion para asignar valires por el id de la tarea
   */
  useEffect(() => {
    let newEdit =  {...updateTasklocal} ;
    newEdit.title=id?.tittle!;
     newEdit.time=id?.estimatedTime!;
     newEdit.timeRemaining=id?.timeRemaining!;
    newEdit.status=id?.status!;
    newEdit.isActive=id?.isActive!;
    newEdit.description=id?.description!;
    newEdit.id=id?.id;
    settask(newEdit);
   
  }, [id]);

/**
 * handleChange
 * @param value propiedad que regresa el valor del disparador
 * handler para asignar valor estatus a la tarea
 */
  function handleChange (value: any):void{
    let newEdit =  {...updateTasklocal} ;
    newEdit.status=value.value;
    settask(newEdit);
  }

/**
 * handleChangeDescription
 * @param value propiedad que regresa el valor del disparador
 * handler para asignar valor descripción a la tarea
 */
  function handleChangeDescription (value: any):void{
    let newEdit =  {...updateTasklocal} ;
    newEdit.description=value;
    settask(newEdit);
  }

  /**
 * handleChangeTitle
 * @param value propiedad que regresa el valor del disparador
 * handler para asignar valor title a la tarea
 */
  function handleChangeTitle (value: any):void{
    
    let newEdit =  {...updateTasklocal} ;
    newEdit.title=value;
    settask(newEdit);
  }

    /**
 * handleChangeTime
 * @param value propiedad que regresa el valor del disparador
 * handler para asignar valor time a la tarea
 */
  function handleChangeTime (value: any):void{
    let newEdit =  {...updateTasklocal} ;
    newEdit.time=value;
    settask(newEdit);
  }
/**
 * handleSave
 * handler para asignar ejecutar el actualizado  de la tarea
 */
  function handleSave(): void {
  var updatedTask:ITask={
    'tittle':updateTasklocal?.title,
    'time':new Date(),
    'estimatedTime':updateTasklocal.time,
    'timeRemaining':updateTasklocal.timeRemaining,
    'description':updateTasklocal.description,
    'status':updateTasklocal.status,
    'isActive':updateTasklocal.isActive,
    'id':id?.id
  }
    
  updateTask(updatedTask);  
    handleCloseDialogAddTask()

  }
  

  //#endregion




  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={isOpen} aria-labelledby="max-width-dialog-title">
        <DialogContent>
          <Typography variant="h6" color="textPrimary">
            UPDATE TASK
          </Typography>
          <br />
        
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth id="title" label="Title" variant="outlined"  value={updateTasklocal.title} onChange={e => handleChangeTitle(e.target.value)}   />
       
            </Grid>
            
            <Grid item xs={12}>
              <TextField fullWidth id="time" label="Time" variant="outlined" value={updateTasklocal.time}  onChange={e => handleChangeTime(e.target.value)}   />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">Severity</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Severity"
                  value={updateTasklocal.status} 
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
            <TextField multiline rows={6} fullWidth variant="outlined" placeholder="add description" value={updateTasklocal.description}    onChange={e => handleChangeDescription(e.target.value)}/>
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


