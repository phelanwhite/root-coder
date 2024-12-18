import React, { ChangeEvent, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { TaskType } from "../assets/type";
import { useMutation } from "@tanstack/react-query";
import { taskCreate, taskUpdateId } from "../services/task";
import { useParams } from "react-router-dom";

const TaskForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const createAndUpdate = useMutation({
    mutationFn: async () => {
      try {
        let result;
        if (window.location.pathname.includes("create")) {
          result = await taskCreate(fromData);
        } else {
          result = await taskUpdateId(id as string, fromData);
        }
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      window.location.pathname.includes("create")
        ? messageApi.open({
            type: "success",
            content: "Task saved successfully!",
          })
        : messageApi.open({
            type: "success",
            content: "Task removed successfully!",
          });
    },
    onError: () => {
      window.location.pathname.includes("create")
        ? messageApi.open({
            type: "error",
            content: "Failed to save task!",
          })
        : messageApi.open({
            type: "error",
            content: "Failed to remove task!",
          });
    },
  });
  const [fromData, setFormData] = useState<TaskType>({
    title: "",
    description: "",
    completed: false,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...fromData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAndUpdate.mutate();
  };

  if (createAndUpdate.isPending) return <div>Loader...</div>;

  return (
    <div>
      {contextHolder}
      <Form
        title="Create Task"
        className="max-w-[1000px] mx-auto rounded shadow p-4 border"
        onSubmitCapture={handleSubmit}
        layout="vertical"
        wrapperCol={{}}
      >
        <div className="text-xl font-semibold mb-4">Task Create</div>
        <Form.Item label={`Title`}>
          <Input
            required
            value={fromData.title}
            name={`title`}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label={`Description`}>
          <Input.TextArea
            rows={5}
            value={fromData.description}
            name={`description`}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskForm;
