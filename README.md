[![Build Status](https://travis-ci.org/joariasl/bitacora-practica-ici-uct.svg?branch=master)](https://travis-ci.org/joariasl/bitacora-practica-ici-uct)

# Bitacora de práctica ICI UCT

Sistema para hacer más amena la tarea de registrar una bitácora de práctica en una de nuestras últimas etapas de nuestra carrera universitaria.

## How run or use

### Install
* Install NodeJS
* Install Ruby. (In Windows: http://rubyinstaller.org/ (Check add PATH))
* Install compass (SASS) (Use sudo in Unix/Linux):

  ```sh
  gem install compass
  ```
* Copy the project in a PHP compatible server
* Open a command line terminal and locate in `cd [project-folder]/www/application`
* Download Composer (PHP) resources (https://getcomposer.org/)

  ```sh
  composer install
  ```
* Open a command line terminal and locate in `cd [project-folder]/ng`
* Run npm install

  ```sh
  npm install
  ```
* Download Bower resources

  ```sh
  bower install
  ```
* For avoid the "HTTP access control (CORS)" problem, set in the `ng/Gruntfile.js` the property grunt config value of `connect.proxies[].rewrite`, uncomment those lines and replace `^/api': '/api` for your real host, port and path server of your running PHP compatible server. Eg:

  ```javascript
  proxies: [
    {
      context: '/api',
      host: 'localhost',
      port: 80,
      rewrite: {
        '^/api': '/bitacora-practica/www/index.php/api'// (Optional) Rewrite ^/api to the /api path (replace that for your real path) on your remote server path, in case that your server path is located in another path
      }
    }
  ]
  ```
* Create database and launch creator SQL script: `resources_dev/database.sql`
* Configure database connection in file: `www/application/config/database.php`
* Configure Google Sign-in files:
  * `www/application/config/gapi.php`
  * `ng/app/index.html`

  Change for you own Google client ID and Secret: https://developers.google.com/identity/sign-in/web/

### Run
```sh
grunt serve
```
