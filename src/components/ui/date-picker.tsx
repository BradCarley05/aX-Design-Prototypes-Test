import * as React from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type { DateRange }

/* ─── Single ───────────────────────────────────────────────────────────────── */

interface DatePickerSingleProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

/* ─── Range ────────────────────────────────────────────────────────────────── */

interface DatePickerRangeProps {
  mode: "range"
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps

/* ─── Component ────────────────────────────────────────────────────────────── */

function DatePicker(props: DatePickerProps) {
  const { mode = "single", placeholder, className, disabled } = props

  const hasValue =
    mode === "range"
      ? !!(props as DatePickerRangeProps).selected?.from
      : !!(props as DatePickerSingleProps).selected

  const label = React.useMemo(() => {
    if (mode === "range") {
      const { selected } = props as DatePickerRangeProps
      if (!selected?.from) return placeholder ?? "Pick a date range"
      if (selected.to) return `${format(selected.from, "LLL dd, y")} – ${format(selected.to, "LLL dd, y")}`
      return format(selected.from, "LLL dd, y")
    }
    const { selected } = props as DatePickerSingleProps
    return selected ? format(selected, "PPP") : (placeholder ?? "Pick a date")
  }, [mode, props, placeholder])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn("ax-select-trigger ax-date-picker-trigger", className)}
          disabled={disabled}
          {...(!hasValue ? { "data-placeholder": "" } : {})}
        >
          <i className="icon-calendar-outline" />
          <span className="ax-select-value">{label}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        {mode === "range" ? (
          <Calendar
            mode="range"
            selected={(props as DatePickerRangeProps).selected}
            onSelect={(props as DatePickerRangeProps).onSelect}
            numberOfMonths={2}
            initialFocus
          />
        ) : (
          <Calendar
            mode="single"
            selected={(props as DatePickerSingleProps).selected}
            onSelect={(props as DatePickerSingleProps).onSelect}
            initialFocus
          />
        )}
      </PopoverContent>
    </Popover>
  )
}

DatePicker.displayName = "DatePicker"

export { DatePicker }
export type { DatePickerProps }
