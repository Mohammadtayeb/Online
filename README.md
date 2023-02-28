      **Online Chating**
Here is a project called *chat* which has an app called *online*. This project is made flexible that users without any logging in, can chat online with anyone in the planet. First users should type in their names and then they will be redirected to the public chat room. Every one using this app can read and write messages to that public chat room. Precisely this project is a simple public chat room that every user can chat to one onother in real time.

**How to run the project?**

First you should note that this project is a django web based project. You have to insall django in order to run the project. Secondly, for real time request we need websockets. Websockets server is apart from normal django server. Here is used channels for communiating users through websockets real time requests. You should install channels with Daphne ASGI application. Also here is used channel layers that uses redis as it's backing store. For starting a redis server on port 6379, you should run the following command.
*docker run -p 6379:6379 -d redis:5*. For running this command, you should notify that docker is needed. So you should have installed docker as well in your system. Then when docker is running, try to run the above command. channels_redis is also needed to be installed.
That is it for running this project.

