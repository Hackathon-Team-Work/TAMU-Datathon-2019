import pandas as pd
data_path = './../dataset/clean/just_tacos_and_burritos_v2.csv' 
data = pd.read_csv(data_path)
from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route('/')
def root_route():
    return data.head().to_json()


@app.route('/restaurantsWithinZip', methods=['POST'])
def restaurants_within_zip(zip_code: str = "") -> dict: 
    req = request.get_json()
    zip_code = req['zip_code']
    return data[data['postalcode']==zip_code]


@app.route('/getByIngredientAndCuisine', methods=['POST'])
def get_by_ingredient_and_cuisine(ingredients: list = [], cuisine: list = []) -> dict:
    req = request.get_json()
    ingredients = req["ingredients"]
    cuisine = req["cuisine"]
    filtered_data = data[:]
    if len(ingredients) > 0:
        ingr_pattern = '|'.join([f'(?i){x}' for x in ingredients])
        filtered_data = filtered_data[filtered_data['menus.description'].str.contains(ingr_pattern, na=False, regex=True)]
    if len(cuisine) > 0:
        cuis_pattern = '|'.join([f'(?i){x}' for x in cuisine])
        filtered_data = filtered_data[filtered_data['cuisines'].str.contains(cuis_pattern, na=False, regex=True)]
    return filtered_data.reset_index().to_json(orient='records')


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

