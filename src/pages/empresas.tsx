import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const router = useRouter();

  const empresaDetails = (id: number) => {
    router.push(`/empresa/detalhes/${id}`);
  };

  const deleteEmpresa = async (id: number) => {
    const confirmation = await Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação não pode ser revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, deletar!",
    });

    if (confirmation.isConfirmed) {
      try {
        const request = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/empresas/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!request.ok) {
          throw new Error("Erro ao deletar empresa");
        }

        await Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Empresa deletada com sucesso!",
        });

        const updatedEmpresas = empresas.filter((empresa) => empresa.id !== id);
        setEmpresas(updatedEmpresas);
      } catch (error) {
        console.error("Erro ao deletar empresa:", error);
        await Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Ocorreu um erro ao deletar a empresa.",
        });
      }
    }
  };

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/empresas`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch empresas");
        }
        const data = await response.json();
        setEmpresas(data);
      } catch (error) {
        console.error("Error fetching empresas:", error);
      }
    };

    fetchEmpresas();
  }, []);

  return (
    <>
      <div className="flex flex-col p-8">
        <h1 className="text-2xl font-bold mb-6">Empresas Cadastradas</h1>
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Nome
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      CNPJ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {empresas.map((empresa, index) => (
                    <tr key={index}>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 underline hover:cursor-pointer font-medium"
                        onClick={() => empresaDetails(empresa.id)}
                      >
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {empresa.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {empresa.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {empresa.cnpj}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                        <button
                          type="button"
                          onClick={() => deleteEmpresa(empresa.id)}
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
