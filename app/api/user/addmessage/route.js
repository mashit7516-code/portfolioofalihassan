import connectDB from "@/lib/mongodb";
import user from "@/models/user";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, content } = body;

    await connectDB();
    console.log("Sachema Keys:",Object.keys(user.schema.paths))

    if (!name || !email || !content) {
      return new Response(
        JSON.stringify({ message: "A field is missing!", success: false }),
        { status: 400 }
      );
    }
console.log(content)
const new_user_message = {
      name,
      email,
      content,
    }
    console.log(new_user_message)
    await user.create(new_user_message);

    return new Response(
      JSON.stringify({ message: "Message Added Successfully!", success: true }),
      { status: 201 }
    );

  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({ message: "Internal Server Error!", success: false }),
      { status: 500 }
    );
  }
}
