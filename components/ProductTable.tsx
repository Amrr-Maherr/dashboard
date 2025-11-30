export default function ProductTable() {
  const products = [
    { id: 1, name: "Product 1", stock: 12, price: "$20" },
    { id: 2, name: "Product 2", stock: 5, price: "$15" },
    { id: 3, name: "Product 3", stock: 0, price: "$30" },
  ];

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2">ID</th>
          <th className="border-b p-2">Name</th>
          <th className="border-b p-2">Stock</th>
          <th className="border-b p-2">Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="p-2">{p.id}</td>
            <td className="p-2">{p.name}</td>
            <td className="p-2">{p.stock}</td>
            <td className="p-2">{p.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
