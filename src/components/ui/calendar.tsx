import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("ax-calendar", className)}
      classNames={{
        months:          "ax-calendar-months",
        month:           "ax-calendar-month",
        month_caption:   "ax-calendar-caption",
        caption_label:   "ax-calendar-caption-label",
        nav:             "ax-calendar-nav",
        button_previous: "ax-calendar-nav-btn ax-calendar-nav-btn-prev",
        button_next:     "ax-calendar-nav-btn ax-calendar-nav-btn-next",
        month_grid:      "ax-calendar-table",
        weekdays:        "ax-calendar-head-row",
        weekday:         "ax-calendar-head-cell",
        week:            "ax-calendar-row",
        day:             "ax-calendar-cell",
        day_button:      "ax-calendar-day",
        selected:        "ax-calendar-day--selected",
        today:           "ax-calendar-day--today",
        outside:         "ax-calendar-day--outside",
        disabled:        "ax-calendar-day--disabled",
        range_start:     "ax-calendar-day--selected",
        range_end:       "ax-calendar-day--selected",
        range_middle:    "ax-calendar-day--range-middle",
        hidden:          "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeft /> : <ChevronRight />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
