package helpers

import (
	"fmt"
	"github.com/fairdev2003/honego/config"
	"github.com/fairdev2003/honego/services"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/time/rate"
	"net/http"
	"strings"
	"time"
)

type Claims struct {
	Email     string    `json:"email"`
	Role      string    `json:"role"`
	ExpiresAt time.Time `json:"exp"`
}

func ForbidSiteRequest() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		origin := ctx.Request.Header.Get("Referer")
		fmt.Println("Origin:", ctx.Request.Header)
		if origin != "http://localhost:3000/" {
			ctx.JSON(http.StatusForbidden, gin.H{"message": "Forbidden - Invalid origin"})
			ctx.Abort()
			return
		}
		ctx.Next()
	}
}

func RateLimmiter(requestPerSecond int) gin.HandlerFunc {
	var limiter = rate.NewLimiter(1, requestPerSecond)
	return func(ctx *gin.Context) {
		if !limiter.Allow() {
			ctx.JSON(http.StatusTooManyRequests, gin.H{"code": http.StatusTooManyRequests, "error": "Too many requests", "message": "You are being rate limited"})
			ctx.Abort()
			return
		}
	}
}

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		authHeader := ctx.GetHeader("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.UnauthorizedHeader,
				"message": config.MissingBearerMessage,
			})
			ctx.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unauthorized")
			}
			return []byte(config.Envs.SuperSecretToken), nil
		})

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.UnauthorizedHeader,
				"message": config.SessionInvalidMessage,
			})
			ctx.Abort()
			return
		}

		expRaw, exists := claims["exp"]
		if !exists {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.TokenExpired,
				"message": config.TokenExpiredMessage,
			})
			ctx.Abort()
			return
		}

		expFloat, ok := expRaw.(float64)
		if !ok {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.TokenExpired,
				"message": config.TokenExpiredMessage,
			})
			ctx.Abort()
			return
		}

		exp := int64(expFloat)
		if exp < time.Now().Unix() {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.TokenExpired,
				"message": config.TokenExpiredMessage,
			})
			ctx.Abort()
			return
		}

		fmt.Println(claims["id"].(string))

		ctx.Set("nick", claims["nick"])
		ctx.Set("id", claims["id"])

		ctx.Next()
	}
}

func GenerateToken(id string, nick string) (string, error) {
	claims := jwt.MapClaims{
		"id":   id,
		"nick": nick,
		"exp":  time.Now().Add(time.Hour * 1).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.Envs.SuperSecretToken))
}

func VerifyAdmin(user services.UserService) gin.HandlerFunc {
	return func(ctx *gin.Context) {

		param := ctx.GetString("nick")
		id := ctx.GetString("id")
		fmt.Println("nick:", param)
		fmt.Println("id:", id)

		dbUser, err := user.GetUser("nick", param)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":  http.StatusUnauthorized,
				"error": err.Error(),
			})
			ctx.Abort()
		}
		if dbUser == nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":  http.StatusUnauthorized,
				"error": "User is not found!",
			})
		}

		role := dbUser.Role
		fmt.Println("role:", role)

		if role == config.AdminRole {
			ctx.Next()
		} else {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"code":    http.StatusUnauthorized,
				"error":   config.RoleTooLow,
				"message": config.RoleTooLowMessage,
			})
			ctx.Abort()
		}
	}
}
