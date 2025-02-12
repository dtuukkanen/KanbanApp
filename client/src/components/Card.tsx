export default function Card(props: any) {
    return (
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="px-4 py-5 sm:px-6">
          {props.title}
        </div>
        <div className="px-4 py-5 sm:p-6">{props.description}</div>
      </div>
    )
  }
