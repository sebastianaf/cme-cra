import './App.css';
import { CChart } from '@coreui/react-chartjs'
import { useState } from 'react';

function App() {

  const [data, setData] = useState({})
  const [conteo, setConteo] = useState(0)

  const query = async () => {
    try {
      const res = await fetch(
        'https://cme-server-back.duckdns.org/top_productos',
        { method: 'GET' })
      const result = await res.json()
      
      const etiquetas = []
      const cantidades = []

      for (let item of result) {
        etiquetas.push(item.producto)
        cantidades.push(item.cantidad)
      }

      const pre = {
        labels: etiquetas,
        datasets: [
          {
            label: '',
            data: cantidades,
            backgroundColor: ['#03a9f4', '#d32f2f', '#00897b', '#ffb300', '#afb42b']
          }
        ]
      }
      setData(pre)
      setConteo(conteo + 1)
    } catch (error) {
      console.log(`Esto es un error: ${error}`)
    }
  }

  const handleSubmit = () => {
    query()

  }

  return (
    <div className="main">
      <h1>Colegio Técnico María Elvinia</h1>
      <h2>Programación grado 11º</h2>
      <h3>React con Chart.js</h3>

      <button type="button" onClick={handleSubmit}>Consultar</button>
      <h2>Informe de ventas por productos</h2>
      <div className={conteo > 0 ? "grafica" : ""}>
        {conteo > 0 ? <CChart type='bar' data={data}  /> : ''}
      </div>
      <div className={conteo > 0 ? "grafica" : ""}>
        {conteo > 0 ? <CChart type='pie' data={data} /> : ''}
      </div>
    </div>
  );
}

export default App;
