import { incrementUseCase } from '../increment.use-case';

describe('Increment Use Case', () => {
  it('should Increment the counter 1', () => {
    const actual = incrementUseCase(1);
    const expected = 2;
    expect(actual).to.equal(expected);
  });
  it('should Increment the counter 2', () => {
    const actual = incrementUseCase(2);
    const expected = 3;
    expect(actual).to.equal(expected);
  });
  it('should Increment the counter 3', () => {
    const actual = incrementUseCase(3);
    const expected = 4;
    expect(actual).to.equal(expected);
  });
});
