import { ITask } from "./ITask";

export type IProps = {
    isOpen: boolean;
    handleCloseDialogAddTask: () => void;
    task?:ITask;
   id:number;
  };