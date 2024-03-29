import { createAnecdote } from "../requests";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";

import { useNotificationDispatch } from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const dispatch = useNotificationDispatch();

  const resetNotif = () => {
    setTimeout(() => {
      dispatch({ type: "RESET" });
    }, 5000);
  };

  const handleError = () => {
    dispatch({ type: "INFO", payload: "Anecdote too short" });
    resetNotif();
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: () => {
      handleError();
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
