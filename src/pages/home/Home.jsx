import { Pagination } from "../../components/Pagination";


export function Home() {
  
  return (
    <div className="container">
      <Pagination
        nButtons={5}
        currentPage={2}
        setPage={(p) => console.log(p)}
      />
      <h1>Hola soy el Home!</h1>
    </div>
  );
}
