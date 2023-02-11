import mongoose from "mongoose";

const connectDatabse = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`database is connected on ${process.env.DB}`)
    } catch (error) {
        console.log("database error=>>>>>>>>>>>>", error);
    }
}
export default connectDatabse