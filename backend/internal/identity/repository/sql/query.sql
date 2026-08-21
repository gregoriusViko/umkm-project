-- name: GetUserByEmail :one
SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1;

-- name: CreateUser :exec
INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?);