require 'pry'
require 'rest-client'
require 'net/http'
# require 'open-uri'
# require 'json'

def calculate_trip(lat1, lon1, lat2, lon2)
  #make the web request

  uri = URI('https://api.ridemetro.org/data/CalculateItineraryByPoints')
  itineraries = RestClient.get(`https://api.ridemetro.org/data/CalculateItineraryByPoints?lat1=#{lat1}&lon1=#{lon1}&lat2=#{lat2}&lon2=#{lon2}&$orderby=EndTime&$expand=Legs&$format=json&subscription-key=6741c2454ce544309f5020fbd7b6e4ca`)
  itinerary_hash = JSON.parse(itineraries)
#   itinerary = itinerary_hash["results"].find { |data| data["??"] == ?? }

  puts itinerary_hash["d"]["results"]
end

calculate_trip(29.759140, -95.363548, 29.741399, -95.587787)