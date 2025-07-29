// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

//1. Get tasks
export const getTask = () => {
  return api.get("/taskslist");
};

//2. Add task
export const postTask = (user_id, title) => {
  return api.post("/addtask", { user_id, title });
};

//3. Delete task
export const deleteTask = (user_id, id) => {
  return api.delete(`/deletetask/${id}`, { data: { user_id } }); // Pass user_id in the request body
};

//4. Update task title
export const updateTask = (id, title) => {
  return api.put(`/updatetask/${id}`, { title });
};

//5. update checkbox
export const updateCheckboxTask = (id, completed) => {
  return api.put(`/checkboxtask/${id}`, { completed }); // Send the new title in the request body
};
//6. update uncheckbox
export const updateUnCheckboxTask = (id, completed) => {
  return api.put(`/uncheckboxtask/${id}`, { completed }); // Send the new title in the request body
};
// 7. search implememnting
export const searchTask = (user_id, title) => {
  return api.get("/searchtask", { user_id, title });
};