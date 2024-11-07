import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

type TGenderHobby = {
  id: number;
  name: string;
};

type TResponse = {
  id: number;
  name: string;
  genderId: number;
  hobbyId: number;
  age: number;
  gender: TGenderHobby;
  hobby: TGenderHobby;
};

type TPayload = {
  id: number;
  name: string;
  genderId: number;
  genderName: string;
  hobbyName: string;
  age: number;
};

type TRequest = {
  name: string;
  age: number;
  email: string;
  payload: TPayload[];
};

const genders = ["Pria", "Wanita"];

const hobbies = [
  "Sepak Bola",
  "Badminton",
  "Tennis",
  "Renang",
  "Bersepeda",
  "Tidur",
];

const generateRandomName = (length: number) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
    .toUpperCase();
};

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateData = (total: number) => {
  const result: TPayload[] = [];
  for (let i = 0; i < total; i++) {
    const gender = generateRandomNumber(0, 1);
    const newData: TPayload = {
      id: i + 1,
      name: generateRandomName(8),
      genderId: gender,
      genderName: genders[gender],
      hobbyName: hobbies[generateRandomNumber(0, 5)],
      age: generateRandomNumber(18, 40),
    };

    result.push(newData);
  }
  return result;
};

export default function App() {
  const [data, setData] = useState<TPayload[]>([]);
  const [generateStatus, setGenerateStatus] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(true);
  const [resetStatus, setResetStatus] = useState(true);

  const generate = (total: number) => {
    const result = generateData(total);
    setData(result);
    setGenerateStatus(true);
    setSubmitStatus(false);
    setResetStatus(false);

    toast.success("Data has been created");
  };

  const submit = async () => {
    const newData: TRequest = {
      name: "Fathur",
      age: 21,
      email: "raiyanfathur@gmail.com",
      payload: data,
    };

    setSubmitStatus(true);
    setGenerateStatus(true);
    setResetStatus(false);

    try {
      const response = await fetch("http://localhost:5148/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const result = await response.json();
      toast.success(result);
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  const reset = async () => {
    setData([]);
    setResetStatus(true);
    setSubmitStatus(true);
    setGenerateStatus(false);
    try {
      const response = await fetch("http://localhost:5148/api", {
        method: "DELETE",
      });
      const result = await response.json();
      toast.success(result);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5148/api");
      const result = await response.json();
      const newData: TPayload[] = result.map((data: TResponse) => {
        return {
          id: data.id,
          name: data.name,
          genderId: data.gender.id,
          genderName: data.gender.name,
          hobbyName: data.hobby.name,
          age: data.age,
        };
      });
      setData(newData);
      if (newData.length > 0) {
        setGenerateStatus(true);
        setSubmitStatus(true);
        setResetStatus(false);
        toast.success("Data has been fetched");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="px-8 py-4 bg-zinc-200 min-h-screen">
        <h1 className="font-bold text-zinc-900 text-3xl">📃List of data</h1>
        <p className="text-zinc-600 w-1/2 leading-tight mt-2">
          Click Generate to generate data, Submit to submit data into the
          database and reset to delete the data both frontend and database
        </p>
        <div className="flex items-center gap-4 my-4">
          <button
            className="px-3 py-1 rounded min-w-24 bg-sky-600 hover:bg-sky-700 transition-all text-zinc-100 disabled:bg-opacity-85 disabled:cursor-not-allowed disabled:hover:bg-sky-600/85"
            disabled={generateStatus}
            onClick={() => generate(1000)}
          >
            🔃 Generate
          </button>
          <button
            className="px-3 py-1 rounded min-w-24 bg-green-600 hover:bg-green-700 transition-all text-zinc-100 disabled:bg-opacity-85 disabled:cursor-not-allowed disabled:hover:bg-green-600/85"
            disabled={submitStatus}
            onClick={submit}
          >
            ✔ Submit
          </button>
          <button
            className="px-3 py-1 rounded min-w-24 bg-red-600 hover:bg-red-700 transition-all text-zinc-100 disabled:bg-opacity-85 disabled:cursor-not-allowed disabled:hover:bg-red-600/85"
            disabled={resetStatus}
            onClick={reset}
          >
            ❌ Reset
          </button>
        </div>
        <Table data={data} />
      </div>
      <Toaster />
    </>
  );
}

function Table({ data }: { data: TPayload[] }) {
  return (
    <div className="overflow-auto w-full">
      <table className="border w-full border-zinc-400 text-zinc-800">
        <thead>
          <tr className="bg-zinc-300">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Hobby</th>
            <th className="px-4 py-2">Age</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((data: TPayload) => (
              <tr key={data.id}>
                <td className="px-4 border border-zinc-400 py-2">{data.id}</td>
                <td className="px-4 border border-zinc-400 py-2">
                  {data.name}
                </td>
                <td className="px-4 border border-zinc-400 py-2">
                  {data.genderName}
                </td>
                <td className="px-4 border border-zinc-400 py-2">
                  {data.hobbyName}
                </td>
                <td className="px-4 border border-zinc-400 py-2">{data.age}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="p-8 border border-zinc-400 text-center font-semibold"
              >
                Data not found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
