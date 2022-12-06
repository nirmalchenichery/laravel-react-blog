


## Installation

1. Clone the repository
2. Install composer dependencies using `composer install`
3. Once you have installed the dependencies, you need to create the .env file. You can copy the example file using this command `cp .env.example .env`
4. After you have created you .env file you need to generate the application key by running this command `php artisan key:generate`
5. Create a new mysql database and add the details of your MySQL server in the .env file.
6. Once the database connection is ready, you need to run the migrations using the following command `php artisan migrate --seed`
7. Run tinker, Factory Command.Execute the following command on command prompt to generate or create dummy data using tinker and factory command: `php artisan tinker` and enter these `Post::factory()->count(20)->create()`,`User::factory()->count(20)->create()`
8. run `npm i --save moment`

User::factory()->count(20)->create()

--------------

npm i react-router-dom

npm install laravel-mix --save-dev
npm install jquery
npm install bootstrap
npm i @popperjs/core

npm install --save datatables.net-bs5
npm install --save datatables.net-responsive-bs5
npm install --save-dev @babel/preset-env
npm i react-laravel-paginator

<!-- npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome -->

<!-- npm i --save @fortawesome/react-fontawesome@latest -->
npm install font-awesome --save  

php artisan migrate:refresh --seed