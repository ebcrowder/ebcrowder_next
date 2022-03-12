---
date: "2022-02-19"
title: "Remote debugging Node applications with Chrome Dev Tools"
tags: ["Node", "Linux"]
---

Recently, I discovered that you can debug Node applications using the Chrome Dev Tools debugger. The Chrome debugger is something I use all of the time when working with front-end code, so being able to use it to debug server-side code is a huge plus.

I do most of my work in remote cloud virtual machines. By setting up an SSH tunnel between the local machine and cloud instance, I was able to use the Chrome debugger to debug Node applications just as if they were running on my machine! This guide expands on the official Node documentation and details how to set up the required secure connections to achieve this.

The following instructions should work for all Chromium-based browsers, including Chrome, Edge, Brave, etc.

Create two SSH tunnels: one for port 9229 and the other for port 3000. This will allow the debugger to attach to the debug server running at port 9229. The tunnel for port 3000 will allow you to send requests to the running application from your local environment.

Create the tunnels by running the following commands in separate terminal windows or tabs:
```bash
ssh -L 9229:localhost:9229 user@remote_machine
ssh -L 3000:localhost:3000 user@remote_machine
```

Ports 9229 and 3000 of the remote machine are accessible from your local machine via localhost:9229 and localhost:3000.

In the terminal window that is forwarding port 3000, navigate to your project directory and run:
```bash
node --inspect server.js
```
This will output:
```bash
$ node --inspect server.js
Debugger listening on ws://127.0.0.1:9229/23c39451-ab54-4a95-b618-4c5e41ea5638
For help, see: https://nodejs.org/en/docs/inspector
Example app listening on port 3000
```

Per above, the application has been launched and is running on the host machine at port 3000, which is project-specific. Further, the `--inspect` flag instructs the Node runtime to also spawn a debug server to listen for debug client connections on port 9229. This is the connection point that the Chrome Dev Tools debugger client will use for establishing a connection.

In a browser, go to `chrome://inspect`. 

Under Devices, click on the "Port-forwarding" and "Configure" buttons and enter localhost:9229 and localhost:3000, if not already present.

At this point, the browser will attempt to make a connection to the debug server running on port 9229. If it is successful, you will see it appear:

![Dev tools menu](/assets/images/2022-02-19_01.webp "dev tools")

Click "inspect" to open the dev tools window. Go to the "Sources" tab and add breakpoints as you see fit, then send a request to the server.
```bash
curl localhost:3000
```
The debugger should pause execution and allow you to inspect your code.

![Dev tools debugger](/assets/images/2022-02-19_02.webp "dev tools debugger")

Happy debugging.

### Sources
https://nodejs.org/en/docs/guides/debugging-getting-started/
