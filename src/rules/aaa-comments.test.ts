import rule, {RULE_NAME} from './aaa-comments.js';
import {ruleTester} from "../utils/rule-tester.js";

ruleTester.run(RULE_NAME, rule, {
  valid: [
    `
      it('bar', () => {
        // Arrange
        const num1 = 1;
        const num2 = 2;

        // Act
        const result = sum(num1, num2);
        
        // Assert
        expect(result).toBe(3);
      });
      `,
    `
      const num1 = 1;
      const num2 = 2;

      const result = sum(num1, num2);
      `,
    `
      test.each([
        { num1: 1, num2: 2, expected: 3 },
      ])('bar', (data) => {
        // Arrange
        const num1 = data.num1;
        const num2 = data.num2;
        
        // Act
        const result = sum(num1, num2);
        
        // Assert
        expect(result).toBe(data.expected);
      });
      `,
    `
      test('bar', () => {
        // Arrange
        // Act
        const data = getData();
        
        // Assert
        expect(data).toBe('data');
      });
      `,
    `
      test('bar', () => {
        //arrange - payload
        const num1 = 1;
        const num2 = 2;
        
        //act - sum
        const result = sum(num1, num2);
        
        //assert - result
        expect(result).toBe(3);
      });
      `,
    `
      test.only('bar', () => {
        // Arrange
        const num1 = 1;
        const num2 = 2;
        
        // Act
        const result = sum(num1, num2);
        
        // Assert
        expect(result).toBe(3);
      });
      `,
    `
      test.skip('bar', () => {
        // Arrange
        const num1 = 1;
        const num2 = 2;
        
        // Act
        const result = sum(num1, num2);
        
        // Assert
        expect(result).toBe(3);
      });
      `
  ],
  invalid: [
    {
      code: `
        it('bar', () => {
          expect(sum(1, 2)).toBe(3);
        });
        `,
      errors: [
        {
          messageId: 'missing',
          line: 2,
        }
      ]
    },
    {
      code: `
        test.each([
          { num1: 1, num2: 2, expected: 3 },
        ])('bar', ({ num1, num2, expected }) => {
          expect(sum(num1, num2)).toBe(expected);
        });
        `,
      errors: [
        {
          messageId: 'missing',
          line: 2,
        }
      ]
    },
    {
      code: `
        test('bar', () => {
          // Arrange
          const num1 = 1;
          const num2 = 2;
          
          // Act & Assert
          expect(sum(num1, num2)).toBe(3);
        });
        `,
      errors: [
        {
          messageId: 'missing',
          line: 2,
        }
      ]
    },
    {
      code: `
        test.only('bar', () => {
          expect(sum(1, 2)).toBe(3);
        });
        `,
      errors: [
        {
          messageId: 'missing',
          line: 2,
        }
      ]
    },
    {
      code: `
        test.skip('bar', () => {
          expect(sum(1, 2)).toBe(3);
        });
        `,
      errors: [
        {
          messageId: 'missing',
          line: 2,
        }
      ]
    },
    {
      code: `
        test('bar', () => {
          // Act
          const num1 = 1;
          const num2 = 2;
          // Arrange
          const result = sum(num1, num2);
          // Assert
          expect(result).toBe(3);
        });
        `,
      errors: [
        {
          messageId: 'wrong-order',
          line: 2,
        }
      ]
    },
  ]
})