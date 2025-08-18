import { fetchDataFromLocalStorage } from "./storage";
import type { JobApplication } from "./models"; 

// set the type for state object
type State = {
  jobApplications: JobApplication[];
  listeners: ((apps: JobApplication[]) => void)[];
};

// get stored data to set inital State
const savedData = fetchDataFromLocalStorage();

const state: State = {
  jobApplications: savedData ?? [],
  listeners: [],
};

export const appState = new Proxy(state, {
  set(target, prop, value) {
    (target as any)[prop] = value;

    if (prop === "jobApplications") {
      target.listeners.forEach((fn) => fn(value));
    }

    return true;
  },
});

export function subscribe(fn: (apps: JobApplication[]) => void): () => void {
  appState.listeners.push(fn);

  return () => {
    appState.listeners = appState.listeners.filter((f) => f !== fn);
  };
}
