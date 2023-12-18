
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "CMS",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };

// module.exports = {
//       HOST: "viaduct.proxy.rlwy.net",
//       USER: "root",
//       PASSWORD: "hcG-GHF-251aFB56-CbdDf6d2H5EAfd2",
//       DB: "railway",
//       dialect: "mysql",
//       pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//       },
//     };