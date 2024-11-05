import { useEffect, useState } from "react";

type TData = {
  id: number;
  name: string;
  gender: number;
  hobby: string;
  age: number;
};

export default function App() {
  const [data, setData] = useState<TData[]>([]);
  const [buttonStatus, setButtonStatus] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5148/api");
      const result: TData[] = await response.json();
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="px-8 py-4 bg-zinc-200 min-h-screen">
      <h1 className="font-bold text-zinc-900 text-3xl">📃List of data</h1>
      <p className="text-zinc-600 w-1/2 leading-tight mt-2">
        Click Generate to generate data, Submit to submit data into the database
        and reset to delete the data both frontend and database
      </p>
      <div className="flex items-center gap-4 mt-4">
        <button
          className="px-3 py-1 rounded min-w-24 bg-sky-600 hover:bg-sky-700 transition-all text-zinc-100 disabled:bg-opacity-85 disabled:cursor-not-allowed disabled:hover:bg-sky-600/85"
          disabled={!buttonStatus}
          // onClick={() => fetchData()}
        >
         🔃 Generate
        </button>
        <button
          className="px-3 py-1 rounded min-w-24 bg-green-600 hover:bg-green-700 transition-all text-zinc-100 disabled:bg-opacity-85 disabled:cursor-not-allowed disabled:hover:bg-green-600/85"
          disabled={buttonStatus}
          // onClick={() => fetchData()}
        >
         ✔ Submit
        </button>
        <button
          className="px-3 py-1 rounded min-w-24 bg-red-600 hover:bg-red-700 transition-all text-zinc-100 disabled:bg-opacity-85 disabled:cursor-not-allowed disabled:hover:bg-red-600/85"
          disabled={buttonStatus}
          // onClick={() => fetchData()}
        >
         ❌ Reset
        </button>
      </div>
      {/* {data.length > 0 ? JSON.stringify(data) : ""} */}
    </div>
  );
}
