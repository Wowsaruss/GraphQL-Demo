const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql;
// const { CompanyType, UserType } = require('./types');

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

const TestType = new GraphQLObjectType({
  name: 'Test',
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLString },
    status: { type: GraphQLString },
    groups: { type: GraphQLList },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // test: {
    //   type: TestType,
    //   args: {
    //     name: { type: GraphQLString },
    //   },
    //   resolve(parentValue, { name }) {
    //     return axios.get(`${process.env.DB_URI}`).then(res => res.data);
    //   },
    // },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, { id }) {
        return axios.get(`http://localhost:3000/users/${id}`).then(res => res.data);
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }) {
        return axios.get(`http://localhost:3000/companies/${id}`).then(res => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, { firstName, lastName, age }) {
        return axios.post('http://localhost:3000/users', { firstName, lastName, age }).then(res => res.data);
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:3000/users/${id}`).then(res => res.data);
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parentValue, { id, firstName, age }) {
        return axios.patch(`http://localhost:3000/users/${id}`, { firstName, age }).then(res => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
