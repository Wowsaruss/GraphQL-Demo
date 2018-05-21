const axios = require('axios');

describe('User resolvers', () => {
  test('allUsers', async () => {
    const response = await axios.get('http://localhost:3000/users', {
      query: `
      query {
        user(id: "uwjIyEE") {
            id
            firstName
            lastName
        }
    }
            `,
    });
    const { data } = response;
    expect(data).toMatchObject({
      data: {
        user: {
          id: 'uwjIyEE',
          firstName: 'Frank',
          lastName: null,
        },
      },
    });
  });
});
