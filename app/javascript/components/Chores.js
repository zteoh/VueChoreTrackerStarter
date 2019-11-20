import React from "react"
import PropTypes from "prop-types"
class Chores extends React.Component {

	state = { 
		chores: [],
		tasks: []
	}

	componentDidMount() {
		console.log("in componentDidMount")
		this.get_chores()
		this.get_tasks()
		this.get_children()
	}

	run_ajax = (link, callback=function(res){return}) => {
		console.log("in run_ajax")
		fetch(link)
		.then(res => res.json())
		.then(
			(result) => {
				callback(result);
			},
	        (error) => {
	        	console.log("error!")
	        }
	    )
	}

	get_chores = () => {
		console.log("in get_chores!")
		this.run_ajax('/chores.json', (res) => {this.setState({chores: res})});
	}

	get_tasks = () => {
        this.run_ajax('/tasks.json', (res) => {this.setState({tasks: res})});
    }

    get_children = () => {
        this.run_ajax('/children.json', (res) => {this.setState({children: res})});
    }

	find_task_name = (chore) => {
		var desired_id = chore.task_id;
		const tasks = this.state.tasks
        for (var task = 0; task < tasks.length; task += 1){
            if (tasks[task]['id'] == desired_id){
                return tasks[task]['name'];
            }
        }
        return "No task"
	}

	find_child_name = (chore) =>{
	    var desired_id = chore.child_id;
	    const children = this.state.children
	    for (var child = 0; child < children.length; child += 1){
	        if (children[child]['id'] == desired_id){
	            return children[child]['first_name'].concat(' ', children[child]['last_name']);
	        }
	    }
	    return "No name"
	}

	displayChores = () => {
		return this.state.chores.map((chore, index) => {
	        // return <li key={index}>Chore ID: {value.id}</li>
	        return (
	        	<tr>
		            <td width="125" align="left">{this.find_child_name(chore)}</td>
		            <td width="200" align="left">{this.find_task_name(chore)}</td>
		            <td width="75" align="center">{chore.due_on}</td>
		            <td width="125" align="center">{chore.completed ? "True" : "False"}</td>
		            <td></td>
		        </tr>
		    )
	    })
	}

	render () {
		console.log("in render")
		return (
			<table>
		        <tr>
		            <th width="125" align="left">Child</th>
		            <th width="200" align="left">Task</th>
		            <th width="75">Due on</th>
		            <th width="125">Completed</th>
		            <th></th>
		        </tr>
			    { this.displayChores() }
			</table>
			);
	}
}

Chores.propTypes = {
	myProp: PropTypes.string
};
export default Chores
