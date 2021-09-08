import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { TextareaAutosize } from "@material-ui/core";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: "",
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTask(e) {
    //fetch manda metodo http
    if (this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          M.toast({ html: "Task modified" }), this.fetchTask();
        })
        .catch((err) => console.error(err));
    } else {
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          M.toast({ html: "Task saved" }),
            this.setState({ title: "", description: "" });
          this.fetchTask();
        })
        .catch((err) => console.error(err));
    }

    e.preventDefault();
  }

  //Apenas se monte se levante
  componentDidMount() {
    this.fetchTask();
  }

  fetchTask() {
    fetch("/api/tasks") //Por defecto es GET
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data });
      });
  }

  deleteTask(_id) {
    if (confirm("Are you sure you want to delete?")) {
      fetch(`/api/tasks/${_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          M.toast({ html: "Task deleted" }), this.fetchTask();
        })
        .catch((err) => console.error(err));
    }
  }

  updateTask(_id) {
    fetch(`/api/tasks/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id,
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div id="app">
        {/* Navigations */}
        <nav position="static" className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              Stard
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form className="" onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          type="text"
                          className=""
                          value={this.state.title}
                          name="title"
                          onChange={this.handleChange}
                          placeholder="Titulo Tarea"
                        ></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <TextareaAutosize
                          className="materialize-textarea"
                          value={this.state.description}
                          name="description"
                          onChange={this.handleChange}
                          placeholder="Descripción"
                        ></TextareaAutosize>
                      </div>
                    </div>
                    <Button className="btn light-blue darken-4" type="submit">
                      Guardar
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table className="table table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td name={task._id}>
                          <Button
                            className="btn light-blue darken-4"
                            onClick={() => this.deleteTask(task._id)}
                          >
                            <i className="material-icons">delete</i>
                          </Button>
                          <Button
                            className="btn light-blue darken-0"
                            style={{ margin: "5px" }}
                            onClick={() => this.updateTask(task._id)}
                          >
                            <i className="material-icons">edit</i>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
