import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function DetalhesPage() {
  const [socios, setSocios] = useState<ISocio[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchSocios = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresas/${id}/socios`);
        if (!response.ok) {
          throw new Error("Failed to fetch socios");
        }
        const data = await response.json();
        setSocios(data);
      } catch (error) {
        console.error("Error fetching socios:", error);
      }
    };

    if (id) {
      fetchSocios();
    }
  }, [id]);

  return (
    <>
      <div className="flex flex-col p-8">
        <h1 className="text-2xl font-bold mb-6">Sócios Cadastrados</h1>
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-400">
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
                      CPF
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Empresa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-400">
                  {socios.map((socio, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {socio.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {socio.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {socio.cpf}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {socio.empresa.name}
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
