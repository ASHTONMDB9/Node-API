Create a .gitignore file with the following inside, to ignore pushing these files to github

node_modules => Ignore NPM packages from being uploaded


.env => Ignore .env which contains environment variables, which is usually sensitive information. add the following into this file

        DB_HOST => Clevercloud Host
        DB_USER => Clevercloud User
        DB_PASS => Clevercloud Password
        DB_NAME => Clevercloud Database Name