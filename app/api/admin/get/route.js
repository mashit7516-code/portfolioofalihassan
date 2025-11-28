import connectDB from "@/lib/mongodb";
import projects from "@/models/projects";

export async function GET() {
  try {
    await connectDB();  
    const projectdata = await projects.find({});

    return new Response(
      JSON.stringify({ message: "Projects Retrieved", success: true, data: projectdata }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log("Error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } 
}
