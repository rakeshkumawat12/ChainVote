export default function CreatePoll() {
  return (
    <div className="text-2xl font-bold underline">
      <input type="text" placeholder="title" className="border" />

      <div className="flex flex-col">
        <label htmlFor="option1">Option 1</label>
        <input type="text" id="option1" className="border" />
        <label htmlFor="option2">Option 2</label>
        <input type="text" id="option2" className="border" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="startDate">start Date</label>
        <input type="date" id="startDate" className="border" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" className="border" />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        deploy
      </button>
    </div>
  );
}
