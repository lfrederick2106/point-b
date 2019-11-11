# require './lib/metro_api_communicator.rb'

# require 'pry'
# require 'rest-client'
require 'net/http'
# require 'open-uri'
# require 'json'
require 'time'
require 'uri'
require 'net/http'
# require "./application_controller.rb"

class StaticController < ApplicationController
    cdef home()
        #make the web request
        require 'net/http'

        uri = URI('https://api.ridemetro.org/data/Routes')
        
        query = URI.encode_www_form({
            # Request parameters
            '$filter' => '{String}',
            '$top' => '{string}',
            '$skip' => '{string}',
            '$format' => 'json',
            '$orderby' => '{String}'
        })
        
        if uri.query && uri.query.length > 0
            uri.query += '&' + query
        else
            uri.query = query
        end
        
        request = Net::HTTP::Get.new(uri.request_uri)
        # Request headers
        request['Ocp-Apim-Subscription-Key'] = '{subscription key}'
        # Request body
        request.body = "{body}"
        
        response = Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
            http.request(request)
        end
        
        puts response.body
      
end
end

# calculate_trip(29.759140, -95.363548, 29.741399, -95.587787)