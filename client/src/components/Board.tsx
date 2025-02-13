import Column from "./Column"

const columns: any = [
  { id: 1},
  { id: 2},
  { id: 3}
]

const Board = () => {
  return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-center space-x-4">
          {columns.map(() => (
              <Column />
          ))}
      </div>
  )
}

export default Board
