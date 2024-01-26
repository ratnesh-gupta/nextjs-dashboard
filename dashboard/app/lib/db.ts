import serverlessMysql from "serverless-mysql";

const db = serverlessMysql({
    config: {
        host: process.env.MYSQLDB_HOST,
        port: (process.env.MYSQLDB_DOCKER_PORT!),
        database: process.env.MYSQLDB_DATABASE,
        user: process.env.MYSQLDB_USER,
        password: process.env.MYSQLDB_PASSWORD
    }
});

export async function createTable({ query }) {
    try {
        const results = await db.query(query);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}

export default async function excuteQuery({ query, values }) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}