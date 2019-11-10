# require 'pry'
# require 'rest-client'
require 'net/http'
# require 'open-uri'
# require 'json'
require 'time'

def calculate_trip(lat1, lon1, lat2, lon2)
  #make the web request

  uri = URI('https://api.ridemetro.org/data/CalculateItineraryByPoints')

    query = URI.encode_www_form({
        # Request parameters
        'lat1' => lat1,
        'lon1' => lon1,
        'lat2' => lat2,
        'lon2' => lon2,
        'startTime' => `datetime'#{Time.now.utc.iso8601}'`,
        '$format' => 'JSON',
        '$orderby' => 'EndTime'
    })

    

    if uri.query && uri.query.length > 0
        uri.query += '&' + query
    else
        uri.query = query
    end

    request = Net::HTTP::Get.new(uri.request_uri)
    # Request headers
    request['Ocp-Apim-Subscription-Key'] = '6741c2454ce544309f5020fbd7b6e4ca'
    # Request body
    request.body = "{body}"

    response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
        http.request(request)
    end

puts response.body

end

calculate_trip(29.759140, -95.363548, 29.741399, -95.587787)