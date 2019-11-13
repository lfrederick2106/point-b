require 'net/http'

class ItinerariesController < ApplicationController
  # before_action :set_itinerary, only: [:show, :edit, :update, :destroy]

  # GET /itineraries
  # GET /itineraries.json
  def index
    uri = URI('https://api.ridemetro.org/data/Routes')

      query = URI.encode_www_form({
          # Request parameters
          # '$filter' => '{String}',
          # '$top' => '{string}',
          # '$skip' => '{string}',
          '$format' => 'json',
          # '$orderby' => 'EndTime'
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
      

      puts "response.body:", response.body
      puts "you made a get request I think?? to #index or /itineraries ?"
      render json: response.body
  end

  # GET /itineraries/1
  # GET /itineraries/1.json
  def show
    uri = URI('https://api.ridemetro.org/data/CalculateItineraryByPoints')

    query = URI.encode_www_form({
        # Request parameters
        'lat1' => '',
        'lon1' => '',
        'lat2' => '',
        'lon2' => '',
        'startTime' => `datetime'#{Time.now.utc.iso8601}'`,
        '$format' => 'JSON',
        '$orderby' => 'EndTime',
        '$expand' => 'Legs'
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

    puts "response.body:", response.body
    puts "you made a get request I think?? (to #show or /itineraries/1?"
    render json: response.body

  end

  # GET /itineraries/new
  # def new
  #   @itinerary = Itinerary.new
  # end

  # GET /itineraries/1/edit
  # def edit
  # end

  # POST /itineraries
  # POST /itineraries.json
  # def create
  #   @itinerary = Itinerary.create(itinerary_params)
  #   render json: @itinerary 
  #   puts "you made a post request I think??"
  # end

  # PATCH/PUT /itineraries/1
  # PATCH/PUT /itineraries/1.json
  def update
    uri = URI('https://api.ridemetro.org/data/CalculateItineraryByPoints')

    query = URI.encode_www_form({
        # Request parameters
        'lat1' => params[:lat1],
        'lon1' => params[:lon1],
        'lat2' => params[:lat2],
        'lon2' => params[:lon2],
        'startTime' => `datetime'#{Time.now.utc.iso8601}'`,
        '$format' => 'JSON',
        '$orderby' => 'EndTime',
        '$expand' => 'Legs'
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
    puts "you made a patch request I think??"
    render json: response.body

  end

  # DELETE /itineraries/1
  # DELETE /itineraries/1.json
  # def destroy
  #   @itinerary.destroy
  #   respond_to do |format|
  #     format.html { redirect_to itineraries_url, notice: 'Itinerary was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_itinerary
  #     @itinerary = Itinerary.find(params[:id])
  #   end

  #   # Never trust parameters from the scary internet, only allow the white list through.
    def itinerary_params
      params.permit(:lat1, :lon1, :lat2, :lon2)
    end
    
end