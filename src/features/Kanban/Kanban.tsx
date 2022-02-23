 
import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RestartIcon from '@material-ui/icons/Restore';
import EditIcon from '@material-ui/icons/Edit';
import { ITask } from 'models/ITask';
import TaskAddModal from './components/TaskAddModal';
import TaskEditModal from './components/TaskEditModal';
import { useDispatch } from 'react-redux';
import { addRandomTask,GetTask,deleteTask ,deleteTasks, validateTask,updateIsActiveTask,restartTimeTask} from 'actions/app.action';
// styles
import useStyles from './styles';
import { Switch } from '@material-ui/core';

function Kanban() {
//#region variables
  /**
   * variables
   */
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
 
  const [isOpenAddTask, setIsOpenAddTask] = useState(false);
  const [isOpenEditTask, setIsOpenEditTask] = useState(false);

  const [task, setTaks] = useState<ITask[]>([]); 
  const [news, setNews] = useState<ITask[]>([]);
  const [process, setProcess] = useState<ITask[]>([]);
  const [completed, setComplete] = useState<ITask[]>([]);
  const [taskSelected, setTaskSelected] = useState<ITask>();
  const MINUTE_MS = 60000;
//#endregion
/**
 *handlres para obtener las tareas 
 */
    const handleGetTask = useCallback(() => {
      var list;
      dispatch(
       list=GetTask(),
      );
    
      var task1=list.payload.task;
       if (task1.length!==undefined){
        setTaks(task1);
    
        setNews(task1.filter(c=> c.status==='New'));
        setProcess(task1.filter(c=> c.status==='In progress'))
        setComplete(task1.filter(c=> c.status==='Completed'))
       }
    }, []);
/**
 *funcion para obtener tareas y revisar el estatus de las tareas cada 60 min 
 */
useEffect(() => {
  handleGetTask();
  const interval = setInterval(() => {
    validateTask();
    handleGetTask();
  }, MINUTE_MS);
  return () => clearInterval(interval); // T
}, [handleGetTask]);



/**
 *handlres obtener una tarea por id
 */
function handleSelected(id:ITask): void {
  setIsOpenEditTask(true);

  setTaskSelected(id)
}
/**
 *handle para cerrar el modal para agreagar tarea
 */
function handleCloseDialogAddTask() {
  setIsOpenAddTask(false);
  handleGetTask();
}
/**
 *handler para crerrar el modal de edicion 
 */
function handleCloseDialogEditTask() {
  setIsOpenEditTask(false);
  handleGetTask();
}
/**
 *handlres para borrar una tarea por id
 */
function handleDeleteOneTask(id:ITask) {
  
  dispatch(
    deleteTask(id.id),
  );
 
  handleGetTask();
}
/**
 *handlres para restaurar el tiempo de una tarea
 */
function handleRestartOneTask(id:ITask) {
  
  dispatch(
    restartTimeTask(id.id),
  );
 
  handleGetTask();
}
/**
 *handlres para obtener las tareas 
 */
  function handleAddRandomTask() {
    var test;
    dispatch(
     test= addRandomTask(),
    );
 
    var task1=test.payload;
     if (task1){
  
      setNews(task1.filter(c=> c.status==='New'));
      setProcess(task1.filter(c=> c.status==='In progress"'))
      setComplete(task1.filter(c=> c.status==='Completed'))
     }
    }
  function handleDeleteTask() {
  
    dispatch(
      deleteTasks(),
    );
   
    setNews([]);
    setProcess([]);
    setComplete([]);
  }

  
  const handleChangeActive = (task:ITask) => {
    updateIsActiveTask(task);
    handleGetTask();
  };

  return (
    <div>
      <Grid container alignItems="center">
        <Grid item sm={4}>
          <h2>To do LIST</h2>
        </Grid>
        <Grid container item sm={2} justify="flex-end">
          <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />} onClick={() => setIsOpenAddTask(true)}>
            Add Task
          </Button>
        </Grid>
        <Grid container item sm={2} justify="flex-end">
          <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />} onClick={handleAddRandomTask}>
            Add Random tasks
          </Button>
        </Grid>
        <Grid container item sm={2} justify="flex-end">
          <Button variant="contained" color="primary" size="small" startIcon={<DeleteIcon />} onClick={handleDeleteTask}>
            Delete all tasks
          </Button>
        </Grid>
      </Grid>
      <Paper variant="outlined">
        <Box m={2}>
          <Grid container item xs={12} spacing={3} className="m-0">
            <Grid item xs={4}>
              <Paper elevation={3}>
                <Card>
                  <CardHeader className={classes.cardHeader} title="New" />
                  <CardContent>
                    {news?.map((row) => (
                      <Paper elevation={3} key={row.id} className={classes.paper}>
                        <CardContent>
                        <Typography variant="body2" component="p" key={row.id}>
                            {row.tittle}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              {row.description}
                            </Typography>
                            
                            <Typography variant="body2" color="textSecondary" component="p">
                             Estimated Time: {row.estimatedTime} min
                            </Typography> <Typography variant="body2" color="textSecondary" component="p">
                             Time remaining: {row.timeRemaining} min
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            <Switch
                                checked={row.isActive}
                                onChange={()=> handleChangeActive(row)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            </Typography>
                      
                        </CardContent>
                        <CardActions>
                        <Button variant="contained" color="secondary" size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteOneTask(row)}>
                        </Button>
                        <Button variant="contained" color="secondary" size="small" startIcon={<RestartIcon />} onClick={() => handleRestartOneTask(row)}>
                        </Button>
                        <Button size="small" color="primary" startIcon={<EditIcon />}  onClick={() => handleSelected(row)}>
                              Edit
                          </Button>
                           
                          <Grid container justify="flex-end">
                          <Typography variant="body2" color="textSecondary" component="p">
                         {row.time} </Typography>
                        </Grid>
                        </CardActions>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3}>
                <Card>
                  <CardHeader className={clsx(classes.cardHeader, classes.cardHeaderInprocess)} title="In Process" />
                  <CardContent>
                    {process?.map((row) => (
                       <Paper elevation={3} key={row.id} className={classes.paper}>
                       <CardContent>
                       <Typography variant="body2" component="p" key={row.id}>
                           {row.tittle}
                         </Typography>
                         <Typography variant="body2" color="textSecondary" component="p">
                             {row.description}
                           </Typography>
                           
                           <Typography variant="body2" color="textSecondary" component="p">
                            Estimated Time: {row.estimatedTime} min
                            </Typography> <Typography variant="body2" color="textSecondary" component="p">
                            Time remaining: {row.timeRemaining} min
                           </Typography>
                           
                           <Typography variant="body2" color="textSecondary" component="p">
                           <Switch
                               checked={row.isActive}
                               onChange={()=> handleChangeActive(row)}
                               inputProps={{ 'aria-label': 'controlled' }}
                             />
                           </Typography>
                     
                       </CardContent>
                       <CardActions>
                       <Button variant="contained" color="secondary" size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteOneTask(row)}>
                       </Button>
                       <Button variant="contained" color="secondary" size="small" startIcon={<RestartIcon />} onClick={() => handleRestartOneTask(row)}>
                       </Button>
                       <Button size="small" color="primary" onClick={() => handleSelected(row)}>
                             Edit
                         </Button>
                         <Grid container justify="flex-end">
                         <Typography variant="body2" color="textSecondary" component="p">
                         {row.time} </Typography>
                        </Grid>
                       </CardActions>
                     </Paper>
                    ))}
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3}>
                <Card>
                  <CardHeader className={clsx(classes.cardHeader, classes.cardHeaderCompleted)} title="Completed" />
                  <CardContent>
                    {completed?.map((row) => (
                        <Paper elevation={3} key={row.id} className={classes.paper}>
                        <CardContent>
                        <Typography variant="body2" component="p" key={row.id}>
                            {row.tittle}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              {row.description}
                            </Typography>
                            
                            <Typography variant="body2" color="textSecondary" component="p">
                             Estimated Time: {row.estimatedTime} min
                            </Typography> <Typography variant="body2" color="textSecondary" component="p">
                             Time remaining: {row.timeRemaining} min
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Time complete: {row.timeComplete} min
                           </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            <Switch
                            disabled
                                checked={row.isActive}
                                onChange={()=> handleChangeActive(row)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            </Typography>
                      
                        </CardContent>
                        <CardActions>
                        
                        
                        <Grid container justify="flex-end">
                         
                        </Grid>
                        </CardActions>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <TaskEditModal isOpen={isOpenEditTask} handleCloseDialogAddTask={handleCloseDialogEditTask}  id={taskSelected!}   />
      <TaskAddModal isOpen={isOpenAddTask} handleCloseDialogAddTask={handleCloseDialogAddTask}      />
    </div>
  );
}

export default Kanban;
