global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, title: 'Product 1' }]),
  })
);

describe('Product API', () => {
  it('fetches products', async () => {
    const res = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await res.json();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].title).toBe('Product 1');
  });
});
