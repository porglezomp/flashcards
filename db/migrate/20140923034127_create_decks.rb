class CreateDecks < ActiveRecord::Migration
  def change
    create_table :decks do |t|
      t.column :name, :string
      t.timestamps
    end
  end
end
