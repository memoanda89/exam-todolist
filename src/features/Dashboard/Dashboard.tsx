import React, { useCallback, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// styles
import useCommonStyles from 'hooks/useCommonStyles';
import { ITask } from 'models/ITask';
import { useDispatch } from 'react-redux';
import { GetTask } from 'actions/app.action';
import { ITotal } from 'models/ITotal';
 
 
 
const options: ApexOptions = {
  chart: {
    type: 'pie',
  },
  labels: ['News', 'In process', 'Completed'],
};
 


function Dashboard() {
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();
  const [task, setTask] = useState<ITask[]>([]);
  const [news, setNews] = useState<ITask[]>([]);
  const [process, setProcess] = useState<ITask[]>([]);
  const [completed, setComplete] = useState<ITask[]>([]);
  const [rowsTotal, setRowTotal] = useState<ITotal[]>([]);
  const[series,setSerie]=useState<number[]>([]);

    const handleGetTask = useCallback(() => {
      var list;
      dispatch(
       list=GetTask(),
      );
    
      var task1=list.payload.task;
       if (task1.length!==undefined){
        setTask(task1);
        setNews(task1.filter(c=> c.status==='New'));
        setProcess(task1.filter(c=> c.status==='In progress'))
        setComplete(task1.filter(c=> c.status==='Completed'))
       
        var rowsTotalStatus:ITotal[]=[];
        var serieTotal:number[]=[];
        rowsTotalStatus.push({status:'News',total:news.length});
        serieTotal.push(news.length);
        rowsTotalStatus.push({status:'In process',total:process.length});
        serieTotal.push(process.length);
        rowsTotalStatus.push({status:'Completed',total:completed.length});
        serieTotal.push(completed.length);
        
        setRowTotal(rowsTotalStatus);
        setSerie(serieTotal);
        
       }
    }, [completed.length, dispatch, news.length, process.length]);

useEffect(() => {
  handleGetTask();
 
}, [handleGetTask]);
  return (
    <div>
      <h2>Report</h2>
      <Grid container>
        <Grid item xs={12}>
          <Paper>
            <Box m={2}>
              <Grid container item xs={12}>
                <h2>Task by status</h2>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={12} sm={12} md={4}>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell align="right" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowsTotal.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell component="th" scope="row">
                              {row.status}
                            </TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid container justifyContent="center" item xs={12} sm={12} md={6}>
                  <div>
                    <br />
                    <Chart options={options} series={series} type="pie" width={500} />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper>
            <Box m={2}>
              <Grid container item xs={12}>
                <h2>Tasks</h2>
              </Grid>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell width="25%">Title</TableCell>
                      <TableCell width="25%">Description</TableCell>
                      <TableCell width="10%">Status</TableCell>
                      <TableCell width="10%">Time remaining</TableCell>
                      <TableCell width="30%">Created</TableCell>
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {task.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell component="th" scope="row">
                          {row.tittle}
                        </TableCell>
                        <TableCell>{row.description}</TableCell>
                        
                        <TableCell
                          className={clsx(
                            commonStyles.textCapitalize,
                            row.status === 'completed' && commonStyles.colorTextCompleted,
                            row.status === 'In progress' && commonStyles.colorTextInprocess,
                            row.status === 'New' && commonStyles.colorTextInprocess,
                          )}
                        >
                          {row.status}
                        </TableCell>
                        <TableCell
                          
                        >
                          {row.timeRemaining}
                        </TableCell>
                        <TableCell
                          
                        >
                          {row.time}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid>
    
      </Grid>

    </div>
  );
}

export default Dashboard;
