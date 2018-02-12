namespace :db do
  desc 'Populate database with loan categories'

  task loan_categories: :environment do
    LoanCategory.destroy_all
    LoanCategory.create(name: 'Auto Loan', key: 'car')
    LoanCategory.create(name: 'Credit Card', key: 'credit')
    LoanCategory.create(name: 'Mortgage - Conventional', key: 'mortage')
    LoanCategory.create(name: 'Mortgage - FHA', key: 'mortage')
    LoanCategory.create(name: 'Mortgage - VA', key: 'mortage')
    LoanCategory.create(name: 'Personal', key: 'personal')
    LoanCategory.create(name: 'Student Loan - Federal', key: 'student')
    LoanCategory.create(name: 'Student Loan - Private', key: 'student')
    LoanCategory.create(name: 'Small Business', key: 'small_business')
  end
end
