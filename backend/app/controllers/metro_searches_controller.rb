class MetroSearchesController < ApplicationController
    def show

        itinerary_data = 'https://api.ridemetro.org/data/CalculateItineraryByPoints?lat1=29.7520116285855&lon1=-95.3713343539019&lat2=29.7548465554328&lon2=-95.3357880398602&$orderby=EndTime&$expand=Legs&$format=json&subscription-key=6741c2454ce544309f5020fbd7b6e4ca'

        render json: itinerary_data
    end
end

puts it