export function getIdChapter(chapter_api_data: string) {
  return chapter_api_data?.trim()?.split(`/`).pop();
}
export function converComicData(data: any) {
  return {
    ...data,
    thumb_url: `https://img.otruyenapi.com/uploads/comics/` + data?.thumb_url,
  };
}
