import sys
sys.path.append('../')

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pymysql

users_endpoint = APIRouter()

# DB接続情報
DB_CONFIG = {
    "host": "localhost",
    "user": "root",         # 適宜変更
    "password": "password", # 適宜変更
    "database": "calender_db",
    "cursorclass": pymysql.cursors.DictCursor
}

class PostUserRequest(BaseModel):
    email: str
    password: str
    is_administrator: bool

def get_connection():
    return pymysql.connect(**DB_CONFIG)

@users_endpoint.get("/users", tags=["users"])
def handle_get_users():
    """
    ユーザ情報を取得するエンドポイント
    """
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, email, is_administrator FROM users")
            users = cursor.fetchall()
    return {"users": users}

@users_endpoint.get("/users/{user_id}", tags=["users"])
def handle_get_user(user_id: int):
    """
    ユーザ情報を取得するエンドポイント
    """
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, email, is_administrator FROM users WHERE id=%s", (user_id,))
            user = cursor.fetchone()
    if user:
        return {"user": user}
    else:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")

@users_endpoint.get("/users/email/{email}", tags=["users"])
def handle_get_user_by_email(email: str):
    """
    ユーザ情報を取得するエンドポイント
    """
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, email, is_administrator FROM users WHERE email=%s", (email,))
            user = cursor.fetchone()
    if user:
        return {"user": user}
    else:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")

@users_endpoint.post("/users", tags=["users"])
def handle_create_user(user: PostUserRequest):
    """
    ユーザ情報を作成するエンドポイント
    """
    with get_connection() as conn:
        with conn.cursor() as cursor:
            # 既存ユーザー確認
            cursor.execute("SELECT id FROM users WHERE email=%s", (user.email,))
            if cursor.fetchone():
                raise HTTPException(status_code=400, detail="既に登録されています")
            cursor.execute(
                "INSERT INTO users (email, password, is_administrator) VALUES (%s, %s, %s)",
                (user.email, user.password, int(user.is_administrator))
            )
            conn.commit()
            user_id = cursor.lastrowid
    return {"user": {"id": user_id, "email": user.email, "is_administrator": user.is_administrator}}

@users_endpoint.delete("/users/{user_id}", tags=["users"])
def handle_delete_user(user_id: int):
    """
    ユーザ情報を削除するエンドポイント
    """
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM users WHERE id=%s", (user_id,))
            conn.commit()
            if cursor.rowcount == 0:
                raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    return {"user": f"ユーザID {user_id} を削除しました"}