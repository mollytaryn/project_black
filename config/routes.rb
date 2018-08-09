Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'dashboard#show'

  get 'home', to: 'dashboard#show', as: :current_user

  resources :loans, only: [:new, :create, :index] do
    collection do
      get 'continue'
    end
  end

end
