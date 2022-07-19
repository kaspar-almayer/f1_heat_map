import {getSeconds, formatTime} from '../helpers';

it('change lap time to seconds', () => {
  expect(getSeconds('1:10.123')).toEqual(70.123);
  expect(getSeconds('2:10.123')).toEqual(130.123);
  expect(getSeconds('1:01.123')).toEqual(61.123);
});


it('format lap time from secconds to X:XX.XXX', () => {
    expect(formatTime(70.123)).toEqual('1:10.123');
    expect(formatTime(61.123)).toEqual('1:01.123');
    expect(formatTime(130.123)).toEqual('2:10.123');
});