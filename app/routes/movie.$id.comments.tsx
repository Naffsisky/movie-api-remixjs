import { Form, useParams, useLoaderData, useNavigation } from "@remix-run/react";
import { LoaderFunction, ActionFunctionArgs, json } from "@remix-run/node";
import { db } from "~/utils/db.server";

interface Comment {
  id: number;
  message: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const data = await db.comment.findMany({
    where: {
      movieId: params.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return json({ data });
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const message = formData.get("comment");
  const movieId = formData.get("id");

  if (typeof message !== "string" || typeof movieId !== "string") {
    throw new Error("Invalid form data");
  }

  const data = await db.comment.create({
    data: {
      message: message,
      movieId: movieId,
    },
  });

  return json({ data });
}

export default function Comments() {
  const { id } = useParams();
  const { data } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  return (
    <div className="rounded-lg border p-3">
      <h1 className="text-xl font-semibold mb-5">Comments</h1>

      <div>
        <Form method="POST">
          <textarea name="comment" className="w-full border border-teal-500 rounded-lg p-2"></textarea>
          <input type="hidden" name="id" value={id} />

          {navigation.state === "submitting" ? (
            <button type="button" 
            disabled className="bg-teal-500 px-4 py-2 rounded-lg text-white">
              Loading...
            </button>
          ) : (
            <button type="submit" className="bg-teal-500 px-4 py-2 rounded-lg text-white">
              Add Comment
            </button>
          )}
        </Form>

        <div className="mt-5 flex flex-col gap-y-3">
          {data.map((post: Comment) => (
            <div key={post.id}>
              <p>{post.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
