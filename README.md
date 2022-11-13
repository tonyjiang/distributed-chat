# Distributed real-time chat
A minimum, skeleton implementation of a scalable chat system including server, client, and Redis adapter.

### How to run the system locally?

1. First run `cd server && node distributed_server.js` in one terminal
2. In another terminal run `cd client && yarn start`
3. A browser tab is opened automatically at `localhost:3000`. Open another tab in a separate window then also go to `localhost:3000`. The two windows should be side-by-side or on different screens for easy testing.
4. Now confirm two things:
- In the top half input fields, type in messages to see real time chatting between the two clients.
- In the bottom half, type in messages to see that things are not working yet.
5. In another terminal run `PORT=3002 node distributed_server.js` then confirm in the browser that all fields in the same room - including those in the bottom half - now receive the same messages.

That's it! You have just proven that distributed servers can serve users in the same chat room. This can be easily scaled to serve millions of users.

### Production deployment
This should be pretty easy to deploy to production - with something like this in your `entrypoint.sh` for Docker:
```
nohup node distributed_server.js > socket_output.txt &
serve -s build (or however you serve your React code)
```
Or if you are beyond the stage of running an MVP, run SocketIO server as a service.

For Redis, you can either use a cloud service or deploy it as a Kubernetes service in the same cluster if you have to.
