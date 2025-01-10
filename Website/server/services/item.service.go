package services

import (
	"github.com/fairdev2003/honego/models"
	"go.mongodb.org/mongo-driver/bson"
)

type ItemService interface {
	CreateItem(*models.Item) error
	GetItem(query *string) (bson.M, error)
	GetAll() ([]*models.Item, error)
	UpdateItem(*models.Item) error
	GetItems(key string, value string) ([]*bson.M, error)
	DeleteItem(*string) error
	Find(query *models.FindType) ([]*models.Item, error)
	BulkFind(key string, value string) ([]*models.Item, error)
}
