import { decrementUseCase } from '../decrement.use-case';

describe('Decrement Use Case', () => {
  it('should decrement the counter 1', () => {
    const actual = decrementUseCase(1);
    const expected = 0;
    expect(actual).to.equal(expected);
  });
  it('should decrement the counter 2', () => {
    const actual = decrementUseCase(2);
    const expected = 1;
    expect(actual).to.equal(expected);
  });
  it('should decrement the counter 3', () => {
    const actual = decrementUseCase(3);
    const expected = 2;
    expect(actual).to.equal(expected);
  });
});
