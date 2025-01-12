package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

type Config struct {
	DatabaseURI      string
	SuperSecretToken string
}

var Envs = initConfig()

func initConfig() *Config {
	return &Config{
		DatabaseURI:      getEnv("DATABASE_URI", ""),
		SuperSecretToken: getEnv("SUPER_SECRET_TOKEN", ""),
	}
}

func getEnv(key string, fallback string) string {
	err := godotenv.Load()
	if err != nil {
		log.Printf("Błąd podczas ładowania pliku .env: %v", err)
		return fallback
	}
	if len(os.Getenv(key)) == 0 {
		panic("System doesnt have important keys from .env file, please add those into the configuration file or via docker compose way")
	}

	return os.Getenv(key)
}
