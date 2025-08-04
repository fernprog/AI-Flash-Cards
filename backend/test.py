from supabaseCRUD import supabaseCRUD

user = [
    {
        "username": "fernandoruiz",
        "email":"test@gmail.com",
        "password_hash": "howdy",
    }
]

#we will have to retrive the userid 
card_set = [
    {
        "user_id": 2,
        "title": "Python",
        "description": "This is a test"
    }
]

#get the set id returned from adding a set
cards = [
    {   
        "set_id": 2,
        "question": "What is the powerhouse of the cell?",
        "answer": "The mitochondrion",
        "difficulty": "easy",
        "tags": ["biology", "cell"]
    },
    {   
        "set_id": 2,
        "question": "What is the powerhouse of the cell?",
        "answer": "The mitochondrion",
        "difficulty": "easy",
        "tags": ["biology", "cell"]
    }
]

allowed_delete = {"id", "setId"}

#db = supabaseCRUD("users", allowed_delete)
#ids = db.Create(user)
#print(ids)

#db = supabaseCRUD("flashcard_sets", allowed_delete)
#ids = db.Create(card_set)
#print(ids)

db = supabaseCRUD("flashcards", allowed_delete)
ids = db.Create(cards)
print(ids)

#db.Delete("id", 20)
db.close()