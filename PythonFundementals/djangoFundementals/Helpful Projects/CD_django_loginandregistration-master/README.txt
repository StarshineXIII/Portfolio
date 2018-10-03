Assignment: Login and Registration
Many websites have login and registration components.

Django makes this easy for us with its prebuilt auth model (sort of), but this is still a topic that we’re going to postpone; the auth model is easy to use out of the box but a bit more challenging to modify for our own ends. So we’re going to make our own for now.

We’ve learned how to integrate models, validations, and controllers to our projects. Our next goal is to create a fully functional login and registration app! This will combine your knowledge of MVC patterns, validations, and password encryption.

One thing we've noticed as people build their login and registrations: 

User.userManager.get(email = email) <-- if there is not a matching email for a get Django throws an error (try and except could come in handy), otherwise it returns the User object associated with the matching user. e.g. Userobject.

User.userManager.filter(email = email) <-- filter on the other hand returns a list, so if there is no user that matches, it returns an empty list.  If there is a single matching user the list will contain a single User object: e.g. [Userobject].
Build the following:
Show validation error messages if validations fail the following tests
First Name - Required; No fewer than 2 characters; letters only
Last Name - Required; No fewer than 2 characters; letters only
Email - Required; Valid Format
Password - Required; No fewer than 8 characters in length; matches Password Confirmation
Use Bcrypt to encrypt your users’ passwords

FELISA'S NOTE: 
The screenshots folder is non-standard and is attached to provide a quick view of the templates. These have no bearing on the functionality of the project.
