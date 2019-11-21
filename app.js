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

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//creating our list item schema
const itemsSchema = {
  name: String
};

//building the mongoose model for future list items
const Item = mongoose.model("Item", itemsSchema);


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



app.get("/", function (req, res) {
  //parsing through the Item model and finding the post items
  Item.find({}, function (err, foundItems) {

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


  app.post("/", function (req, res) {

    const item = req.body.newItem;

    if (req.body.list === "Work") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
  });


  app.get("/work", function (req, res) {
    res.render("list", {
      listTitle: "Work List",
      newListItems: workItems
    });
  });

  app.get("/about", function (req, res) {
    res.render("about");
  });

});
app.listen(5500, function () {
  console.log("Server has started on Port 5500");
});