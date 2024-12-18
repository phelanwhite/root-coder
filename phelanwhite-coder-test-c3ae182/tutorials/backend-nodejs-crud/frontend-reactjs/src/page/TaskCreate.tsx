import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import { TaskType } from "../assets/type";
import { useMutation } from "@tanstack/react-query";
import { taskCreate } from "../services/task";

const TaskCreatePage = () => {
  const [data, setData] = useState<TaskType | null>(null);

  const taskCreateResult = useMutation({
    mutationKey: ["taskCreate"],
    mutationFn: async () => {
      try {
        const resp = await taskCreate(data);
        return resp;
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    data && taskCreateResult.mutate();
  }, [data]);

  if (taskCreateResult.isPending) return <div>Loader...</div>;

  return (
    <div>
      <TaskForm data={data as TaskType} onchangeData={setData} />
    </div>
  );
};

export default TaskCreatePage;
