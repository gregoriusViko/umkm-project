package repository

import (
	"context"
	"database/sql"
	"errors"
	"umkm-service/internal/identity/model"
	"umkm-service/internal/identity/repository/db"
)

type UserRepository interface {
	FindByEmail(ctx context.Context, email string) (*model.User, error)
	Create(ctx context.Context, user *model.User) error
}

var ErrUserNotFound = errors.New("user_not_found")

type sqlcUserRepository struct {
	queries *db.Queries
	dbConn  *sql.DB
}

func NewSqliteUserRepository(dbConn *sql.DB) UserRepository {
	return &sqlcUserRepository{
		queries: db.New(dbConn),
		dbConn:  dbConn,
	}
}

func (r *sqlcUserRepository) FindByEmail(ctx context.Context, email string) (*model.User, error) {
	u, err := r.queries.GetUserByEmail(ctx, email)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}

	return &model.User{
		ID:           u.ID,
		Name:         u.Name,
		Email:        u.Email,
		PasswordHash: u.PasswordHash,
	}, nil
}

func (r *sqlcUserRepository) Create(ctx context.Context, user *model.User) error {
	arg := db.CreateUserParams{
		Name:         user.Name,
		Email:        user.Email,
		PasswordHash: user.PasswordHash,
	}
	return r.queries.CreateUser(ctx, arg)
}
