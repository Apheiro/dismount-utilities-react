<div align="center">
	<img width="250" src="./public/DismountUtility.svg" alt="conditional parent">
</div>

# Dismount-Utility-React
A lightweight React library for handling component dismount events, featuring a `useOnDismount` hook and `DismountHandler` component to execute callbacks on unmount.

# Installation

```bash   
npm install dismount-utility-react
```	

# Description

Dismount-Utility-React is a utility for React applications that need to perform actions when a component unmounts. It provides a `useOnDismount` hook to run a callback on dismount and a `DismountHandler` component to wrap your content, conditionally executing the callback when the parent component unmounts. This is especially useful in scenarios where you can’t directly use hooks inside a built component (e.g., a third-party components), allowing you to handle dismount logic by wrapping the children of the disappearing parent.


# Usage

The DismountHandler component accepts the following props:

``` typescript
{
  onDismount?: () => void;
  children: React.ReactNode;
}
```

- `onDismount`: An optional callback function that will be executed when the parent component unmounts.
- `children`: The child elements to render.

You can also use the `useOnDismount` hook directly in your components to handle dismount logic when hooks are allowed.

# Example

### Using `useOnDismount` Hook Directly

If you can use hooks directly in your component, you can use `useOnDismount`:

```tsx
import { useOnDismount } from 'dismount-utility-react';

function MyComponent() {
  useOnDismount(() => {
    console.log('MyComponent has been unmounted!');
  });

  return <div>My Component</div>;
}
```

### Using `DismountHandler` in a Popover

This example shows how to use `DismountHandler` inside a `PopoverContent` component to execute a callback when the popover unmounts:

``` tsx
import { forwardRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover'; // Example library
import { DismountHandler } from 'dismount-utility-react';

interface Props { 
    onDismount?: () => void;
    ...props
}

function PopoverContent ({onDismount}: Props) {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={className}
          {...props}
        >
          <DismountHandler onDismount={onDismount}>
            {children}
          </DismountHandler>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
}

// Usage in a parent component
function App() {
  const handleDismount = () => {
    console.log('Popover has been unmounted!');
  };

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger>Toggle Popover</PopoverPrimitive.Trigger>
      <PopoverContent onDismount={handleDismount}>
        <div>Popover Content</div>
      </PopoverContent>
    </PopoverPrimitive.Root>
  );
}
```

