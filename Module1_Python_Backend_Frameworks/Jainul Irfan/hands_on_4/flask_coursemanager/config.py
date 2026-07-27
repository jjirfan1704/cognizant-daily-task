class Config:
    SECRET_KEY = "coursemanager_secret_key"
    SQLALCHEMY_DATABASE_URI = "sqlite:///courses.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True