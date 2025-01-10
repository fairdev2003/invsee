package controllers

import (
	"github.com/fairdev2003/honego/config"
	"github.com/fairdev2003/honego/helpers"
	"github.com/fairdev2003/honego/models"
	"github.com/fairdev2003/honego/services"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type UserController struct {
	UserService services.UserService
}

func NewUserController(userservice services.UserService) UserController {
	return UserController{
		UserService: userservice,
	}
}

func (uc *UserController) CreateUser(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	err := uc.UserService.CreateUser(&user)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (uc *UserController) GetUser(ctx *gin.Context) {
	var nick = ctx.Param("nick")
	user, err := uc.UserService.GetUser("nick", nick)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (uc *UserController) GetAll(ctx *gin.Context) {
	users, err := uc.UserService.GetAll()
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, users)
}

func (uc *UserController) GetUsers(ctx *gin.Context) {
	var key = ctx.Query("key")
	var value = ctx.Query("value")

	if key == "_id" {
		objectID, err := primitive.ObjectIDFromHex(value)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid ObjectID format"})
			return
		}
		value = objectID.Hex()
	}

	users, err := uc.UserService.GetUsers(key, value)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, users)
}

func (uc *UserController) UpdateUser(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	err := uc.UserService.UpdateUser(&user)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (uc *UserController) DeleteUser(ctx *gin.Context) {
	var username string = ctx.Param("nick")
	err := uc.UserService.DeleteUser(&username)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (uc *UserController) Register(ctx *gin.Context) {
	var registerData models.Register
	var user models.User
	if err := ctx.ShouldBindJSON(&registerData); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"code":    http.StatusBadRequest,
			"error":   config.InvalidRequest,
			"message": config.InvalidRequestMessage,
		})
		return
	}

	databaseUser, err := uc.UserService.GetUser("email", registerData.Email)
	if databaseUser != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"code":    http.StatusBadGateway,
			"error":   config.UserExists,
			"message": config.UserExistsMessage,
		})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(registerData.Password), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"error":   config.PassHashError,
			"message": config.PassHashErrorMessage,
		})
		return
	}

	user.Nick = registerData.Nick
	user.Email = registerData.Email
	user.Password = string(hashedPassword)
	user.FirstName = registerData.FirstName
	user.LastName = registerData.LastName
	user.Role = config.DefaultRole
	user.Image = config.DefaultAvatar

	err = uc.UserService.CreateUser(&user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"error":   err.Error(),
			"message": config.ServerError,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": config.RegisterOk,
	})
}

func (uc *UserController) Login(ctx *gin.Context) {
	var loginData models.Login
	if err := ctx.ShouldBindJSON(&loginData); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"error":   config.InvalidCredentials,
			"message": config.InvalidCredentialsMessage,
		})
		return
	}

	var foundUser *models.User
	foundUser, err := uc.UserService.GetUser("email", loginData.Email)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"error":   config.InvalidCredentials,
			"message": config.InvalidCredentialsMessage,
		})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(loginData.Password))
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"error":   config.InvalidCredentials,
			"message": config.InvalidCredentialsMessage,
		})
		return
	}

	token, err := helpers.GenerateToken(foundUser.ID, foundUser.Nick)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"error":   config.TokenFuncError,
			"message": config.TokenFuncErrorMessage,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": config.LoginOk,
		"token":   token,
	})
}

func (uc *UserController) Me(ctx *gin.Context) {
	ctxNick := ctx.GetString("nick")

	user, err := uc.UserService.Me(ctxNick)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"code": http.StatusBadGateway, "message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (uc *UserController) GetPublicUser(ctx *gin.Context) {
	nick := ctx.Query("nick")

	if len(nick) == 0 {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"code":    http.StatusBadGateway,
			"error":   "No params",
			"message": "No nickname value is present in a query param",
		})
		return
	}

	user, err := uc.UserService.GetPublicUser(nick)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"code": http.StatusNotFound, "error": "User is not found", "message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (uc *UserController) CheckAdmin(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "You are verified",
	})
}

type RequestContent struct {
	Nick  string `json:"nick" bson:"nick,omitempty"`
	Key   string `json:"key" bson:"key,omitempty"`
	Value string `json:"value" bson:"value,omitempty"`
}

func (uc *UserController) UpdateOne(ctx *gin.Context) {
	var requestContent *RequestContent

	if err := ctx.ShouldBindJSON(&requestContent); err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"code":  http.StatusUnauthorized,
			"error": config.InvalidCredentials,
		})
	}

	err := uc.UserService.UpdateOne(requestContent.Key, requestContent.Value, requestContent.Nick)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success"})

}

// RegisterUserRoutes is used to register user routes by functions above
// // uc.RegisterUserRoutes
func (uc *UserController) RegisterUserRoutes(rg *gin.RouterGroup) {
	userroute := rg.Group("/user")
	userroute.POST("/register", uc.Register)
	userroute.POST("/login", uc.Login)
	userroute.GET("/get", uc.GetPublicUser)
	userroute.POST("/update", uc.UpdateOne)
}

func (uc *UserController) RegisterPrivateUserRoutees(rg *gin.RouterGroup) {
	userroute := rg.Group("/user")
	userroute.GET("/me", uc.Me)
}

func (uc *UserController) RegisterAdminRoutes(rg *gin.RouterGroup) {
	adminUserRoute := rg.Group("/user")
	adminUserRoute.GET("/getusers/", uc.GetUsers)
	adminUserRoute.POST("/create", uc.CreateUser)
	adminUserRoute.GET("/get/:nick", uc.GetUser)
	adminUserRoute.GET("/getall", uc.GetAll)
	adminUserRoute.PATCH("/update", uc.UpdateUser)
	adminUserRoute.DELETE("/delete/:nick", uc.DeleteUser)
	adminUserRoute.GET("/verify", uc.CheckAdmin)

}

func (uc *UserController) RegisterRoutes(normalGroup *gin.RouterGroup, privateGroup *gin.RouterGroup, adminGroup *gin.RouterGroup) {
	uc.RegisterUserRoutes(normalGroup)
	uc.RegisterPrivateUserRoutees(privateGroup)
	uc.RegisterAdminRoutes(adminGroup)
}
