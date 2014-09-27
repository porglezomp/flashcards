class AddTemplateToDecks < ActiveRecord::Migration
  def change
    add_column :decks, :template, :integer
  end
end
