import Image from "next/image";

export default function Home() {
  return (
    <div className="text-2xl font-bold underline">
      <input type="text" placeholder="Search" className="border"/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Poll</button>
    </div>
  );
}
