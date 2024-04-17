// create store

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import incomingReducer from "../features/incoming/incomingSlice";
import outgoingReducer from "../features/outgoing/outgoingSlice";
import taskReducer from "../features/task/taskSlice";
import userCredReducer from "../features/userCred/userCredSlice";
import userPersonalReducer from "../features/userPersonal/userPersonalSlice";
import userPhotolReducer from "../features/userPhoto/userPhotoSlice";
import todoReducer from "../features/todo/todoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    incoming: incomingReducer,
    task: taskReducer,
    outgoing: outgoingReducer,
    userCred: userCredReducer,
    userPersonal: userPersonalReducer,
    userPhoto: userPhotolReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
  devTools: true,
});

export default store;
