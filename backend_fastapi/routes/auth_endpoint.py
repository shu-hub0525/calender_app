import sys
sys.path.append('../')

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt
from datetime import datetime, timedelta

auth_endpoint = APIRouter()

SECRET_KEY = "your-secret-key"  # 本番では環境変数などで管理

class PostAuthAdminRequest(BaseModel):
    email: str
    password: str
    administorator_code: int

class PostAuthStudentRequest(BaseModel):
    email: str
    password: str

def create_jwt_token(email: str, role: str):
    payload = {
        "sub": email,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

@auth_endpoint.post("/auth/admin/login", tags=["auth"])
def handle_login(user: PostAuthAdminRequest):
    """
    ログインに使用するエンドポイント
    """
    if user.email == "admin@example.com" and user.password == "adminpass" and user.administorator_code == 1234:
        token = create_jwt_token(user.email, "admin")
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="認証に失敗しました")
    
@auth_endpoint.post("/auth/student/login", tags=["auth"])
def handle_student_login(user: PostAuthStudentRequest):
    """
    学生ログインに使用するエンドポイント
    """
    # 仮の認証ロジック
    if user.email == "student@example.com" and user.password == "studentpass":
        token = create_jwt_token(user.email, "student")
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="認証に失敗しました")