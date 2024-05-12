import { FormatDatePipe } from "./format-date.pipe";


describe('FormatDate pipe', () => {
  let pipe: FormatDatePipe;

  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('return the desired format given 1 as argument', () => {
    let date: Date = new Date('1998-06-10');
    const result = pipe.transform(date, 1);
    expect(result).toBe('10061998');
  });

  it('return the desired format given 2 as argument', () => {
    let date: Date = new Date('1998-06-10');
    const result = pipe.transform(date, 2);
    expect(result).toBe('10 / 06 / 1998');
  });

  it('return the desired format given 3 as argument', () => {
    let date: Date = new Date('1998-06-10');
    const result = pipe.transform(date, 3);
    expect(result).toBe('10/06/1998');
  });

  it('return the desired format given 4 as argument', () => {
    let date: Date = new Date('1998-06-10');
    const result = pipe.transform(date, 4);
    expect(result).toBe('1998-06-10');
  });
});