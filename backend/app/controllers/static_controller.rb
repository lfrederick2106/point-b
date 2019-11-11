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
    def home()
        render json: { status: "it's working"}
    end
end