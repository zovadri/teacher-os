import { mockClassGroups } from "@/lib/mock/data"
import Content from "./Content"

export function generateStaticParams() {
  return mockClassGroups.map((item: { id: string }) => ({ id: item.id }))
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <Content id={id} />
}
