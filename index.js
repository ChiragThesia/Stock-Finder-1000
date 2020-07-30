const { app, server } = require('./src/server.js');
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`🚀Server is ready at http://localhost:${port}${server.graphqlPath}`);
});
