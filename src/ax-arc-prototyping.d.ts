declare module 'ax-arc-prototyping/styles'

declare module 'ax-arc-prototyping' {
  import type { FC, ReactNode, InputHTMLAttributes, CSSProperties } from 'react'

  export const Avatar: FC<{
    mode?: 'image' | 'initials' | 'icon'
    shape?: 'square' | 'circle'
    theme?: 'flat' | 'shadow'
    src?: string
    alt?: string
    initials?: string
    icon?: ReactNode
    className?: string
  }>

  export const Button: FC<{
    variant?: 'default' | 'secondary' | 'destructive' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    children?: ReactNode
    onClick?: () => void
    disabled?: boolean
    className?: string
    type?: 'button' | 'submit' | 'reset'
  }>

  export const IconButton: FC<{
    variant?: string
    size?: string
    children?: ReactNode
    onClick?: () => void
    disabled?: boolean
    className?: string
  }>

  export const Input: FC<InputHTMLAttributes<HTMLInputElement>>

  export const NavItem: FC<{
    flat?: boolean
    active?: boolean
    icon?: ReactNode
    onClick?: () => void
    children?: ReactNode
    className?: string
  }>

  export const VerticalNavMenu: FC<{
    children?: ReactNode
    style?: CSSProperties
    className?: string
  }>

  export const StatusChip: FC<{
    type?: 'base' | 'positive' | 'negative' | 'interim' | 'try-again' | 'submitted'
    size?: 'large' | 'medium' | 'small'
    icon?: boolean
    onPrimary?: boolean
    children?: ReactNode
    className?: string
  }>

  export const Separator: FC<{ className?: string; style?: CSSProperties }>
  export const Spinner: FC<{ className?: string }>
  export const Badge: FC<{ variant?: string; children?: ReactNode; className?: string; style?: CSSProperties }>

  export const Tabs: FC<{ value?: string; onValueChange?: (v: string) => void; children?: ReactNode; className?: string }>
  export const TabsList: FC<{ children?: ReactNode; className?: string; style?: CSSProperties }>
  export const TabsTrigger: FC<{ value: string; children?: ReactNode; className?: string; style?: CSSProperties }>
  export const TabsContent: FC<{ value: string; children?: ReactNode; className?: string }>

  export const Tooltip: FC<{ children?: ReactNode }>
  export const TooltipProvider: FC<{ children?: ReactNode }>
  export const TooltipRoot: FC<{ children?: ReactNode }>
  export const TooltipTrigger: FC<{ children?: ReactNode; asChild?: boolean }>
  export const TooltipContent: FC<{ children?: ReactNode; className?: string }>

  export const Card: FC<{ children?: ReactNode; className?: string; style?: CSSProperties }>
  export const CardHeader: FC<{ children?: ReactNode; className?: string }>
  export const CardTitle: FC<{ children?: ReactNode; className?: string }>
  export const CardDescription: FC<{ children?: ReactNode; className?: string }>
  export const CardFooter: FC<{ children?: ReactNode; className?: string }>

  export const Checkbox: FC<{
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    disabled?: boolean
    id?: string
    className?: string
  }>

  export const Select: FC<{ value?: string; onValueChange?: (v: string) => void; children?: ReactNode }>
  export const SelectTrigger: FC<{ children?: ReactNode; className?: string; style?: CSSProperties }>
  export const SelectValue: FC<{ placeholder?: string }>
  export const SelectContent: FC<{ children?: ReactNode }>
  export const SelectItem: FC<{ value: string; children?: ReactNode }>
  export const SelectGroup: FC<{ children?: ReactNode }>
  export const SelectLabel: FC<{ children?: ReactNode }>
  export const SelectSeparator: FC<Record<string, never>>

  export const Modal: FC<{
    open?: boolean
    onOpenChange?: (open: boolean) => void
    children?: ReactNode
  }>

  export const Popover: FC<{ open?: boolean; onOpenChange?: (open: boolean) => void; children?: ReactNode }>
  export const PopoverTrigger: FC<{ children?: ReactNode; asChild?: boolean }>
  export const PopoverContent: FC<{ children?: ReactNode; className?: string; style?: CSSProperties }>

  export function cn(...inputs: unknown[]): string
}
