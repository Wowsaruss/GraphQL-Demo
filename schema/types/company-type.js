const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const UserType = require('./user-type');

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve({ id }, args) {
        return axios.get(`http://localhost:3000/companies/${id}/users`).then(res => res.data);
      },
    },
  }),
});

module.exports = CompanyType;
