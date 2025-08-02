import { Ship } from '../modules/ship';

const destroyer = new Ship(1);

test('increase hits', () => {
  destroyer.hit();
  expect(destroyer.hits).toBe(1);

  expect(destroyer.shipStatus).toBe(true);
});
