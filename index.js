import express from "express";
import mongoose from "mongoose";
import teacherRoutes from "./routes/teacher.routes.js";
import courseRoutes from "./routes/course.routes.js";
import studentRoutes from "./routes/student.routes.js";

const app = express();
const PORT = 3000;

const connectionString =
  "mongodb+srv://mongouser:lmkZYlCuRMIl60lC@cluster0.6zphv.mongodb.net/test-lesson?retryWrites=true&w=majority&appName=Cluster0";

async function connectDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log("Подключено к базе данных!");
  } catch (error) {
    console.log("Error!");
  }
}

app.use(express.json());
app.use("/teacher", teacherRoutes);
app.use("/course", courseRoutes);
app.use("/student", studentRoutes);

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
