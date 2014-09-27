class User < ActiveRecord::Base
  has_many :decks
  validates :name, presence: true, length: {minimum: 6}
end
