# Friendly Fridge
Friendly Fridge is a web application that allows users to create a virtual fridge. The user can add food to their virtual fridge along with an expiration date. Depending on how close the food item is to the expiration date, the food item will change to different colors.
# Getting Started
When the user first loads the page, he or she is met with 2 options, login or create new user. When the user creates a new user, the information is sent to mongoDB, allowing them to sign in in future sessions.
After logging in the user is sent to the add item page. At this page, the user can enter the food item and an expiration date. The user can enter as many items as they please. After they are finished entering food items, the user can view their virtual fridge by clicking on the MyFridge page.
On the MyFridge page, the user will see all the food items they entered. With the help of Google API Image Search, the food they intered will be displayed as an image. Also, depending on the distance to the expiration date, the food item will have a green, orange, or red border surrounding the food item.
If the food item is expired or the user is no longer interested in the food, the user has the option to delete the food item. The delete food item removes it from the webpage as well as the database.
# Technologies Used
* MongoDB
* Express
* React
* Node
* JavaScript
* HTML
* CSS
* Passport
* Unsplash API
* Mongoose
* bCrypt
* axios
* Bootstrap
* MomentJS

# Authors
Bob McDonough
Danit Lentz
CJ Brown
Lucas Foulkes
Ying Huang
Josh Ellsworth