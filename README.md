# Distributed real-time chat
A minimum, skeleton implementation of a scalable chat system including server, client, and Redis adapter.

### How to run the system locally?

1. Start Redis Docker container `docker run -d --name redis-server -p 6379:6379 redis/redis-stack`.
2. Run `cd server && node distributed_server.js` in a terminal to start the first SocketIO server.
3. In another terminal run `cd client && yarn start`.
4. A browser tab will be opened automatically at `localhost:3000`. Open another tab in a separate window then also go to `localhost:3000`. The two windows should be side-by-side or on different screens for easy testing.
5. Now confirm two things:
- In the top half input fields in either tab, type in messages to see real time chatting between the two clients.
- In the bottom half, type in messages to see that chatting is not working yet.
6. In another terminal run `PORT=3002 node distributed_server.js` to start the second SocketIO server, then confirm in either tab that all fields in the same room - including those in the bottom half - now receive the same messages.

That's it! You have just shown that distributed servers can serve users in the same chat room. This can be easily scaled to serve millions of users.

### Production deployment
This should be pretty easy to deploy to production - with something like this in your `entrypoint.sh` for Docker:
```
nohup node distributed_server.js > socket_output.txt &
serve -s build (or however you serve your React code)
```
If you are beyond the stage of running an MVP, maybe run SocketIO server as a service.

For Redis, you can either use a cloud service or deploy it as a Kubernetes service in the same cluster.
