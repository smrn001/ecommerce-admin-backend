import React from "react";

const App = () => {
  const routes = [
    { name: "Categories", path: "/api/v1/categories" },
    { name: "Products", path: "/api/v1/products" },
    { name: "Users", path: "/api/v1/users" },
    { name: "Orders", path: "/api/v1/orders" },
    { name: "Banners", path: "/api/v1/banners" },
    { name: "Brands", path: "/api/v1/brands" },
    { name: "Collections", path: "/api/v1/collections" },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <main className="flex-grow p-4">
          <p className="text-gray-700 mb-4">
            Admin Panel will be made after backend is ready.
          </p>
          <p className="text-gray-700 mb-2">
            After running the backend server, you can access the following
            routes:
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            {routes.map((route) => (
              <li key={route.path}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://localhost:3000${route.path}`}
                  className="text-blue-500 hover:underline"
                >
                  {route.name}
                </a>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
};

export default App;
