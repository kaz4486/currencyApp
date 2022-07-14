import { convertPLNToUSD } from './../convertPLNtoUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return Nan when text input', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('-55')).toBeNaN();
    expect(convertPLNToUSD('TAK')).toBeNaN();
    expect(convertPLNToUSD('T./ssk65')).toBeNaN();
  });
  it('should return Nan when missing argument', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it('should return error when argument is not text or string', () => {
    expect(convertPLNToUSD(function () {})).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
  });
  it('should return $0.00 when argument is a number below 0', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-2.56)).toBe('$0.00');
    expect(convertPLNToUSD(-250183)).toBe('$0.00');
  });
});
