class AddCardIdToSides < ActiveRecord::Migration
  def change
    add_column :sides, :card_id, :integer
  end
end
