import connectDB from "@/lib/mongodb";
import Project from "@/models/projects";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, imageURL, projectURL } = body;

    // Check required fields
    if (!title || !description || !imageURL || !projectURL) {
      return new Response(
        JSON.stringify({ message: "Field is Missing", success: false }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if project already exists
    const existing_project = await Project.findOne({ title });

    if (existing_project) {
      return new Response(
        JSON.stringify({ message: "Already Exists", success: false }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create new project
    await Project.create({
      title,
      description,
      imageURL,
      projectURL,
    });

    return new Response(
      JSON.stringify({ message: "Project Added", success: true }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error", success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
