Rails.application.routes.draw do
  resources :itineraries
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  get :itineraries, to: "itineraries#get_all_routes"
  get '/itineraries/directions', to: 'itineraries#calculate_itinerary_by_points'

  # get '/metro_search', to: 'metro_searches#new'
  # post '/metro_search', to: 'metro_searches#show'

  # get :itinerary_data, to: "backend/lib/metro_api_communicator.rb"

  root to: "static#home"
end
 