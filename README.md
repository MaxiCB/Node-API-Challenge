# Sprint Challenge: Express and Node.js - Projects & Actions

## Description

In this challenge, you design and create a web API to manage the following resources: `Projects` and `Actions`.

## Testing Application

As per the stretch goal for all of the node project I have created a application to solve all of them. https://github.com/MaxiCB/react-node-dynamic

## Minimum Viable Product

- [ ] Configure an _npm script_ named _"server"_ that will execute your code using _nodemon_. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
- [ ] Configure an _npm script_ named _"start"_ that will execute your code using _node_.

Design and build the necessary endpoints to:

- [ ] Perform CRUD operations on _projects_ and _actions_. When adding an action, make sure the `project_id` provided belongs to an existing `project`. If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
- [ ] Retrieve the list of actions for a project.

Please read the following sections before implementing the Minimum Viable Product, they describe how the database is structured and the files and methods available for interacting with the data.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/lambda.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

## Stretch Goal

- Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
- From the React application show a list of all _projects_ using the API you built.
- Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
- Add styling!