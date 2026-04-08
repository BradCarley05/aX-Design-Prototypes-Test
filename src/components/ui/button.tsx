import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip } from "@/components/ui/tooltip"

type ButtonVariant =
  | "default" | "destructive" | "positive" | "secondary"
  | "outline" | "outline-destructive" | "outline-positive"
  | "link" | "tertiary"

type ButtonSize = "default" | "icon"

const FILLED_VARIANTS: ButtonVariant[] = ["default", "destructive", "positive", "secondary"]

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  split?: boolean
  onSplitClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      split = false,
      onSplitClick,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading
    const baseClass = cn("ax-btn", `ax-btn--${variant}`, `ax-btn-size--${size}`, className)

    if (split) {
      return (
        <div className={cn("ax-btn-split", isDisabled && "ax-btn-split--disabled")}>
          <Comp
            className={cn("ax-btn", `ax-btn--${variant}`, `ax-btn-size--${size}`)}
            ref={ref}
            disabled={isDisabled}
            {...props}
          >
            {loading ? <Spinner /> : leftIcon}
            {children}
          </Comp>
          <div
            aria-hidden="true"
            className={cn(
              "ax-btn-split-divider",
              FILLED_VARIANTS.includes(variant) ? "ax-btn-split-divider--light" : "ax-btn-split-divider--dark"
            )}
          />
          <button
            type="button"
            onClick={onSplitClick}
            disabled={isDisabled}
            className={cn("ax-btn", `ax-btn--${variant}`, `ax-btn-size--${size}`)}
          >
            <i className="icon-chevron-down" />
          </button>
        </div>
      )
    }

    return (
      <Comp className={baseClass} ref={ref} disabled={isDisabled} {...props}>
        {loading ? <Spinner /> : leftIcon}
        {children}
        {rightIcon}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  buttonStyle?: boolean
  rounded?: boolean
  size?: 18 | 20 | 24
  selected?: boolean
  tooltip?: string
}

function IconButton({
  icon,
  buttonStyle = true,
  rounded = false,
  size = 20,
  selected = false,
  tooltip,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  const btn = (
    <button
      type="button"
      className={cn(
        "ax-icon-btn",
        buttonStyle ? "ax-icon-btn--styled" : "ax-icon-btn--base",
        rounded && "ax-icon-btn--rounded",
        selected && "ax-icon-btn--selected",
        `ax-icon-btn--size-${size}`,
        className
      )}
      disabled={disabled}
      {...props}
    >
      <i className={icon} />
    </button>
  )

  if (tooltip) {
    return <Tooltip content={tooltip}>{btn}</Tooltip>
  }

  return btn
}
IconButton.displayName = "IconButton"

export { Button, IconButton }
