## Project setup
```
As the first step to setup the project properly, both Node.js and npm must be installed.
Once that is done, you can run the command `npm install` from terminal into the project directory, to install the dependencies, which will create both a `package-lock.json` file, and a `node_modules` directory into our project folder.

This project was built using npm 6.14.17 version, and runs vue 2.7.15 version. To check for other dependencies versions, go to `package-lock.json` file.
```

### Compiles and hot-reloads for development
```
To compile the project in local development mode, including hot-reloads feature, run the command `npm run serve` from terminal into the project directory. This will run the application locally, in the following url: `http://localhost:8081/`. In case you need to change the port number, you can do so by opening the file `vue.config.js` in the project directory, and changing the property `port` from the object `devServer`.
```

### Compiles and minifies for production
```
To compile the project in production mode, so that it is ready to be deployed, run the command `npm run build` from terminal into the project directory. This will create a `dist` folder in the project directory, which contains every file and directory to be uploaded to our production environment.
```

### Project design
```
This project currently runs in a single view `Home`, with a root vue component `App`.
`App` contains a global custom component `Spinner`, to be displayed during long or asynchronous processes. It also contains an app bar component, to show both the logo and title for the application. However, the main view in this root component contains `router-view`, using `vue-router` dependency, instead of our only current view `Home`. This was done to make the project easier to scale, in case new views are added in the future.

Appart from `Spinner`, two more global custom components are available: `ActionButton` and `ConfirmationDialog`. These were made global because of their wide utility, and are defined to be easily reusable.

`Home` view contains few different components, appart from the two global ones mentioned above. 
First one is `TasksList`, which shows the array of tasks received in tabular form. It was done using vuetify component `v-data-table`. This component receives two properties: `items` and `itemsPerPage`. Headers for this table were defined as an array in the component itself, instead of as a property to be received, since it was created for a very specific function. However, in case this component had a wider use, `headers` could be received as a property from the parent view.

`Home` also contains a number of different custom dialog components, to cover different functionalities implemented. Since some of the properties received by these components were similar, they were defined as an array of objects in the data of this view, containing their different properties, and then created dinamically using a `component` tag. This helped reduce the number of code lines drastically.

One of these dialog components is the global `ConfirmationDialog` mentioned before. It is used to confirm the deletion of a task.

There are two more dialog components used: `TaskFormDialog` and `IdSearchDialog`.
`TaskFormDialog` implements a vuetify dialog component, that contains a form to both create and edit a task. These two actions use the same dialog because of the similarities of their forms. However, this component receives a property `action`, allowing to differentiate between creation and edition. This way, different input fields are displayed depending on the action received. In case creation and edition forms were not as similar, creating different dialog components for these two actions could be a good idea. In any case, both the dialog accept and cancel buttons functions are emited, so different actions can lead to different functions. In this case, a single function `executeAction` was defined in the main view, receiving the same string `action` sent to the component, and firing different functionalities depending on its value.
This component also receives a property `task`, set by default to `null`. Property `task` helps display current task information when editing the task. This component also disables all form inputs in case the task status is set to `Completed`, allowing a `read only` form in these cases. To conclude with this dialog, rules were added to every input needed, to improve user experience and avoid errors.

`IdSeachDialog` also contains a very small form with only one text field input, with its own rules to ensure an ID number is provided. This component implements a very specific functionality, since it searches for a task matching the ID specified in the text field. In case it a task is found, this task is stored, and the component emits a custom function defined by its parent. If no task is found, the component displays a message indicating so.

Functionality-wise, this application displays a very intuitive interface, listing all existing tasks in tabular form ordered by due date, and allowing to create new ones, or edit and delete the ones already created.
To create a new task, a form must be filled indicating title, description and due date for the task. This task will also receive a numeric ID, assigned automatically by searching for the next one available, and a default status called `Pending`.
To edit an existing task, an ID number must be provided, and in case a task under that ID is found, a form will display, showing the current task information, and allowing to change all its fields if the task status is not `Completed`. This `Completed` status can be assigned to the task by marking the checkbox `Mark as completed`, in the edit form.
To delete an existing task, an ID number must be provided, and in case a task under that ID is found, a confirmation dialog will appear, claiming we are about to perform an irreversible action. In case the accept button in this dialog is pressed, the selected task will be deleted.

All tasks information is stored both in the vue state, by using store structure and methods granted by `vuex` dependency, and in the browser local storage, to ensure data persistency.

```