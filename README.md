# GraphQL Book Library - Full Stack Project

A complete GraphQL application built with NestJS (backend) and Next.js (frontend) to demonstrate GraphQL concepts for developers transitioning from REST APIs.

## 🚀 Features

- **Backend (NestJS + GraphQL)**

  - GraphQL API with Apollo Server
  - TypeORM with PostgreSQL
  - CRUD operations for books
  - Auto-generated GraphQL schema
  - GraphQL Playground for testing

- **Frontend (Next.js + Apollo Client)**
  - Modern React with TypeScript
  - Apollo Client for GraphQL operations
  - Responsive UI with Tailwind CSS
  - Real-time data fetching and mutations

## 📁 Project Structure

```
GraphQL/
├── backend/                 # NestJS GraphQL API
│   ├── src/
│   │   ├── books/          # Book module
│   │   │   ├── book.entity.ts
│   │   │   ├── books.service.ts
│   │   │   ├── books.resolver.ts
│   │   │   ├── books.module.ts
│   │   │   └── dto/
│   │   └── app.module.ts
│   └── package.json
├── frontend/               # Next.js client
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── lib/           # Apollo Client config
│   │   └── types/         # TypeScript types
│   └── package.json
├── docker-compose.yml     # PostgreSQL database
└── README.md
```

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## 🚀 Quick Start

### 1. Start the Database

```bash
# Start PostgreSQL with Docker
docker-compose up -d
```

### 2. Start the Backend

```bash
cd backend
npm install
npm run start:dev
```

The GraphQL API will be available at:

- **API Endpoint**: http://localhost:3000/graphql
- **GraphQL Playground**: http://localhost:3000/graphql (for testing queries)

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

- **Frontend**: http://localhost:3001

## 📚 GraphQL Schema

The API provides the following operations:

### Queries

```graphql
# Get all books
query {
  books {
    id
    title
    author
    description
    isPublished
    createdAt
    updatedAt
  }
}

# Get a single book
query {
  book(id: "book-id") {
    id
    title
    author
    description
    isPublished
  }
}
```

### Mutations

```graphql
# Create a new book
mutation {
  createBook(
    createBookInput: {
      title: "GraphQL for Beginners"
      author: "John Doe"
      description: "A great introduction to GraphQL"
      isPublished: true
    }
  ) {
    id
    title
    author
  }
}

# Update a book
mutation {
  updateBook(
    id: "book-id"
    updateBookInput: { title: "Updated Title", isPublished: false }
  ) {
    id
    title
    isPublished
  }
}

# Delete a book
mutation {
  removeBook(id: "book-id")
}
```

## 🔧 Key GraphQL Concepts Demonstrated

### 1. **Single Endpoint vs Multiple REST Endpoints**

- **REST**: `/api/books`, `/api/books/:id`, `/api/books` (POST), etc.
- **GraphQL**: Single `/graphql` endpoint for all operations

### 2. **Client-Specified Data Shape**

- **REST**: Server decides what data to return
- **GraphQL**: Client specifies exactly what fields they need

### 3. **Strong Type System**

- GraphQL schema provides compile-time type safety
- Auto-generated TypeScript types from schema

### 4. **Introspection**

- GraphQL Playground automatically discovers available operations
- Self-documenting API

## 🎯 Learning Path

1. **Start with the Backend**: Explore the GraphQL schema and resolvers
2. **Test with Playground**: Use the GraphQL Playground to test queries
3. **Frontend Integration**: See how Apollo Client handles GraphQL operations
4. **Compare with REST**: Notice the differences in data fetching patterns

## 🔍 Key Files to Explore

### Backend

- `backend/src/books/book.entity.ts` - GraphQL type definitions
- `backend/src/books/books.resolver.ts` - GraphQL resolvers
- `backend/src/books/books.service.ts` - Business logic
- `backend/src/app.module.ts` - GraphQL and TypeORM configuration

### Frontend

- `frontend/src/lib/apollo-client.ts` - Apollo Client setup
- `frontend/src/app/page.tsx` - Main page with GraphQL query
- `frontend/src/app/books/new/page.tsx` - Create book with mutation
- `frontend/src/app/books/[id]/edit/page.tsx` - Edit book with query + mutation

## 🚀 Next Steps

- Add authentication with JWT
- Implement real-time subscriptions
- Add pagination and filtering
- Explore GraphQL fragments and unions
- Add error handling and validation

## 📖 Resources

- [GraphQL Official Documentation](https://graphql.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [Apollo Client](https://www.apollographql.com/docs/react/)

---

**Happy GraphQL Learning! 🎉**
