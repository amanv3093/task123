import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  let [initialData, setinitialData] = useState([]);
  let [taskDescription, setTaskDescription] = useState("");
  let [taskTitle, setTaskTitle] = useState("");
  useEffect(() => {
    async function fun() {
      let Fetch = await fetch(
        "https://run.mocky.io/v3/90fc9e7a-53eb-4c28-9d9b-4f5aa6a441d2"
      );
      let Response = await Fetch.json();
      setinitialData(Response);
    }
    fun();
  }, []);
  const handelAddTask = (e) => {
    e.preventDefault();
    if (!taskDescription || !taskTitle) {
      alert("required all field");
    }
    const newTask = {
      id: Math.random(),
      title: taskTitle,
      description: taskDescription,
    };
    const updateData = initialData.map((elem) => {
      if (elem.title === "Must haves") {
        // console.log(elem);
        // var a = { ...elem };

        // console.log(a);

        return {
          ...elem,
          // tasks: [...elem.tasks, newTask.id],
          // title: [...elem.title, newTask.title],
          // description: [...elem.description, newTask.description],
        };
      }

      // return elem;
    });
    console.log(updateData);
  };
  console.log(initialData);
  // console.log(taskDescription, taskTitle);

  return (
    <div className="board">
      <h2 className="board__title">Tasks</h2>
      <div className="board__columns">
        {initialData &&
          initialData.map((column, index) => (
            <div className="column" key={index}>
              <h2 className="column__title">{column.title}</h2>
              <div className="column__cards">
                <div className="card">
                  {column.tasks.map((taskId, idx) => (
                    <div key={idx}>
                      <h3 className="card__title">title : {taskId.title}</h3>
                      <p className="card__description">
                        description : {taskId.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <form onSubmit={handelAddTask}>
        <div className="input-container">
          <input
            name="taskTitle"
            placeholder="Task title*"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div className="input-container">
          <textarea
            name="taskDescription"
            placeholder="Task description*"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <input type="submit" value="Create task" />
        </div>
      </form>
    </div>
  );
}

export default App;
