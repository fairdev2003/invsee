package handlers

import (
	"context"
	"github.com/fairdev2003/honego/models"
	"github.com/fairdev2003/honego/services"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ModServiceImpl struct {
	modCollection *mongo.Collection
	ctx           context.Context
}

func NewModService(modCollection *mongo.Collection, ctx context.Context) services.ModService {
	return &ModServiceImpl{
		modCollection: modCollection,
		ctx:           ctx,
	}
}

func (m ModServiceImpl) CreateMod(mod *models.Mod) error {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) GetMod(query *string) (bson.M, error) {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) GetAll() ([]*models.Mod, error) {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) UpdateMod(mod *models.Mod) error {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) GetMods(s string) ([]*models.Mod, error) {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) DeleteMod(s *string) error {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) Find(query *models.FindType) ([]*models.Mod, error) {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) BulkFind(key string, value string) ([]*models.Mod, error) {
	//TODO implement me
	panic("implement me")
}

func (m ModServiceImpl) DebugFunc() error {
	//TODO implement me
	panic("implement me")
}
