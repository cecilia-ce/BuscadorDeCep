import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import api from './Services/api'
import './App.css'

export default function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  // 58075130/json
  async function handleSearch() {
    if (input === '') {
      alert("Digite algum CEP!")
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    } catch {
      alert("Ops! Erro ao buscar o cep informado")
      setInput("")
    }


  }

  return (
    <div className="container">
      <h1 className="Title">Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="btnSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  )
}
