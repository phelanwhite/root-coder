export type TaskType = {
  title: string;
  description: string;
  completed: boolean;
};

export interface ITaskForm {
  data?: TaskType;
  onchangeData?: (data: TaskType) => void;
}
