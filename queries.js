//  {
//    apple: company(id: "10") {
//     ...companyDetails
//    }
//    google: company(id: "20") {
//  ...companyDetails
//    }
//  }

//      fragment companyDetails on Company {
//    id
//    name
//    description
//    users {
//        firstName
//        age
//        id
//      }
//  }

//      mutation {
//    addUser( firstName: "Jim", lastName: "Scott", age: 54, companyId: "10" ) {
//      id
//      firstName
//      lastName
//      age
//    }
//  }

//      mutation {
//    deleteUser(id: "_MmY3is") {
//      id
//    }
//  }

//      mutation {
//    updateUser(id: "uwjIyEE", firstName: "Frank", age: 100) {
//      id
//      firstName
//      age
//    }
