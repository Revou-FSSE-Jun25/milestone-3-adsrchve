global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'Clothes' }]),
  })
);

describe('Categories API', () => {
  it('fetches categories', async () => {
    const res = await fetch('https://api.escuelajs.co/api/v1/categories');
    const data = await res.json();
    expect(data[0].name).toBe('Clothes');
  });
});
