"use client"
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownItem({
  id,
  isAvailableForPurchase,
}: {
  id: string;
  isAvailableForPurchase: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh();
        });
      }}
    >
    {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({
    id,
    disabled
  }: {
    id: string;
    disabled: boolean;
  }) {
    const [isPending, startTransition] = useTransition();
    const router =useRouter();

    return (
      <DropdownMenuItem
        className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
        disabled={disabled || isPending}
        onClick={() => {
          startTransition(async () => {
            await deleteProduct(id);
            router.refresh();
          });
        }}
      >
        Delete
      </DropdownMenuItem>
    );
  }
