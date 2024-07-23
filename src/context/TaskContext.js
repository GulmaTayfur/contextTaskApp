import axios from 'axios';
import {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(err => setError(err));
  }, []);

  const removeTask = id => {
    const filtred = tasks.filter(task => task.id !== id);
    setTasks(filtred);
    Alert.alert('Task Silindi');
  };

  const addTask = title => {
    const newTask = {
      userId: 1,
      id: tasks.length + 1,
      title,
    };
    setTasks([...tasks, newTask]);
    Alert.alert('Yeni task eklendi');
    setNewTaskTitle('');
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        removeTask,
        addTask,
        newTaskTitle,
        setNewTaskTitle,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
