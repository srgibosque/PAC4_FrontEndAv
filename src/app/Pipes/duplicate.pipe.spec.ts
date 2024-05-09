import { DuplicatePipe } from "./duplicate.pipe";

describe('Duplicate pipe', () => {
  let pipe: DuplicatePipe;

  beforeEach(() => {
    pipe = new DuplicatePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('duplicate pipe sucess', () => {
    let number: number = 4;
    const result = pipe.transform(number)
    expect(result).toBe(8);
  });
});