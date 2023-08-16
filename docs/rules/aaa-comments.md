# Enforce AAA comments (`testing/aaa-comments`)

<!-- end auto-generated rule header -->

## Rule Details

This rule aims to enforce AAA comments.

AAA stands for Arrange, Act, Assert. It is a pattern for structuring tests.

Examples of **incorrect** code for this rule:

```ts
test('foo', () => {
  expect(sum(1, 2)).toBe(3);
})
```

Examples of **correct** code for this rule:

```ts
test('foo', () => {
  // Arrange
  const num1 = 1;
  const num2 = 2;
  
  // Act
  const result = sum(num1, num2);

  // Assert
  expect(result).toBe(3);
})
```

## Further Reading

* [Structure tests by the AAA pattern](https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-12-structure-tests-by-the-aaa-pattern) - A chapter from the JavaScript Testing Best Practices repository that explains the AAA pattern and its benefits.