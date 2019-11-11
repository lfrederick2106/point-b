class CreateItineraries < ActiveRecord::Migration[6.0]
  def change
    create_table :itineraries do |t|
      t.float :lat1
      t.float :lon1
      t.float :lat2
      t.float :lon2

      t.timestamps
    end
  end
end
