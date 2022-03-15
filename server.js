const express = require("express");
const path = require("path"); // utilities for working with file and directory paths

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); //parsing and posting
app.use(express.json());

//array of objects
const characters = [
  {
    routeName: "blackwidow",
    name: "BlackWidow",
    age: 30,
  },
  {
    routeName: "hulk",
    name: "Hulk",
    age: 35,
  },
];

// Routes
//get

app.get("/", (req, res) => res.json({ name: "Avengers Day" })); // default endpoint

app.get("/add", (req, res) => res.sendFile(path.join(__dirname, "add.html"))); //another method to add an html file

app.get("/characters", (req, res) => res.json(characters));

app.get("/characters/:character", (req, res) => {
  const chosen = req.params.character;

  console.log(chosen);

  for (let i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// /////////////////////////////// create post method /////////////////////////////////////////
app.post("/characters", (req, res) => {
  const newCharacter = req.body;
  newCharacter.routeName = newCharacter.name.toLowerCase();
  console.log(newCharacter);
  characters.push(newCharacter);
  res.json(newCharacter);
});

app.listen(PORT, () => console.log(`App listening on PORT 3000`));
