package service

import (
	"context"
	"errors"
	"time"
	"umkm-service/internal/identity/repository"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var ErrInvalidCredentials = errors.New("invalid credentials")

type LoginRequest struct {
	Email    string
	Password string
}

type LoginResponse struct {
	Token string
	Id    string
	Name  string
	Email string
}

type AuthService interface {
	Login(ctx context.Context, request LoginRequest) (*LoginResponse, error)
}

type authService struct {
	userRepo repository.UserRepository
	jwtSecret []byte
}

func NewAuthService(userRepo repository.UserRepository, jwtSecret []byte) AuthService {
	return &authService{
		userRepo: userRepo,
		jwtSecret: []byte(secret),
	}
}

func (s *authService) Login(ctx context.Context, request LoginRequest) (*LoginResponse, error) {
	user, err := s.userRepo.FindByEmail(ctx, request.Email)
	if err != nil {
		if errors.Is(err, repository.ErrUserNotFound) {
			return nil, ErrInvalidCredentials
		}
		return nil, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(request.Password))
	if err != nil {
		return nil, ErrInvalidCredentials
	}

	claims := jwt.MapClaims{
		"user_id": user.ID,
		"email":   user.Email,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(s.jwtSecret)
	if err != nil {
		return nil, errors.New("failed to generate token")
	}

	return &LoginResponse{Token: tokenString, Id: user.ID, Name: user.Name, Email: user.Email}, nil
}