"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteUser } from "../../_actions/users"
import { useRouter } from "next/navigation"

export function DeleteDropDownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteUser(id)
          router.refresh()
        })
      }
    >
      Delete
    </DropdownMenuItem>
  )
}
