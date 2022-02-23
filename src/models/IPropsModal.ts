import { ITask } from "./ITask";

export type IPropsModal = {
    isOpen: boolean;
    handleCloseDialogAddTask: () => void;
    id?:ITask;
   
  };