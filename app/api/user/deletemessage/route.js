import connectDB from "@/lib/mongodb";
import user from "@/models/user";
export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = body;
    await user.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Message Deleted", success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } 
}