from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = [
{
"id":1,
"title":"Atomic Habits",
"author":"James Clear",
"price":499,
"image":"https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
},
{
"id":2,
"title":"Rich Dad Poor Dad",
"author":"Robert Kiyosaki",
"price":399,
"image":"https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg"
}
]

@app.route("/")
def home():
    return "Backend Running"

@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(products)

@app.route("/products", methods=["POST"])
def add_product():

    data = request.get_json()

    new_book = {
        "id": len(products)+1,
        "title": data["title"],
        "author": data["author"],
        "price": data["price"],
        "image": data["image"]
    }

    products.append(new_book)

    return jsonify({"message":"Book Added"})

if __name__ == "__main__":
    app.run(debug=True)