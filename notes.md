## Some notes about the implementation of DDD + Clean Architecture.  
  
At the begining of the project the time taken to structure is way more than a MVC or 
Layers architecture. However, as the project evolves it gets faster and faster to 
build up applications and features.  
The abstractions for repository, and separation of concerns make things clean and fast.  
  
To set the callback of the better-auth signing in with Google you should go:  
https://console.cloud.google.com/  
Set the OAuth2 provider in:  
API&SERVICES -> Credentials -> OAuth 2.0 Client ID -> create a new one or edit the one.  
The next steps is to follow the better-auth documentation tutorial.  
