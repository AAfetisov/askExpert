import TodoOps from "../types";

export const initTodoAc = (data) => ({
  type: TodoOps.TODO_INIT,
  payload: { data },
});

export const setLoading = (state) => ({
  type: TodoOps.LOADING_SET,
  payload: state,
});

export const getTodoTh = (signal) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch(
      'http://localhost:4000/form',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        signal,
      },
    );
    const data = await response.json();
    if (response.ok) {
      dispatch(initTodoAc(data));
    } else {
      console.log(data.err);
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const delTodoTh = (id) => async (dispatch) => {
  const response = await fetch(
    'http://localhost:4000/form',
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      credentials: 'include',
    },
  );
  if (response.ok) {
    dispatch({ type: TodoOps.TODO_DEL, payload: { id } });
  }
};

export const flipTodoTh = (id, currentState) => async (dispatch) => {
  const response = await fetch(
    'http://localhost:4000/form',
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id, state: !currentState }),
    },
  );
  if (response.ok) {
    const data = await response.json();
    dispatch({ type: TodoOps.TODO_UPDATE, payload: { data } });
  }
};

export const updateTitleTh = (id, title) => async (dispatch) => {
  const response = await fetch(
    'http://localhost:4000/form',
    {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title }),
    },
  );
  if (response.ok) {
    const data = await response.json();
    dispatch({ type: TodoOps.TODO_UPDATE, payload: { data } });
  }
};
