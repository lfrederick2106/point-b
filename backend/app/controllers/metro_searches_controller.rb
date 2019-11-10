require './lib/metro_api_communicator.rb'

class MetroSearchesController < ApplicationController
    def show

        puts itinerary_data
    end
end

show()

calculate_trip(29.759140, -95.363548, 29.741399, -95.587787)