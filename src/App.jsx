import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAll, updateAnecdote } from "./requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "./components/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const resetNotif = () => {
    setTimeout(() => {
      dispatch({ type: "RESET" });
    }, 5000);
  };

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const updated = anecdotes.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      );
      queryClient.setQueryData(["anecdotes"], updated);
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
  });

  if (result.isLoading) {
    return <div>Anecdote service is not available due to server problems</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    console.log(anecdote);
    dispatch({ type: "INFO", payload: "YOU HAVE VOTED" });
    resetNotif();
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
