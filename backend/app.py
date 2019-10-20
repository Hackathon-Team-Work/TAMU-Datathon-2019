import pandas as pd
data_path = './../dataset/clean/just_tacos_and_burritos_v2.csv' 
data = pd.read_csv(data_path)
from flask import Flask
app = Flask(__name__)


@app.route('/')
def root_route():
    return data.head().to_json()


@app.route('/restaurantsWithinZip')
def restaurants_within_zip(zip_code: int) -> dict: 
    x = {}
    print(data.head())
    return x


@app.route('/restaurantsWithinVicinity')
def restaurants_within_vicinity(coords: tuple) -> dict:
    zip = coords[0]
    restaurants = restaurants_within_zip(zip)
    return restaurants


@app.route('/getPopularIngredients')
def get_popular_ingredients(coords: tuple) -> list:
    ingredients = []
    restaurants = restaurants_within_vicinity(coords)
    for i in restaurants:
        ingredients.append(i[0])
    return ingredients
