from pymongo import MongoClient

MONGO_URI='mongodb+srv://villeplug21:bfzkPBHaEmDk9TGC@cluster0.71bhk.mongodb.net/villeplug?retryWrites=true&w=majority'

def clear_collection():
    client = MongoClient(MONGO_URI)
    db = client['villeplug']
    collection = db['solutions']
    result = collection.delete_many({})
    print(f"Documents deleted: {result.deleted_count}")
    client.close()

if __name__ == "__main__":
    clear_collection()
