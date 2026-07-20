import { mockStudents } from "@/lib/mock/data"
import Content from "./Content"

export function generateStaticParams() {
  return mockStudents.map((item: { id: string }) => ({ id: item.id }))
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <Content id={id} />
}
