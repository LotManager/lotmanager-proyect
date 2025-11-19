export default {
  schema: './backend/prisma/schema.prisma',
  datasource: {
    db: {
      adapter: 'sqlite',
      url: process.env.DATABASE_URL!,
    },
  },
};