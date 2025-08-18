import type { JobApplication } from "./models";

// set all the Local Storage key
export const LOCAL_STORAGE_KEY_JOB_LIST = "job_applications";
export const LOCAL_STORAGE_KEY_TOKEN = "token";
// const AUTH_TOKEN = "auth_token"

//method for store in local storage
export function storeDataInLocalStorage(data: JobApplication[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY_JOB_LIST, JSON.stringify(data));
}

//method for fetch from local storage
export function fetchDataFromLocalStorage() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY_JOB_LIST);
  return data ? JSON.parse(data) : [];
}
