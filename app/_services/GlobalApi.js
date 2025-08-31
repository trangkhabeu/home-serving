const { gql, default: request } = require("graphql-request");

const MASTER_URL =
  "https://us-west-2.cdn.hygraph.com/v2/" +
  process.env.NEXT_PUBLIC_MASTER_URL_KEY +
  "/master";

const getCategory = async () => {
  const query = gql`
    query Category {
      categories {
        bgcolor {
          hex
        }
        id
        name
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const getAllBusinessList = async () => {
  const query = gql`
    query BusinessList {
      businessLists {
        id
        name
        about
        address
        category {
          name
        }
        contactPerson
        email
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

// const getBusinessByCategory = async (category) => {
//   const query = gql`
//     query GetBusinessByCategory($category: String!) {
//       businessLists(where: { category: { name: $category } }) {
//         id
//         name
//         about
//         address
//         category {
//           name
//         }
//         contactPerson
//         email
//         images {
//           url
//         }
//       }
//     }
//   `;

//   const variables = { category };

//   const result = await request(MASTER_URL, query, variables);
//   return result;
// };
const getBusinessByCategory = async (category) => {
  const query =
    gql`
    query MyQuery {
        businessLists(where: {category: 
            {name: "` +
    category +
    `"}}) {
          about
          address
          category {
            name
          }
          contactPerson
          email
          id
          name
          images {
            url
          }
        }
      }
      `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessById = async (id) => {
  const query =
    gql`
    query GetBusinessById {
      businessList(where: { id: "` +
    id +
    `" }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getCategory,
  getAllBusinessList,
  getBusinessByCategory,
  getBusinessById,
};

