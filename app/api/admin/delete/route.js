import connectDB from "@/lib/mongodb";
import projects from "@/models/projects";
export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = body;
    await projects.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Project Deleted", success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } 
}