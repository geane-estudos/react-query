import { useState, memo, useCallback } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [cep, setCep] = useState("");
  const [response, setResponse] = useState();

  function handleChange(event) {
    setCep(event.target.value);
  }

  const handleSubmit = useCallback(async function (event) {
    event.preventDefault();
    const fetchDados = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    return fetchDados.json().then((data) => {
      if (data.erro) {
        console.log("Cep inexistente");
      }
      setResponse(data);
    });
  }, [cep]);

  const { isError, isFetched, isSuccess } = useQuery({queryKey: ["cep"], queryFn: handleSubmit});

  console.log(response);
  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="BuscarCEP">
        <input
          type="text"
          value={cep}
          onChange={handleChange}
          required
          maxLength={8}
          minLength={8}
          placeholder="00000000"
        />
      </label>
      <button>Buscar CEP</button>
      <p>A busca foi realizada? {isFetched ? "Sim" : "Não"}</p>
      <p> A busca foi bem sucedida? {isSuccess ? "Sim" : "Não"}</p>
      <p> A consulta encontrou um erro? {isError ? "Não" : "Sim"}</p>
      <p className="response">
        <strong>Dados da busca: </strong>
        {JSON.stringify(response)}
      </p>
    </form>
  );
}

export default memo(App);