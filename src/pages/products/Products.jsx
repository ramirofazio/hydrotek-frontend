import { Pagination } from "../../components/Pagination.jsx";


export default function Products() {
  
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
