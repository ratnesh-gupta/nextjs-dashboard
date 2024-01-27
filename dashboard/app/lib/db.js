
const  mysql  = require('serverless-mysql')()

const db = mysql({
    config: {
        host: process.env.MYSQLDB_HOST,
        port: process.env.MYSQLDB_DOCKER_PORT,
        database: process.env.MYSQLDB_DATABASE,
        user: process.env.MYSQLDB_USER,
        password: process.env.MYSQLDB_PASSWORD
    }
});

export default async function excuteQuery({ query, values }) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}