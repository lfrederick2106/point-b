json.extract! itinerary, :id, :lat1, :lon1, :lat2, :lon2, :created_at, :updated_at
json.url itinerary_url(itinerary, format: :json)
