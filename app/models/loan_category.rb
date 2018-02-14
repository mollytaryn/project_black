class LoanCategory < ActiveRecord::Base

  has_many :loans

  validates_presence_of :name, :key

end
