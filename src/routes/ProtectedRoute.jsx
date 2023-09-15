import Root from "src/pages/Root";
import DefaultError from "src/pages/error/Default";

export function ProtectedRoute({ token }) {
  if (!token) {
    return <DefaultError />;
  }

  return (
    <>
      <Root />
    </>
  );
}
