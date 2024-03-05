import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "INFO":
      return action.payload;
    case "RESET":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  console.log(notificationAndDispatch);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  console.log(notificationAndDispatch);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
