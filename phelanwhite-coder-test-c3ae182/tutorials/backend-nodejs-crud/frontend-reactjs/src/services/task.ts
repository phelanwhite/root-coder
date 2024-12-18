import axios from "axios";

export const taskGetAll = async () => {
  try {
    const url = `http://localhost:5000/task/`;
    const resp = (await axios.get(url)).data;
    return resp;
  } catch (error) {
    console.log(error);
  }
};
export const taskGetId = async (id: string) => {
  try {
    const url = `http://localhost:5000/task/${id}`;
    const resp = (await axios.get(url)).data;
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const taskCreate = async (data: unknown) => {
  try {
    const url = `http://localhost:5000/task/`;
    const resp = (await axios.post(url, data)).data;
    return resp;
  } catch (error) {
    console.log(error);
  }
};
export const taskUpdateId = async (id: string, data: unknown) => {
  try {
    const url = `http://localhost:5000/task/${id}`;
    const resp = (await axios.post(url, data)).data;
    return resp;
  } catch (error) {
    console.log(error);
  }
};
