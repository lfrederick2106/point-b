require "application_system_test_case"

class ItinerariesTest < ApplicationSystemTestCase
  setup do
    @itinerary = itineraries(:one)
  end

  test "visiting the index" do
    visit itineraries_url
    assert_selector "h1", text: "Itineraries"
  end

  test "creating a Itinerary" do
    visit itineraries_url
    click_on "New Itinerary"

    fill_in "Lat1", with: @itinerary.lat1
    fill_in "Lat2", with: @itinerary.lat2
    fill_in "Lon1", with: @itinerary.lon1
    fill_in "Lon2", with: @itinerary.lon2
    click_on "Create Itinerary"

    assert_text "Itinerary was successfully created"
    click_on "Back"
  end

  test "updating a Itinerary" do
    visit itineraries_url
    click_on "Edit", match: :first

    fill_in "Lat1", with: @itinerary.lat1
    fill_in "Lat2", with: @itinerary.lat2
    fill_in "Lon1", with: @itinerary.lon1
    fill_in "Lon2", with: @itinerary.lon2
    click_on "Update Itinerary"

    assert_text "Itinerary was successfully updated"
    click_on "Back"
  end

  test "destroying a Itinerary" do
    visit itineraries_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Itinerary was successfully destroyed"
  end
end
