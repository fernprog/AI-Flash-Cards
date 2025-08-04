import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

class supabaseCRUD:

    def __init__(self, table_name, allowed_delete):
        self.table = table_name
        self.allowed_delete = allowed_delete
        self.conn = psycopg2.connect(
            user=os.getenv("user"),
            password=os.getenv("password"),
            host=os.getenv("host"),
            port=os.getenv("port"),
            dbname=os.getenv("dbname")
        )
        self.cursor = self.conn.cursor()

    def Create(self, data_list: list[dict]) -> list[int]:
        if not data_list:
            return []

        cols = list(data_list[0].keys())
        col_str = ', '.join(cols)
        placeholders = ', '.join(['%s'] * len(cols))

        query = f"INSERT INTO {self.table} ({col_str}) VALUES ({placeholders}) RETURNING id"

        ids = []
        for data in data_list:
            values = tuple(data[col] for col in cols)
            self.cursor.execute(query, values)
            returned_id = self.cursor.fetchone()[0]
            ids.append(returned_id)

        self.conn.commit()
        return ids

    def Read(self, filters):
        query = f"SELECT * FROM {self.table}"
        values = []
        if filters:
            where = ' AND '.join([f"{k} = %s" for k in filters])
            values = list(filters.values())
            query += f" WHERE {where}"
        self.cursor.execute(query, values)
        return self.cursor.fetchall()

    def Delete(self, column, row):
        if column not in self.allowed_delete:
            raise ValueError("Invalid column name")
    
        query = f"DELETE FROM {self.table} WHERE {column} = %s"
        self.cursor.execute(query, (row,))
        self.conn.commit()

    def UPDATE():
        return;

    def close(self):
        self.cursor.close()
        self.conn.close()