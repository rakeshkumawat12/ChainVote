import Card from "@/components/Card";

export default function PollDetail() {
  return (
    <div className="text-2xl font-bold underline">
      <div className="flex flex-col">
      <div>poll title</div>
      <div>active</div>
      </div>

      <div>Ends in 3h 20m</div>

      <div>
        <span>candidate</span>
        <button>Vote</button>
      </div>
      <div>
        <span>candidate</span>
        <button>Vote</button>
      </div>
      <div>
        <span>candidate</span>
        <button>Vote</button>
      </div>
      <div>
        <span>candidate</span>
        <button>Vote</button>
      </div>

      <div>You already have voted!</div>


<button className="bg-blue-500 text-white px-4 py-2 rounded">Winner name</button>
    </div>
  );
}