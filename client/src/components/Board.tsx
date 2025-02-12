import Column from "./Column"

const columns: any = [
    { id: 1},
    { id: 2},
    { id: 3}
]

export default function Board() {
    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex space-x-4">
            {columns.map(() => (
                <Column />
            ))}
        </div>
    )
  }
  