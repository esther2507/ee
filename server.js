const {Teacher} = require('./models/readingModel'); 
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB=require("./config/dbConn")
const corsOptions = require("./config/corsOptions")

const app = express()
const PORT = process.env.PORT || 7000

connectDB()
app.use(cors(corsOptions))
app.use(express.static("public"))
app.use(express.json())
const authRoutes = require("./routes/authRoutes")
const AiReportRoutes = require("./routes/AiReportRoutes")
const BoardRoutes = require("./routes/BoardRoutes")
const readingRoutes = require("./routes/readingRoutes")
const StudentRoutes = require("./routes/StudentRoutes")
const TeacherRoutes = require("./routes/TeacherRoutes")
const ItemResultRoutes = require("./routes/ItemResultRoutes")
const SessionRoutes = require("./routes/SessionRoutes")
const AdminReportRoutes = require("./routes/AdminReportRoutes")

app.use("/api/auth", authRoutes)
app.use("/api/AiReportRoutes", AiReportRoutes)
app.use("/api/BoardRoutes", BoardRoutes)
app.use("/api/readingRoutes", readingRoutes)
app.use("/api/StudentRoutes", StudentRoutes)
app.use("/api/TeacherRoutes", TeacherRoutes)
app.use("/api/ItemResultRoutes", ItemResultRoutes)
app.use("/api/SessionRoutes", SessionRoutes)
app.use("/api/admin/reports", AdminReportRoutes)

app.get("/", (req, res) => {
   res.send("This is home page")
})


mongoose.connection.once('open', async () => {
    const existingTeacher = await Teacher.findOne({ username: process.env.SEED_TEACHER_USERNAME });
        if (!existingTeacher) {
            const hashedPassword = await bcrypt.hash(process.env.SEED_TEACHER_PASSWORD, 10);
            await Teacher.create({
                Teachername: process.env.SEED_TEACHER_USERNAME,
                username: process.env.SEED_TEACHER_USERNAME,
                password: hashedPassword,
                role: 'admin' 
            });
            console.log('Default admin user seeded successfully in Atlas!');
        }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on('error', err => {
    console.log(err)
})


