# ChoreTracker UX Improvements with React.js #

# Part 1: Setup and Installation #

1. Clone starter code
2. In your gemfile, add: `gem 'react-rails'` and run `bundle install`
3. Run 
    ```
    rails webpacker:install
    rails webpacker:install:react 
    rails generate react:install
    ```

    This will add the following files to the application
    ```
    create  app/javascript/components
    create  app/javascript/components/.keep
    create  app/javascript/packs/application.js
    create  app/javascript/packs/server_rendering.js
    ```
4. Link the JavaScript pack in Rails view using `javascript_pack_tag` helper
    ```
    <%= javascript_pack_tag 'application' %>
    ```
5. Generate a `Chores` Component
    ```
    rails g react:component Chores
    ```
    This would create the `Chores.js` file in  `app/javascript/components`
6. Connect the newly created `Chores` Component to your View (`app/views/chores/index.html`)
    ```
    <%= react_component("Chores") %>
    ```

TODO: Instructions about populating, using React developer tools, git commit and pain points.

# Part 2: Displaying Chores #

## Verifying connection between the `Chore` Component and Rails View

1. Render the skeleton of the table

    ```
    render () {
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th width="125" align="left">Child</th>
                                <th width="200" align="left">Task</th>
                                <th width="75">Due on</th>
                                <th width="125">Completed</th>
                            </tr>
                        </thead>
                    </table>
                    <button>New Chore</button>
                </div>
                );
        }
    ```

2. Start your server and make sure you can see the header of the table

## Get information (like child name, task name and and chore information) to populate the table

3. Create `chores` variable in the state. TODO: Explain what are states and props and the lifecycle methods

    ```
    state = { 
        chores: [],
    }

    componentDidMount() {
        this.get_chores()
    }
    ```

Create high level functions to obtain information about chores

    ```
    get_chores = () => {
        this.run_ajax('/chores.json', 'GET', {}, (res) => {this.setState({chores: res})});
    }
    ```

4. Create function to make ajax requests

    ```
    run_ajax = (link, method="GET", data={}, callback = () => {this.get_chores()}) => {
        let options
        if (method == "GET") {
            options = { method: method}
        } else {
            options = { 
                method: method, 
                body: JSON.stringify(data), 
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'same-origin'
            }
        }
        
        fetch(link, options)
        .then((response) => {
            if (!response.ok) {
                throw (response);
            }
            return response.json();
        })
        .then(
            (result) => {
                callback(result);
            })
        .catch((error) => {
            if (error.statusText) {
                this.setState({error: error})
            }
            callback(error);
        })
    }
    ```

## Populating the table

5. Add the following code after the `</thead>` tag
    ```
    <tbody>
        { this.showChores() }
    </tbody>
    ```

6. Define the function `showChores` which will ....
    ```
    showChores = () => {
        return this.state.chores.map((chore, index) => {
            return (
                <tr key={index} >
                    <td width="125" align="left">{chore.child_id}</td>
                    <td width="200" align="left">{chore.task_id}</td>
                    <td width="75" align="center">{chore.due_on}</td>
                    <td width="125" align="center">{chore.completed ? "True" : "False"}</td>
                    <td width="50">Check</td>
                    <td width="50">Delete</td>
                </tr>
                )
        })
    }
    ```

## Improving the Chore Table

7. We realise that instead of the id of the child and task, it would be better to show the name of the child and the task. First, add `tasks` array and `children` array into your `state`

8. Create high level functions to populate your `children` and `tasks` state. Remember to also add these high level functions to `componentDidMount()`

9. Now that we have all the `children`, we can map the `child_id` to the name of the child.

    ```
    find_child_name = (chore) => {
        var desired_id = chore.child_id;
        const children = this.state.children
        for (var child = 0; child < children.length; child += 1){
            if (children[child]['id'] == desired_id){
                return children[child]['first_name'].concat(' ', children[child]['last_name']);
            }
        }
        return "No name"
    }
    ```

10. Create the function `find_task_name`, which given a `chore`, would return the name of the `task` associated with the `chore`.

11. Update your `showChores` function so that you would show the name of the child and task instead of the id. Hint: In order to call a function defined in the class, you should use `this.<functionName>(<parameter>)`

12. Now your page should look like this. TODO: insert image

# Part 3: Adding a New Chore #

1. Generate a `NewChoreForm` Component. Hint: how did we first generate the `Chore` Component at the start of the lab?

## Toggling the `NewChoreForm`

2. We want the `NewChoreForm` to appear only when we click on the `Add New Chore` Button. We can create a `modal_open` variable in our state and default it to false by adding the following line in the `state`
    ```
    modal_open: false
    ```

3. Add `onClick={this.switchModal}` in the opening `<button>` tag and define the function `switchModal`. TODO: explaining setting of state and the option parameter of `prevState`
    ```
    switchModal = () => {
        this.setState(prevState => ({
            modal_open: !prevState.modal_open
        }));
    }
    ```
    Try clicking on the button and seeing whether the `modal_open` state changes in the React Developer Tool.

4. Now, we will toggle the `NewChoreForm` when the button is clicked.
    ```
    showChoreForm = () => {
        return (
            <div>
                <NewChoreForm 
                    children={this.state.children}
                    tasks={this.state.tasks}
                    run_ajax={this.run_ajax}
                    switchModal={this.switchModal}
                />
            </div>
            )
    }
    ```
    We will also add the following line below the `<button>` tag which will call`showChoreForm` when `modal_open` is `true`.
    ```
    { this.state.modal_open ? this.showChoreForm() : null }
    ```

## Creating the New Chore Form
5. Create a skeleton `render` function with a `child` dropdown. 

    ```
    render() {
        return (
            <div>
                <form>
                    <label>
                      Child:
                      <select onChange={this.handleChildChange}>
                        { this.childrenOptions() }
                      </select>
                    </label>
                    <br />

                    <input type="submit" value="Submit" />
                 </form>
          </div>
        )
      }
    ```

    Now, we would need to define `handleChildChange` and `childrenOptions`

6. Creating `childrenOptions` function
    ```
    childrenOptions = () => {
        return this.props.children.map((child, index) => {
            return (
                <option value={index}> {child.first_name} </option>
            )
        })
      }
    ```

7. Knowing which `child` is selected by keeping track of it in `state`
    ```
    state = {
      child: this.props.children ? this.props.children[0] : null
    }
    ```

    ```
    handleChildChange = (event) => {
        this.setState({child: this.props.children[event.target.value]});
      }
    ```

8. Do the same for `task` and `due_on`. Hint: update the `render` method and handle the changes of the form.

## Submitting the form
9. Add the trigger by modifying the `<form>` tag
    ```
    <form onSubmit={this.handleSubmit}>
    ```

10. Define the function
    ```
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
    ```

# Part 4: Completing and Deleting Chores #

## Toggling Completion of Chore
1. Modify the `showChores` function by adding `onClick={() => this.toggle_complete(chore)}` in the `<td>` opening tag.

2. Define the `toggle_complete` function
    ```
    toggle_complete = (chore) => {
        const updated_chore = {
            child_id: chore.child_id,
            task_id: chore.task_id,
            due_on: chore.due_on,
            completed: !chore.completed
        }
        this.run_ajax('/chores/'.concat(chore.id, '.json'), 'PATCH', {chore: updated_chore});
    }
    ```

## Deleting a Chore
3. Modify the `showChores` function by adding `onClick={() => this.remove_record(chore)}` in the `<td>` opening tag.

4. Define the `remove_record` function
    ```
    remove_record = (chore) => {
        this.run_ajax('/chores/'.concat(chore['id'], '.json'), 'DELETE', {chore: chore});       
    }
    ```

# Part 5: Error Handling #
