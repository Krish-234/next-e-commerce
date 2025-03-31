"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteOrder } from "../../_actions/orders"
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
          await deleteOrder(id)
          router.refresh()
        })
      }
    >
      Delete
    </DropdownMenuItem>
  )
}
