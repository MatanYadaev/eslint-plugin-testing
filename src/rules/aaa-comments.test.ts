import {test} from 'vitest';
import rule, {RULE_NAME} from './aaa-comments';
import {ruleTester} from "../utils/rule-tester";

test(RULE_NAME, () => {
  ruleTester.run(RULE_NAME, rule, {
    valid: [
      `
      describe('foo', () => {
        it('bar', () => {
          // Arrange
          const num1 = 1;
          const num2 = 2;
          
          // Act
          const result = sum(num1, num2);
          
          // Assert
          expect(result).toBe(3);
        });
      });
    `,
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
      describe('foo', function () {
        it('bar', function () {
          // Arrange
          const num1 = 1;
          const num2 = 2;

          // Act
          const result = sum(num1, num2);

          // Assert
          expect(result).toBe(3);
        });
      });
    `,
      `
      // Non-test file
      const num1 = 1;
      const num2 = 2;

      const result = sum(num1, num2);
    `
    ],
    invalid: [
      {
        code: `
        describe('foo', () => {
          it('bar', () => {
            expect(sum(1, 2)).toBe(3);
          });
        });
        `,
        errors: [
          {
            messageId: 'default',
            line: 3,
          },
        ]
      },
      {
        code: `
        it('bar', () => {
          expect(sum(1, 2)).toBe(3);
        });
        `,
        errors: [
          {
            messageId: 'default',
            line: 2,
          }
        ]
      },
      {
        code: `
        describe('foo', function () {
          it('bar', function () {
            expect(sum(1, 2)).toBe(3);
          });
        });
        `,
        errors: [
          {
            messageId: 'default',
            line: 3,
          }
        ]
      }
    ]
  })
})