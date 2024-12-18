import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import { useMemo } from "react";
import { taskGetAll } from "../services/task";
import { Link } from "react-router-dom";

const HomePage = () => {
  const tasksResult = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      try {
        const response = await taskGetAll();
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  });
  const dataSource = useMemo(() => {
    return tasksResult.data?.map((task: any) => ({ ...task, key: task?._id }));
  }, [tasksResult.data]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Compeleted",
      dataIndex: "completed",
      key: "completed",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <Link to={`/create`}>
          <Button type="primary" size="small">
            Add task
          </Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default HomePage;
