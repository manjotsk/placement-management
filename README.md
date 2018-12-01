# placement-management

Hi Welcome to this Application. Follow the folloing instructions to setup the development environment on your local machine.

1. Download XAMPP and start apache, and mysql server. You'll need mysql workbench to see the database in tabled format.
2. Create a database names placement_management.
3. Create a user called root, wwith password as 123456. Please, follow the dollowing command to do that 
`SET PASSWORD FOR 'placement-management'@'localhost' = PASSWORD('123456');`
4. Ask for the database dump from the concerned person and import the dump to the mysql database on your connection.
5. Now that you have already cloned the project, you'll see, there are two project folders. a) server-api, b) my-app
6. Always remember, you'll need to install `Nodejs 10.*` You'll need to start the `server-api` first, and then, you'll start the my-app. you'll also need to install yarn package manager using `npm i -g yarn`.
7. To start `server-api` you'll have to follow the following steps
    1.  Change your directory to `~/server-api` using `cd server-api`
    2.  Run the command `yarn` to install the dependencies (Required only first time, or when new dependencies are installed)
    3.  after dependencies have finished installing, run `yarn start` to start the Server.
8. To start `my-app` i.e. front-end, you'll have to follow the following steps
    1.  Change your directory to `~/my-app` using `cd myapp`
    2.  Run the command `yarn` to install the dependencies (Required only first time, or when new dependencies are installed)
    3.  after dependencies have finished installing, run `yarn start` to start the front-end.

Congratulations! Your project is now all set for development!