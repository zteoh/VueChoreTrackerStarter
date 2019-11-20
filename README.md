# ChoreTracker UX Improvements with Vue.JS #

# Part 1: Setup and Installation #

1. Clone starter code
2. In your gemfile, add: `gem 'react-rails'` and run `bundle install`
3. run ```
rails webpacker:install
rails webpacker:install:react 
rails generate react:install
```
This will add a series of files to the application
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
rails g react:component Chores myPropName:string
```
6. Check the rendering on the rails view
```
<%= react_component("Chores", { myPropName: "Hello from react-rails." }) %>
```

# Part 2: Adding a New Chore #

1. Create a new jsx file called `Chores.jsx` in `app/javascripts/components`
