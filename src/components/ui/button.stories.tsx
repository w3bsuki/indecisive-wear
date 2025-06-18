/**
 * Button Component Stories
 * Comprehensive Storybook documentation for Button component
 * 
 * Phase 11: Developer Experience & Testing
 */

import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from './button'
import { Heart } from 'lucide-react'
import { Download } from 'lucide-react'
import { Plus } from 'lucide-react'
import { Trash2 } from 'lucide-react'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Built with Radix UI primitives and styled with Tailwind CSS.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Render as a child element (useful for links)',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the button',
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Basic variants
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
}

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    children: <Heart className="h-4 w-4" />,
  },
}

// States
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const Loading: Story = {
  args: {
    disabled: true,
    children: 'Loading...',
  },
}

// With Icons
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Download className="mr-2 h-4 w-4" />
        Download
      </>
    ),
  },
}

export const IconOnly: Story = {
  args: {
    size: 'icon',
    variant: 'outline',
    children: <Plus className="h-4 w-4" />,
  },
}

// Interactive examples
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together.',
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Heart className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed together.',
      },
    },
  },
}

export const ButtonGroup: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <Plus className="mr-2 h-4 w-4" />
        Add
      </Button>
      <Button variant="outline" size="sm">
        Edit
      </Button>
      <Button variant="destructive" size="sm">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of buttons grouped together for actions.',
      },
    },
  },
}

export const AsLink: Story = {
  args: {
    asChild: true,
    children: (
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Link
      </a>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button rendered as a link using the asChild prop.',
      },
    },
  },
}

// Accessibility example
export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Button aria-label="Add item to favorites">
        <Heart className="h-4 w-4" />
      </Button>
      <Button disabled aria-describedby="loading-description">
        Loading...
      </Button>
      <div id="loading-description" className="sr-only">
        Please wait while we process your request
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of proper accessibility attributes for buttons.',
      },
    },
  },
}

// Responsive example
export const ResponsiveExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Button className="w-full sm:w-auto">
        Responsive Button
      </Button>
      <Button size="sm" className="sm:size-default">
        Size Changes
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of responsive button behavior.',
      },
    },
  },
} 