import { useLoaderData } from "react-router-dom";

export function PostDetail() {
  const post = useLoaderData() 

  return (
    <div>
      <h1>soy el detail</h1>
    </div>
  )
}