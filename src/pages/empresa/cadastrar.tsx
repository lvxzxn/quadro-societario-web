import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function CadastrarPage() {
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [emailEmpresa, setEmailEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');

  const handleCnpjChange = (event: any) => {
    let { value } = event.target;
    value = value.replace(/\D/g,""); 
    value = value.replace(/^(\d{2})(\d)/,"$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3"); 
    value = value.replace(/\.(\d{3})(\d)/,".$1/$2"); 
    value = value.replace(/(\d{4})(\d)/,"$1-$2"); 
    setCnpj(value);
  };

  const cadastrar = async () => {
    try {
      const formData = new FormData();
      formData.append('name', nomeEmpresa);
      formData.append('email', emailEmpresa);
      formData.append('cnpj', cnpj);

      const response = await fetch(`http://127.0.0.1:8000/api/empresas`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Erro ao cadastrar empresa');
      }

      await Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Empresa cadastrada com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao cadastrar empresa:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Ocorreu um erro ao cadastrar a empresa.'
      });
    }
  }; 

  return (
    <div className="p-4">
      <div className="text-4xl py-7 font-semibold text-center md:text-left">
        Cadastrar Empresa
      </div>
      <div>
        <input 
          type="text"
          value={nomeEmpresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
          className="py-2 px-3 pe-11 block w-full border border-gray-400 shadow-lg text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
          placeholder="Nome da Empresa"
        />
      </div>
      <div className="mt-6">
        <input 
          type="text"
          value={emailEmpresa}
          onChange={(e) => setEmailEmpresa(e.target.value)}
          className="py-2 px-3 pe-11 block w-full border border-gray-400 shadow-lg text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
          placeholder="E-Mail da Empresa"
        />
      </div>
      <div className="mt-6">
        <input 
          type="text"
          value={cnpj}
          onChange={handleCnpjChange}
          maxLength={18}
          className="py-2 px-3 pe-11 block w-full border border-gray-400 shadow-lg text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
          placeholder="CNPJ da Empresa"
        />
      </div>
      <div className="mt-4">
        <button 
          type="button" 
          onClick={cadastrar}
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}
