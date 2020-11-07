//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const app = express();



//const items = [];
//const workItems = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//MongoDB hosted locally for testing purposes.
mongoose.connect("mongodb+srv://admin-Jeff:breanna1@todolistapp-igj0k.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//creating our list item schema
const itemsSchema = {
  name: String
};

//building the mongoose model for future list items
const Item = mongoose.model("Item", itemsSchema);

// list of default items meant ot be a tutorial for the list app
const item1 = new Item({
  name: "Welcome to your To-Do List"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<---Hit this button to delete an item."
});

//array to load on initial start up if the list is completely empty upon loading
const defaultItems = [item1, item2, item3];

//The Home route for the app
app.get("/", function (req, res) {
  //parsing through the Item model and finding the post items
  Item.find({}, function (err, foundItems) {
    //determining if the list has no items and if so, displaying the default list items...may delete later
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully Added Entries to DB")
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      });
    }
  });
  //posting newly created items to the list and refreshing the home route automatically to show new list with new item
  app.post("/", function (req, res) {

    const itemName = req.body.newItem;

    const item = new Item({
      name: itemName
    });

    item.save();

    res.redirect("/");
  });
  //deleting marked items completed and redirecting to the home route to show that the item has been removed from the list
  app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;

    Item.findByIdAndDelete(checkedItemId, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  });




  //route for the about page of the application
  app.get("/about", function (req, res) {
    res.render("about");
  });

});

let port = process.env.PORT;
if(port == null || port == ""){
  port=5000;
}
app.listen(port, function(){
  console.log("Server has started successfully");
});

//local host running on your machine for testing
// app.listen(5500, function () {
//   console.log("Server has started on Port 5500");
// });