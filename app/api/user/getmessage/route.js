import connectDB from "@/lib/mongodb";
import user from "@/models/user";

export async function GET() {
    try {

        await connectDB();
        const user_message = await user.find({})
        if (!user_message) {
            return new Response(
                JSON.stringify({ message: "No Message Found!", success: false }, { status: 404 })
            )
        } else {
            return new Response(
                JSON.stringify({ message: "Messages Found!", data: user_message, success: true }), { status: 200 }
            )

        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "An Internal Server Error Occured!", success: false }),
            { status: 500 }
        )
    }


}