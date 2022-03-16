import "./App.css";
import { useState } from "react";
import { CChart } from "@coreui/react-chartjs";

function App() {
  const [data, setData] = useState({});
  const [conteo, setConteo] = useState(0);

  const query = async () => {
    try {
      let endpoint = "https://cme-server-back.duckdns.org/top_productos";
      let params = { method: "GET" };

      const res = await fetch(endpoint, params);

      const result = await res.json();

      const etiquetas = [];
      const cantidades = [];

      for (let item of result) {
        etiquetas.push(item.producto);
        cantidades.push(item.cantidad);
      }

      const pre = {
        labels: etiquetas,
        datasets: [
          {
            label: "",
            data: cantidades,
            backgroundColor: [
              "#03a9f4",
              "#d32f2f",
              "#00897b",
              "#ffb300",
              "#afb42b",
            ],
          },
        ],
      };
      setData(pre);
      setConteo(conteo + 1);
    } catch (error) {
      console.log(`Esto es un error: ${error}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <h2>Colegio Técnico Maria Elvinia</h2>
          Esta es una prueba de React
        </p>

        <a
          className="App-link"
          href="https://mariaelvinia.edu.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar página web
        </a>
        <div className="main">
          <button type="button" onClick={query}>
            Consultar
          </button>
          <h5>Informe de ventas por productos</h5>
          <div className="">
            <div className={conteo > 0 ? "grafica" : ""}>
              {conteo > 0 ? <CChart type="bar" data={data} /> : ""}
            </div>
            <div className={conteo > 0 ? "grafica" : ""}>
              {conteo > 0 ? <CChart type="pie" data={data} /> : ""}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
