import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const createAnecdote = (newAnecdote) => {
  try {
    return axios.post(baseUrl, newAnecdote).then((res) => res.data);
  } catch (err) {
    console.log(err);
  }
};

export const updateAnecdote = (updatedAnecdote) => {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
};
