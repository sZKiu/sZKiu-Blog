import { Blog } from "@/types/types_redux"

export default function filterBlogCat(catList: Blog[], id: string) {
  return catList.filter((el, i) => el.id !== id)
}