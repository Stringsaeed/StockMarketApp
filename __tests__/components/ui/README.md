# UI Component Testing Guide

This directory contains tests for UI components in the StockMarketApp. This guide explains the testing approach and provides examples for testing UI components, particularly those using animations and gestures.

## Button Component Testing

The Button component is a good example of how to test UI components that use animations and gestures. The tests are organized into three levels:

1. **Unit Tests** (`Button.test.tsx`): Tests the Button component in isolation
2. **Form Integration Tests** (`ButtonForm.test.tsx`): Tests the Button component in a form context
3. **Navigation Integration Tests** (`ButtonNavigation.test.tsx`): Tests the Button component in a navigation context
4. **Counter Integration Tests** (`ButtonIntegration.test.tsx`): Tests the Button component in a counter context

### Mocking Strategy

Since the Button component uses `react-native-reanimated` and `react-native-gesture-handler`, we need to mock these libraries to test the component effectively. The mocks are defined at the top of each test file:

```typescript
// Mock the react-native-reanimated
jest.mock('react-native-reanimated', () => {
  return {
    default: {
      interpolate: jest.fn(),
    },
    Animated: {
      View: (props: any) => {
        const {children, ...rest} = props;
        return <View {...rest}>{children}</View>;
      },
    },
    useAnimatedStyle: jest.fn(() => ({})),
    useSharedValue: jest.fn(initialValue => ({value: initialValue})),
    withSpring: jest.fn(toValue => toValue),
  };
});

// Mock the react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  return {
    Gesture: {
      Tap: () => ({
        onBegin: jest.fn().mockReturnThis(),
        onEnd: jest.fn().mockReturnThis(),
        onFinalize: jest.fn().mockReturnThis(),
        onStart: jest.fn().mockReturnThis(),
      }),
    },
    GestureDetector: (props: any) => props.children,
  };
});
```

#### Important Note on Jest Mocking

When mocking modules in Jest, be careful not to reference out-of-scope variables in the module factory function. This is a common source of errors. For example, the following will cause an error:

```typescript
// This will cause an error
jest.mock('some-module', () => {
  const SomeComponent = ({children}) =>
    React.createElement('div', null, children);
  return {SomeComponent};
});
```

Instead, use inline JSX or return a function that will be executed later:

```typescript
// This works
jest.mock('some-module', () => {
  return {
    SomeComponent: props => {
      const {children, ...rest} = props;
      return <div {...rest}>{children}</div>;
    },
  };
});
```

### Testing Approach

#### Unit Tests

Unit tests focus on the component's rendering and behavior in isolation:

- Rendering with default props
- Snapshot testing
- Custom styling
- Passing additional props
- Rendering children
- Press animations

#### Integration Tests

Integration tests focus on how the Button component interacts with other components:

- Form submission and validation
- Navigation between screens
- Counter functionality
- Complex interactions

### Best Practices

1. **Use TestIDs**: Add `testID` props to components to make them easier to find in tests
2. **Test User Interactions**: Use `fireEvent` to simulate user interactions
3. **Test Visual States**: Test that the component renders correctly in different states
4. **Mock External Dependencies**: Mock libraries like `react-native-reanimated` and `react-native-gesture-handler`
5. **Test Real-World Scenarios**: Create integration tests that simulate real-world usage

## Adding Tests for New UI Components

When adding tests for new UI components, follow these steps:

1. Create a test file in the appropriate directory
2. Mock any external dependencies
3. Write unit tests for the component in isolation
4. Write integration tests for the component in context
5. Update this README if you introduce new testing patterns or strategies

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

To run tests for a specific component:

```bash
npm test -- Button
```

## Troubleshooting

If you encounter issues with the tests, check the following:

1. Make sure the mocks are correctly implemented
2. Check that the component is correctly imported
3. Verify that the test IDs match the ones in the component
4. Ensure that the test environment is correctly set up
5. If you see errors about module factories referencing out-of-scope variables, review your mocking approach
