import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ITask } from 'models/ITask';

const useStyles = makeStyles(() => ({
  icon: {
    marginRight: 10,
    marginTop: 4,
  },
  member: {
    marginTop: 2,
  },
}));

type IProps = {
  isOpen: boolean;
  handleCloseDialog: () => void;
  task?:ITask;
};

export default function TaskViewModal({ isOpen, handleCloseDialog ,task}: IProps) {
  const classes = useStyles();

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={isOpen} aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">
          <Grid container wrap="nowrap">
            <Grid item xs={1}>
              <SubtitlesIcon className={classes.icon} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="h6"> {task?.tittle}</Typography>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap">
            <Grid item xs={1} />
            <Grid item xs={11} className={classes.member}>
              <Typography variant="body2" color="textSecondary">
               {task?.description}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Box m={1}>
            <Typography component="div">Severity</Typography>
            <Typography variant="body2" color="textSecondary">
            {task?.time}
            </Typography>
          </Box>
          <Box m={1}>
            <Typography>Status</Typography>
            <Typography variant="body2" color="textSecondary">
            {task?.status}
            </Typography>
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
