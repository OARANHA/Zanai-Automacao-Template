# Kilo Template - API Documentation

## Overview

The Kilo Template provides a robust RESTful API with semantic search capabilities. This document describes all available endpoints and their usage.

## Base URL

```
http://localhost:3000
```

## Authentication

Currently, the API doesn't require authentication. However, for production use, you should implement JWT authentication using the security service.

## Endpoints

### Semantic Search

#### POST /semantic-search/index

Index files for semantic search.

**Request:**
```json
{
  "root": "./src"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Indexação concluída",
  "result": {
    "indexed_files": 150,
    "total_chunks": 2000,
    "time_taken": "2.3s"
  }
}
```

**Status Codes:**
- 200: Success
- 400: Bad Request
- 500: Internal Server Error

---

#### POST /semantic-search/search

Perform semantic search.

**Request:**
```json
{
  "query": "função de autenticação",
  "options": {
    "limit": 5,
    "withSnippet": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": [
    {
      "file": "./src/auth.js",
      "score": 0.95,
      "snippet": "function authenticateUser(username, password) { ... }",
      "line": 45
    }
  ]
}
```

**Query Parameters:**
- `query` (string, required): Search query
- `options.limit` (number, default: 8): Maximum number of results
- `options.withSnippet` (boolean, default: true): Include code snippets

**Status Codes:**
- 200: Success
- 400: Bad Request
- 500: Internal Server Error

---

#### POST /semantic-search/read-file

Read part of a file safely.

**Request:**
```json
{
  "filePath": "./src/config/database.js",
  "mode": "safe"
}
```

**Response:**
```json
{
  "success": true,
  "content": "const dbConfig = { ... }"
}
```

**Request Parameters:**
- `filePath` (string, required): Path to the file
- `mode` (string, optional): Reading mode ('safe', 'full')

**Status Codes:**
- 200: Success
- 400: Bad Request
- 404: File Not Found
- 500: Internal Server Error

---

#### GET /semantic-search/status

Check search system status.

**Response:**
```json
{
  "success": true,
  "status": {
    "qdrant": "connected",
    "ollama": "connected",
    "collection": "my_project",
    "indexed_files": 150
  }
}
```

**Status Codes:**
- 200: Success
- 500: Internal Server Error

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

### Common Error Codes

- `INVALID_REQUEST`: Request parameters are invalid
- `FILE_NOT_FOUND`: Requested file doesn't exist
- `CONNECTION_ERROR`: Connection to external service failed
- `INDEX_ERROR`: File indexing failed
- `SEARCH_ERROR`: Search operation failed

## Rate Limiting

The API includes rate limiting to prevent abuse. Default limits:
- 100 requests per 15 minutes per IP

## Response Format

All successful responses follow this structure:

```json
{
  "success": true,
  "data": {},
  "metadata": {
    "timestamp": "2024-01-01T00:00:00Z",
    "request_id": "req_123456789"
  }
}
```

## Examples

### Basic Search

```bash
curl -X POST http://localhost:3000/semantic-search/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "user authentication",
    "options": {
      "limit": 5
    }
  }'
```

### Index Specific Directory

```bash
curl -X POST http://localhost:3000/semantic-search/index \
  -H "Content-Type: application/json" \
  -d '{
    "root": "./src/services"
  }'
```

### Check System Status

```bash
curl -X GET http://localhost:3000/semantic-search/status
```

## Webhooks

Currently, webhooks are not supported. This feature may be added in future versions.

## SDKs

Official SDKs are planned for the following languages:
- JavaScript/TypeScript
- Python
- Go
- Java

## Changelog

### v1.0.0
- Initial API release
- Basic semantic search endpoints
- File reading functionality
- Health check endpoint

## Support

For API support:
- Check the troubleshooting guide in the main README
- Open an issue on GitHub
- Join our Discord community