from flask import Flask
app = Flask(__name__)

@app.route('/')
def root_route():
    return "Hello, World!"

@app.route('/restaurantsWithinZip')
def restaurants_within_zip( zip_code : int ) -> dict: 
    x = {}
    return x

@app.route('/restaurantsWithinVicinity')
def restaurants_within_vicinity( coords:tuple ) -> dict:
    zip = coords[0]
    restaurants = restaurants_within_zip(zip)
    return restaurants

@app.route('/getPopularIngredients')
def get_popular_ingredients( coords:tuple ) -> list:
    l = []
    restaurants = restaurants_within_vicinity(coords)
    for i in restaurants:
        l.append(i[0])
    return l
    