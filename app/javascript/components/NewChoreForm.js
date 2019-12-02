import React from "react"
import PropTypes from "prop-types"

class NewChoreForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'coconut',
      child: this.props.children ? this.props.children[0] : null,
      task: this.props.tasks ? this.props.tasks[0] : null,
      due_on: '',
      completed: false
    };
  }

  childrenOptions = () => {
  	return this.props.children.map((child, index) => {
        return (
        	<option value={index}> {child.first_name} </option>
	    )
    })
  }

  tasksOptions = () => {
  	return this.props.tasks.map((task, index) => {
        // return <li key={index}>Chore ID: {value.id}</li>
        return (
        	<option value={index}> {task.name} </option>
	    )
    })
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleChildChange = (event) => {
    this.setState({child: this.props.children[event.target.value]});
  }

  handleTaskChange = (event) => {
    this.setState({task: this.props.tasks[event.target.value]});
  }

  handleDueOnChange = (event) => {
    this.setState({due_on: event.target.value});
  }

  handleSubmit = (event) => {
    const new_chore = {
                    child_id: this.state.child.id,
                    task_id: this.state.task.id,
                    due_on: this.state.due_on,
                    completed: this.state.completed
                }
    this.props.run_ajax('/chores.json', 'POST', {"chore": new_chore});
    this.props.switchModal()
  }

  render() {
  	return (
  		<div>
  			<form onSubmit={this.handleSubmit}>
		        <label>
		          Child:
		          <select value={this.state.value} onChange={this.handleChildChange}>
		            { this.childrenOptions() }
		          </select>
		        </label>
		        <br />

		        <label>
		          Task:
		          <select value={this.state.value} onChange={this.handleTaskChange}>
		            { this.tasksOptions() }
		          </select>
		        </label>
		        <br />

		        <input type="date" name="due_on" onChange={this.handleDueOnChange} />
		        <br />
		        
		        <input type="submit" value="Submit" />
		     </form>
      </div>
  	)
  }
}

export default NewChoreForm
