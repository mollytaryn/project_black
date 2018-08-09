class LoanCategory < ApplicationRecord
  has_many :loans

  validates_presence_of :name, :key
end
