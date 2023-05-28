 

## Setups
The application is containerized using Docker. The user interface is defined using JavaScript and DOM elements. You may deploy with or without docker using typical LAMP stack.
When you deploy or host on your php server, you can copy paste folder in this structure.
```
- your-project
    -- config/
    -- public/
```
No external libraries required.


## Installation and setup on LAMP 
To install NeonCyberPanda, please follow the steps below:
1. Open the repository code.
2. Navigate to the root directory: `cd NeonCyberPanda  `
3. If you have your own LAMP configured, you can copy `public/*` into `var/www/` or `/var/public`
4. If you have your own LAMP configured, you can copy `config/*` into `var/config/` .
```
- your-project
    -- config/
    -- public/
```

## Using on Docker to start ,build and deploy
To install NeonCyberPanda, please follow the steps below:

1. Open the repository code.
2. Navigate to the root directory: `cd NeonCyberPanda  `
3. If you prefer docker, you can release via build the Docker image: `docker build -t  neon-cyber-panda .` Then `docker run -p 8080:80 -d neon-cyber-panda` or deploy docker into cloud.
4. If you just wanna run local development the Docker container: `docker-compose up`
5. Access the application in your web browser at `http://localhost:8080`
6. In our docker, we connect with mysql for you if you want to extend.
 
 

##  Development Coding : SCSS and CSS
To build scss into css, just run `npm i && npm run compile:sass`


## Development Coding : HTML
You may modify `index.php` and `templates/*.php`

## Development Coding : Vanilla JS
We use vanilla js plain under `js/**` folder.
You can add own connector , handler , definition and finally initialize.
 