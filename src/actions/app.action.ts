import { IAppActionTypes, INotifer } from 'models/IAppState';
import { ITask } from 'models/ITask';

export const setLoading = (isLoading: boolean) => ({
  type: IAppActionTypes.SET_LOADING,
  payload: isLoading,
});

export const setDialog = (isShow: boolean, type: string = 'error', content: React.ReactNode = '') => ({
  type: IAppActionTypes.SET_DIALOG,
  payload: {
    dialog: {
      type,
      isShow,
      content,
    },
  },
});

export const enqueueSnackbarAction = (notification: INotifer) => {
  return {
    type: IAppActionTypes.ENQUEUE_SNACKBAR,
    payload: {
      key: notification.key || new Date().getTime() + Math.random(),
      message: notification.message,
      variant: notification.variant || 'success',
    },
  };
};

export const addTask = (task: ITask) => {
  var Tasks:ITask[]=[]; 
  var List=localStorage.getItem("List");
  Tasks= JSON.parse(List || '{}')
  if(Tasks.length!==undefined){
    task.id=Tasks.length;
    Tasks.push(task);
  }else{
  Tasks=[]; 
  task.id=Tasks.length;
  Tasks.push(task);
  }

  localStorage.setItem("List",JSON.stringify(Tasks));
 
  return {
    type: IAppActionTypes.GETTASK,
    payload:{
      task:Tasks
    }
  };
};

export const updateTask = (task: ITask) => {
  var Tasks:ITask[]=[]; 
  var List=localStorage.getItem("List");
 

  Tasks= JSON.parse(List || '{}')
  var objIndex = Tasks.findIndex((obj => obj.id === task.id));
  if(task.status==='Completed'){
    task.timeComplete=task.estimatedTime-task.timeRemaining!;
    task.isActive=false;
  }
  Tasks[objIndex]=task;
  
  localStorage.setItem("List",JSON.stringify(Tasks));
 
  return {
    type: IAppActionTypes.UPDATETASK,
    payload:{
      task:Tasks
    }
  };
};



export const updateIsActiveTask = (task: ITask ) => {
  var Tasks:ITask[]=[]; 
  var List=localStorage.getItem("List");
  Tasks= JSON.parse(List || '{}')
  var objIndex = Tasks.findIndex((obj => obj.id === task.id));
  if(Tasks[objIndex].isActive){
    Tasks[objIndex].isActive=false;
  }else{
    Tasks[objIndex].isActive=true;
  }
  localStorage.setItem("List",JSON.stringify(Tasks));
  return {
    type: IAppActionTypes.UPDATETASK,
    payload:{
      task:Tasks
    }
  };
};


export const restartTimeTask = (taskId?: Number ) => {
  var Tasks:ITask[]=[]; 
  var List=localStorage.getItem("List");
 

  Tasks= JSON.parse(List || '{}')
  var objIndex = Tasks.findIndex((obj => obj.id === taskId));
  Tasks[objIndex].timeRemaining= Tasks[objIndex].estimatedTime;
  localStorage.setItem("List",JSON.stringify(Tasks));
 
  return {
    type: IAppActionTypes.UPDATETASK,
    payload:{
      task:Tasks
    }
  };
};
export const deleteTask = (taskId?: Number) => {
  var Tasks:ITask[]=[]; 
  var List=localStorage.getItem("List");
 

  Tasks= JSON.parse(List || '{}')
  var objIndex = Tasks.findIndex((obj => obj.id === taskId));

  Tasks.splice(objIndex, 1)
  localStorage.setItem("List",JSON.stringify(Tasks));
 
  return {
    type: IAppActionTypes.DELETETASK,
    payload:{
      task:Tasks
    }
  };
};
export const validateTask = () => {
  var Tasks:ITask[]=[]; 
  var List=localStorage.getItem("List");
 

  Tasks= JSON.parse(List || '{}')
  if(Tasks.length>0){
    Tasks.forEach(element => {
      if(element.isActive){
      
        element.timeRemaining=element.timeRemaining!-1;
        if(element.timeRemaining===0){
         element.status='Completed';
         element.isActive=false;
         element.timeRemaining=0;
         element.timeComplete=element.estimatedTime;
       }
      }
   });
  }


  localStorage.setItem("List",JSON.stringify(Tasks));
 
  return {
    type: IAppActionTypes.DELETETASK,
    payload:{
      task:Tasks
    }
  };
};
export const addRandomTask = () => {
  var task: ITask[]=[];
  const Arraytime:number[]=[30,45,60,120];
  var Tasks:ITask[]=[]; 
  var List=localStorage.getItem("List");
  var n:number = 0

  Tasks= JSON.parse(List || '{}')
 debugger;
  var numList=0;
   if (Tasks.length!==undefined){
      numList=Tasks.length;
      n=numList
  }
 
  var randomNumber=numList+50;
  while(n <= randomNumber) { 
    const random = Math.floor(Math.random() * Arraytime.length);
    console.log(random, Arraytime[random]);
    var days=getRandomInt(30);
    var start = addDays(- days);
    var MinEnd =addDays(- days);
 
    var end = new Date()
    var ExtraTime;
    if(n>40){
      ExtraTime=getRandomInt(120);
      MinEnd.setMinutes(MinEnd.getMinutes() + ExtraTime);
       
    }else{
      ExtraTime=0;
      MinEnd.setMinutes(MinEnd.getMinutes() + Arraytime[random]);
    }
    
  
    end= new Date(MinEnd);
   var final=randomDate2(start,end);
    task.push({
      id:n,tittle:"Work"+n,
      time:start,
      estimatedTime:Arraytime[random],
        timeComplete:ExtraTime,
        timeRemaining: Arraytime[random]-ExtraTime,
      description:"description"+n,
      isActive:false,
      status:"Completed"})
   n++;
  } 
if(Tasks.length!=undefined){
  Tasks= JSON.parse(List || '{}')
  Tasks.forEach(element => {
    task.push(element)
});
}

 
 localStorage.setItem("List",JSON.stringify(task));
  return {
    type: IAppActionTypes.ADDRANDOMTASK,
    payload:task
  };
};
function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}
function addDays(days : number): Date{
  var futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  return futureDate;
}

function randomDate2(start:Date, end:Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
export const deleteTasks = () => {
  
  
 localStorage.clear();
  return {
    type: IAppActionTypes.DELETETASKS,
    payload:[]
  };
};


export const GetTask = () => {
  var Tasks:ITask[]=[]; 
  var List=localStorage.getItem("List");
  Tasks= JSON.parse(List || '{}')
  return {
    type: IAppActionTypes.GETTASK,
    payload:{
      task:Tasks
    }
  };
};



