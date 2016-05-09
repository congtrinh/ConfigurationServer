# TenableNodeProject

#Notes
A simple node server that logs users in and out as well as provide a way for users to save configs.
All repo are in memory and will not persistent after the server is shut down.
See API and mocha tests for examples.

To run the server (node server)
run mocha  (mocha)

#Reviewer
Running the test will output a username, password, and token for the current run. You can use these info to continue testing if needed.

#API

####Create user
Not part of the assignment but needed for testing. Post method to /v1/users/create with a json payload of  username and password.
Passwords are hashed and stored in a repo
####Login
A post method to /v1/users/login sending a payload containing username and password.
A json respond containing a token will be returned. The server expects the user to send this token in the x-access-token header from now on.

The token are randomly generated and stored a long with the username. Future improvement would be to use a JWT token instead. The repo does not have expiry mechanism. In reality this should be a cache with an eviction policy.

####Logout
A post to /v1/users/logout will remove the token from the repo and invalidate the token
  
####CreateConfig
A post to /v1/config will create a new config under the currently user. Expected payload is { 'name': 'testName', 'hostname': 'testHostname', 'port': 'testPort', 'username': 'testUsername' }
Config name must be unique or a conflict error will be thrown.

####GetConfig
#####Single config
get /v1/config/:name will return a single config
#####All config
get /v1/config will return a all config
#####Limit and start config
get /v1/config also support query string "sort", "limit" and "start". sort will sort the return array based on name, hostname, port, username (get /v1/config?sort=name)
limit which only return a subset of the array from 0-limit. start will return a subset of the array from start-end. limit and start can be combine to return a subset from start-limit

####DeleteConfig
delete /v1/config/:name will delete a single config
####UpdateConfig
put /v1/config/:name will update a single config
