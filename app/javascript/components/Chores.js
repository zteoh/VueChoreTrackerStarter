import React from "react"
import PropTypes from "prop-types"
class Chores extends React.Component {

	state = { chores: []}

	componentDidMount() {
		console.log("in componentDidMount")
		this.get_chores()
	}

	run_ajax = (method, data, link, callback=function(res){return}) => {
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
		this.run_ajax('GET', {}, '/chores.json', (res) => {this.setState({chores: res})});
	}

	displayChores = () => {
		return this.state.chores.map((chore, index) => {
	        // return <li key={index}>Chore ID: {value.id}</li>
	        return (
	        	<tr>
		            <td width="125" align="left">{chore.child_id}</td>
		            <td width="200" align="left">{chore.task_id}</td>
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
