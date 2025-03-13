import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

const PORT = 8000;
const connectionString = "mongodb://127.0.0.1:27017";
const client = new MongoClient(connectionString);

app.use(express.json());
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("lesson");
    console.log("БД подключена успешно");
  } catch (error) {
    console.log("Не удалось поодключиться к БД");
  }
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/employees", async (req, res) => {
  try {
    const collection = db.collection("users");
    const users = await collection.find().toArray();
    res.json(users);
  } catch (error) {
    console.log("Не удалось подключиться к базе данных!");
  }
});

app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = db.collection("users");
    const users = await collection.findOne({
      _id: new ObjectId(id),
    });
    res.json(users);
  } catch (error) {
    console.log("Не удалось подключиться к базе данных!");
  }
});

app.post("/employees", async (req, res) => {
  try {
    const { name, city, age } = req.body;

    if (!name || !city || !age) {
      return res.status(400).json({ error: "Заполните все поля!" });
    }

    const collection = db.collection("users");

    const user = await collection.insertOne({ name, city, age });
    res.json({ message: "Новый работник успешно создан", user });
  } catch (error) {
    console.log("Не удалось подключиться к базе данных!");
  }
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
