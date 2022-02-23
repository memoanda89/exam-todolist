import React, { memo } from 'react';

// libs
import clsx from 'clsx';

// material core
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


// styles
import useStyles from './styles';


type IProps = {
  handleToogleDrawer: () => void;
  isDrawer: boolean;
};

function TopBar({ isDrawer, handleToogleDrawer }: IProps) {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawer,
      })}
    >
      <Toolbar>
        <div className={classes.search}>
        
        </div>
        <div className={classes.grow} />
        <div className={classes.topBar_setting}>
         
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default memo(TopBar);
