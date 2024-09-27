import React, { useState, useEffect } from 'react';

function App() {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  
  const [newTask, setNewTask] = useState('');


  const [searchQuery, setSearchQuery] = useState('');


  const [filter, setFilter] = useState('all');

  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // function for adding a new task in app
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = { id: Date.now(), title: newTask, completed: false };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  // Function for taggling a task
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // for deleting  a task
  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  };

  // fitering task
  const filteredTasks = tasks.filter((task) => {
    const matchesSearchQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearchQuery) return false;

    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return false;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">To-Do List</h1>

        
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

      
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="ml-3 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

      
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-5 py-2 rounded-lg ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            } transition duration-200`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-5 py-2 rounded-lg ${
              filter === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            } transition duration-200`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`px-5 py-2 rounded-lg ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            } transition duration-200`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

       
        <ul className="divide-y divide-gray-300">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center py-4"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span
                    className={`${
                      task.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    } text-lg`}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 transition duration-200"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500 py-4">No tasks available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
