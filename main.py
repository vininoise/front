from flask import Flask, render_template, request, jsonify
from flask_restful import Resource, Api
from joblib import load
import pandas as pd

app = Flask(__name__, template_folder='template')  # Defina o diretório dos templates
api = Api(app)
modelo = load('ML.joblib')

class Pricing(Resource):
    @app.route("/")
    def hello_world():
        return render_template("form.html")

    @app.route('/form', methods=['POST'])
    def form():

        product_name_length = request.form.get('product_name_length')
        product_description_length = request.form.get('product_description_length')
        product_photos_qty = request.form.get('product_photos_qty')
        product_weight_g = request.form.get('product_weight_g')
        product_length_cm = request.form.get('product_length_cm')
        product_height_cm = request.form.get('product_height_cm')
        product_width_cm = request.form.get('product_width_cm')
        product_category_name = request.form.get('product_category_name')


        input_df = pd.DataFrame({
            'product_name_length': [product_name_length],
            'product_description_length': [product_description_length],
            'product_photos_qty': [product_photos_qty],
            'product_weight_g': [product_weight_g],
            'product_length_cm': [product_length_cm],
            'product_height_cm': [product_height_cm],
            'product_width_cm': [product_width_cm],
            'product_category_name': [product_category_name]
        })

        # Faça a previsão usando o modelo
        predict = modelo.predict(input_df)[0]

        # Renderize o template com o resultado da previsão
        return render_template('result.html', prediction=predict)

api.add_resource(Pricing, '/')

if __name__ == '__main__':
    app.run(debug=True)