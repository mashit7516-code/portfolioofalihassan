import connectDB from "@/lib/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import admin from "@/models/admin";

export async function POST(req) {
  try {
    const body = await req.json();
    const { adminname, password } = body;

    await connectDB();

    const admindetail = await admin.findOne({ adminname });
    console.log(admindetail)
    if (!admindetail) {
      return new Response(
        JSON.stringify({ message: "User Name is Wrong!", success: false }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, admindetail.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Password is Wrong!", success: false }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = jwt.sign(
      { id: admindetail._id, adminname: admindetail.adminname },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({ message: "Login Successful", success: true }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Error during admin login:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
