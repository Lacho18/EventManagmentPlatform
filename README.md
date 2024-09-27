# Title

Event management system

# Tech stack

## React, React router, React Redux, Axios, React icons, Web socket

# Description

This is front-end part of web application presenting system for managing events. It visualize events inserted in the system, gives description about them and images. Also gives communicational resources to the organizer of the event. In fact the application has a real time chat application, where all users can write messages to each other. The idea is if questions about the event appears, organizer can easily be asked. Also with problems with the side, it is easily there to communicate with administrator.
The application has 3 roles for the users

1. Participant - can buy tickets for events and use the chat app
2. Organizer - can create events, modify the created by him events and delete them
3. Administrator - can update and delete every event, can create new color themes and ban users
   The side supports color themes, which allows the user to choose in limited amount of colors what the side will be.

# Routes in the side

| Route            | Component     | Description                                                                                                                                   |
| ---------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| /                | Home          | The main view of the side. Shows the events on different pages, filter buttons, button to log in or sign out and window for users side menus. |
| /login           | LogIn         | Shows the log in page.                                                                                                                        |
| /signUp          | SignUp        | Shows the sign up page.                                                                                                                       |
| /updateUser      | UpdateUser    | Page in which user can modify modifiable data of his profile.                                                                                 |
| /updateEvent/:id | UpdateEvent   | Page that updates specific event.                                                                                                             |
| /chat            | ChatAppPage   | Visualize the chat application, with previous users that the user has had chat with on the left and filtered users of the side on the right   |
| /newEvent        | EventCreation | Page in which organizers create events.                                                                                                       |
| /admin           | AdminLayout   | Visualize the admin page from where theme color can be created, and users can be banned.                                                      |
| /\*              | PageNotFound  | Route that appears every time a non existing route is trying to be accessed.                                                                  |
