import React, { useEffect, useState } from "react";

export default function CadastrarPage() {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [empresasObtidas, setEmpresasObtidas] = useState(false);
  const [nomeSocio, setNomeSocio] = useState("");
  const [emailSocio, setEmailSocio] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [cpf, setCPF] = useState("");

  const handleCPFChange = (event: any) => {
    let { value } = event.target;
    value = value.replace(/\D/g,"")                   
    value = value.replace(/(\d{3})(\d)/,"$1.$2")      
    value = value.replace(/(\d{3})(\d)/,"$1.$2")       
    value = value.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    setCPF(value);
  };

  const getEmpresas = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas`, {
      method: "GET"
    });
    const data = await response.json();
    setEmpresas(data);
    setEmpresasObtidas(true);
  };

  const cadastrar = async () => {
    try {
      const formData = new FormData();
      formData.append("name", nomeSocio);
      formData.append("email", emailSocio);
      formData.append("cpf", cpf);
      formData.append("empresa_id", empresaId);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/socios`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar empresa");
      }

      console.log("Empresa cadastrada com sucesso!");
    } catch (error) {
      console.error('Erro ao cadastrar empresa');
    }
  };

  useEffect(() => {
    if (!empresasObtidas) {
      getEmpresas();
    }
  }, [empresasObtidas]);

  return (
    <div className="p-4">
      <div className="text-4xl py-7 font-semibold text-center md:text-left">
        Cadastrar Sócio
      </div>
      <div>
        <input
          type="text"
          value={nomeSocio}
          onChange={(e) => setNomeSocio(e.target.value)}
          className="py-2 px-3 pe-11 block w-full border border-gray-400 shadow-lg text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Nome do Sócio"
        />
      </div>
      <div className="mt-6">
        <input
          type="text"
          value={emailSocio}
          onChange={(e) => setEmailSocio(e.target.value)}
          className="py-2 px-3 pe-11 block w-full border border-gray-400 shadow-lg text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Email do Sócio"
        />
      </div>
      <div className="mt-6">
        <input
          type="text"
          value={cpf}
          onChange={handleCPFChange}
          maxLength={18}
          className="py-2 px-3 pe-11 block w-full border border-gray-400 shadow-lg text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="CPF do Sócio"
        />
      </div>
      <div className="mt-6">
        <div className="relative">
          <select
            onChange={(e) => setEmpresaId(e.target.value)}
            className="peer p-4 pe-9 block w-full border border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
            focus:pt-6
            focus:pb-2
            [&:not(:placeholder-shown)]:pt-6
            [&:not(:placeholder-shown)]:pb-2
            autofill:pt-6
            autofill:pb-2"
          >
            <option selected>Selecione a empresa</option>
            {empresas.map(empresa => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.name}
              </option>
            ))}
          </select>
          <label
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500"
          >
            Empresa
          </label>
        </div>
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
