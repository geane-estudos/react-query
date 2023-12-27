import { useState } from "react";
import "./App.css";

function App() {
  const [cep, setCep] = useState("");
  const [response, setResponse] = useState()

  function handleChange(event:any) {
    setCep(event.target.value);
  }

 async function handleSubmit(event:any) {
    event.preventDefault();
      const fetchDados = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      return fetchDados.json()
      .then((data) => setResponse(data));
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="BuscarCEP">
        <input type="text" value={cep} onChange={handleChange} required maxLength={8} minLength={8} placeholder="00000000"/>
      </label>
      <button>Buscar CEP</button>
      <p className="response">{JSON.stringify(response)}</p>
    </form>
  );
}

export default App;
