import axios from "axios";

const Base_URL = `https://otruyenapi.com/v1/api`;

export async function getHomeApi() {
  try {
    const url = Base_URL + `/home`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getListApi(type: string, query?: string) {
  try {
    const url = Base_URL + `/danh-sach/${type}?${query}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getCategoriesApi(slug?: string, query?: string) {
  try {
    const url1 = Base_URL + `/the-loai/${slug}?${query}`;
    const url2 = Base_URL + `/the-loai`;
    const response = await axios.get(slug ? url1 : url2);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getComicApi(slug: string) {
  try {
    const url = Base_URL + `/truyen-tranh/${slug}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getChapterApi(id: string) {
  try {
    const url = `https://sv1.otruyencdn.com/v1/api/chapter/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function getSearchApi(query?: string) {
  try {
    const url = Base_URL + `/tim-kiem?${query}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}
