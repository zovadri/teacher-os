"use client"

export default function Content({ id }: { id: string }) {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">Course Details</h1>
      <p className="text-text-secondary mt-2">Course ID: {id}</p>
    </div>
  )
}
