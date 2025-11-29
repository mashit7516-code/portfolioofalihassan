import connectDB from "@/lib/mongodb";
import user from "@/models/user";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, content } = body;

    await connectDB();

    if (!name || !email || !content) {
      return new Response(
        JSON.stringify({ message: "A field is missing!", success: false }),
        { status: 400 }
      );
    }
const new_user_message = {
      name,
      email,
      content,
    }
    await user.create(new_user_message);

    return new Response(
      JSON.stringify({ message: "Message Added Successfully!", success: true }),
      { status: 201 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error!", success: false }),
      { status: 500 }
    );
  }
}
