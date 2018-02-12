class LoanCategory < ActiveRecord::Base

  validates_presence_of :name, :key

end
