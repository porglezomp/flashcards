class CreateSides < ActiveRecord::Migration
  def change
    create_table :sides do |t|
      t.column :name, :string
      t.column :value, :string
      t.column :identifies, :boolean
      t.timestamps
    end
  end
end
