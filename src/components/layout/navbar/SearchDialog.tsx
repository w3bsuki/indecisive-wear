"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command"

interface SearchDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  query: string
  onQueryChange: (query: string) => void
  isLoading?: boolean
}

export function SearchDialog({ 
  isOpen, 
  onOpenChange, 
  query, 
  onQueryChange, 
  isLoading = false 
}: SearchDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <Command className="rounded-lg border-none">
          <DialogHeader className="px-4 pt-4 pb-2">
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <CommandInput 
            placeholder="Search products, categories, and collections..." 
            value={query}
            onValueChange={onQueryChange}
            role="combobox"
            aria-expanded={query.length > 0}
            aria-haspopup="listbox"
            aria-label="Search for products, categories, and collections"
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <div className="py-6 text-center text-sm text-muted-foreground" aria-live="polite">
                  Searching...
                </div>
              ) : query ? (
                <div className="py-6 text-center text-sm text-muted-foreground" aria-live="polite">
                  No results found.
                </div>
              ) : null}
            </CommandEmpty>
            {/* Search results content can be added here */}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
} 