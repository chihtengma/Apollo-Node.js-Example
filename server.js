const cors = require("cors");
const express = require("express");

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const PORT = 3000;

// This will load all the graphiql files
const typesArray = loadFilesSync("**/*", {
   extensions: ["graphql"]
});

// This will load all the resolvers.js file
const resolversArray = loadFilesSync("**/*", { extensions: ["resolvers.js"] });

async function startApolloServer() {
   const app = express();

   const schema = makeExecutableSchema({
      typeDefs: typesArray,
      resolvers: resolversArray
   });

   const server = new ApolloServer({ schema });

   await server.start();

   app.use(cors());
   app.use(express.json());
   app.use("/graphql", expressMiddleware(server));

   app.listen(PORT, () => {
      console.log(`GraphQL server is listening on http://localhost:${PORT}`);
   });
}

startApolloServer();
