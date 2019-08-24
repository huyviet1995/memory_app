Rails.application.routes.draw do
  get 'user/new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'home#index', as: :main
  get '/game', to: 'home#game', as: :game
  post '/game', to: 'home#game'
  get '/tutorial', to: 'home#tutorial', as: :tutorial
  get '/about', to: 'home#about', as: :about

  post '/scores', to: 'scores#index', as: :scores

  post '/play', to: 'plays#create', as: :create_play

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create' 
  delete '/logout', to: 'sessions#destroy'

  resources :users 
end
