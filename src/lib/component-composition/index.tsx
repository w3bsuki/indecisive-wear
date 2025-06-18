/**
 * Component Composition Utilities
 * 
 * Utilities for building flexible, composable components following
 * atomic design principles and modern React patterns.
 */

// @ts-nocheck
import React, { ReactNode, ComponentType } from 'react'
import { cn } from '@/lib/utils'

// Base component props interface
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
  'data-testid'?: string
}

// Variant-based component props
export interface VariantComponentProps<T extends string = string> extends BaseComponentProps {
  variant?: T
  size?: 'small' | 'medium' | 'large'
}

// Compound component utilities
export interface CompoundComponentProps extends BaseComponentProps {
  asChild?: boolean
}

// Higher-order component type
export type HOC<P = {}> = <T extends ComponentType<any>>(
  Component: T
) => ComponentType<P & React.ComponentProps<T>>

// Render prop pattern utilities
export interface RenderProps<T = any> {
  children: (props: T) => ReactNode
}

// Composition patterns

/**
 * Creates a compound component system with context
 */
export function createCompoundComponent<T extends Record<string, any>>(
  name: string,
  defaultContext: T
) {
  const Context = React.createContext<T>(defaultContext)
  
  const useContext = () => {
    const context = React.useContext(Context)
    if (!context) {
      throw new Error(`use${name} must be used within ${name}Provider`)
    }
    return context
  }
  
  const Provider = ({ children, value }: { children: ReactNode; value: T }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  )
  
  return { Context, useContext, Provider }
}

/**
 * Creates a slot-based composition utility
 */
export function createSlots<T extends Record<string, any>>(slots: T) {
  const SlotContext = React.createContext<Partial<T>>({})
  
  const SlotProvider = ({ children, ...slotProps }: { children: ReactNode } & Partial<T>) => (
    <SlotContext.Provider value={slotProps}>{children}</SlotContext.Provider>
  )
  
  const useSlots = () => React.useContext(SlotContext)
  
  return { SlotProvider, useSlots }
}

/**
 * Polymorphic component utility for flexible element rendering
 */
export interface PolymorphicProps<T extends React.ElementType = 'div'> {
  as?: T
  className?: string
  children?: ReactNode
}

export type PolymorphicComponent<T extends React.ElementType> = PolymorphicProps<T> &
  Omit<React.ComponentProps<T>, keyof PolymorphicProps<T>>

export function createPolymorphicComponent<DefaultElement extends React.ElementType = 'div'>(
  defaultElement: DefaultElement
) {
  return function PolymorphicComponent<T extends React.ElementType = DefaultElement>({
    as,
    className,
    children,
    ...props
  }: PolymorphicComponent<T>) {
    const Element = as || defaultElement
    return (
      <Element className={className} {...props}>
        {children}
      </Element>
    )
  }
}

/**
 * Variant utility for creating component variants
 */
export function createVariants<T extends Record<string, any>>(variants: T) {
  return (variant: keyof T, className?: string) => {
    const variantClasses = variants[variant]
    return cn(variantClasses, className)
  }
}

/**
 * Atomic design composition helpers
 */
export const atomicUtils = {
  // Atom: Basic building block
  atom: <P extends BaseComponentProps>(
    Component: ComponentType<P>,
    baseClasses: string = ''
  ) => {
    return React.forwardRef<HTMLElement, P>((props, ref) => {
      const { className, ...rest } = props
      return (
        <Component 
          ref={ref} 
          className={cn(baseClasses, className)} 
          {...rest as P} 
        />
      )
    })
  },

  // Molecule: Combination of atoms
  molecule: <P extends BaseComponentProps>(
    atoms: ComponentType<any>[],
    layout: string = 'flex gap-2'
  ) => {
    return ({ className, children, ...props }: P) => (
      <div className={cn(layout, className)} {...props}>
        {children}
      </div>
    )
  },

  // Organism: Complex component with multiple molecules/atoms
  organism: <P extends BaseComponentProps>(
    structure: string = 'space-y-4'
  ) => {
    return ({ className, children, ...props }: P) => (
      <section className={cn(structure, className)} {...props}>
        {children}
      </section>
    )
  },
}

/**
 * Layout composition utilities
 */
export const layoutUtils = {
  // Stack: Vertical layout
  stack: (gap: string = 'space-y-4') => ({ className, children, ...props }: BaseComponentProps) => (
    <div className={cn(gap, className)} {...props}>
      {children}
    </div>
  ),

  // Inline: Horizontal layout  
  inline: (gap: string = 'flex gap-4') => ({ className, children, ...props }: BaseComponentProps) => (
    <div className={cn(gap, className)} {...props}>
      {children}
    </div>
  ),

  // Grid: CSS Grid layout
  grid: (columns: string = 'grid grid-cols-1') => ({ className, children, ...props }: BaseComponentProps) => (
    <div className={cn(columns, className)} {...props}>
      {children}
    </div>
  ),

  // Container: Centered container with max width
  container: (maxWidth: string = 'max-w-7xl mx-auto px-4') => ({ className, children, ...props }: BaseComponentProps) => (
    <div className={cn(maxWidth, className)} {...props}>
      {children}
    </div>
  ),
}

/**
 * Theme-aware component composition
 */
export function withTheme<P extends object>(
  Component: ComponentType<P>,
  themeClasses: {
    light: string
    dark: string
  }
) {
  return React.forwardRef<HTMLElement, P & { theme?: 'light' | 'dark' }>((props, ref) => {
    const { theme = 'light', className, ...rest } = props
    const themeClass = themeClasses[theme]
    
    return (
      <Component 
        ref={ref}
        className={cn(themeClass, className)} 
        {...rest as P} 
      />
    )
  })
}

/**
 * Responsive component composition
 */
export function withResponsive<P extends object>(
  Component: ComponentType<P>,
  responsiveClasses: {
    mobile: string
    tablet: string
    desktop: string
  }
) {
  return React.forwardRef<HTMLElement, P>((props, ref) => {
    const { className, ...rest } = props
    const responsiveClass = cn(
      responsiveClasses.mobile,
      `md:${responsiveClasses.tablet}`,
      `lg:${responsiveClasses.desktop}`
    )
    
    return (
      <Component 
        ref={ref}
        className={cn(responsiveClass, className)} 
        {...rest as P} 
      />
    )
  })
} 