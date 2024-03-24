import React, { useState } from "react";

const taskBoxes = ["Unplanned", "Today", "Tomorrow", "This Week", "Next Week"];

const initialTasks = [
  { id: 1, content: "Reply to client emails", taskBox: "Unplanned" },
  { id: 2, content: "Review project documentation", taskBox: "Unplanned" },
  { id: 3, content: "Prepare presentation for meeting", taskBox: "Unplanned" },
  { id: 4, content: "Attend team brainstorming session", taskBox: "Unplanned" },
  { id: 5, content: "Code review with senior developer", taskBox: "Unplanned" },
  { id: 6, content: "Update project milestones", taskBox: "Unplanned" },
  { id: 7, content: "Test new software feature", taskBox: "Unplanned" },
  { id: 8, content: "Document API endpoints", taskBox: "Unplanned" },
  {
    id: 9,
    content: "Discuss project timelines with manager",
    taskBox: "Unplanned",
  },
  { id: 10, content: "Research new technology trends", taskBox: "Unplanned" },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskContent, setTaskContent] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, taskBox) => {
    e.preventDefault();
    if (draggedTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === draggedTask.id ? { ...task, taskBox } : task
      );
      setTasks(updatedTasks);
      setDraggedTask(null);
    }
  };

  const addTask = () => {
    if (taskContent) {
      const newTask = {
        id: Math.max(...tasks.map((task) => task.id), 0) + 1,
        content: taskContent,
        taskBox: "Unplanned",
      };
      setTasks([...tasks, newTask]);
      setTaskContent("");
    }
  };

  return (
    <>
      <h1>Drag and Drop Tasks</h1>
      <div className="main-header">
        <input
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          className="input"
          type="text"
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="main">
        {taskBoxes.map((taskBox) => (
          <div
            key={taskBox}
            className="TaskBox"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, taskBox)}
          >
            <h2>{taskBox}</h2>
            {tasks
              .filter((task) => task.taskBox === taskBox)
              .map((task) => (
                <div
                  key={task.id}
                  className="task"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  {task.content}
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
