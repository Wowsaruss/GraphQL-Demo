const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const CompanyType = require('./company-type');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve({ companyId }, args) {
        return axios.get(`http://localhost:3000/companies/${companyId}`).then(res => res.data);
      },
    },
  }),
});

module.exports = UserType;
