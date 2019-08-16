Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'home#index', as: :main
  get '/game', to: 'home#game', as: :game
  post '/game', to: 'home#game'
  get '/tutorial', to: 'home#tutorial', as: :tutorial
  get '/about', to: 'home#about', as: :about

  get '/scores', to: 'scores#index', as: :scores

  post '/play', to: 'plays#create', as: :create_play
end
