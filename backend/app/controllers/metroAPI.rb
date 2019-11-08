require 'rest-client'
require 'net/http'
require 'JSON'

# uri = URI('https://api.ridemetro.org/data/CalculateItineraryByPoints')


# Request parameters
# 'lat1' => '{string}',
# 'lon1' => '{string}',
# 'lat2' => '{string}',
# 'lon2' => '{string}',
# 'startTime' => '{string}',
# '$format' => '{String}',
# '$orderby' => '{String}'

itinerary_data = RestClient.get('https://api.ridemetro.org/data/CalculateItineraryByPoints?lat1=29.7520116285855&lon1=-95.3713343539019&lat2=29.7548465554328&lon2=-95.3357880398602&$orderby=EndTime&$expand=Legs&subscription-key=6741c2454ce544309f5020fbd7b6e4ca')
 
JSON.parse(itinerary_data)

puts itinerary_data