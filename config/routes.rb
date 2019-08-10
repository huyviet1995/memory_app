Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', to: 'home#index', as: :main
  get '/game', to: 'home#game', as: :game
  get '/scores', to: 'home#scores', as: :scores
  get '/tutorial', to: 'home#tutorial', as: :tutorial
  get '/about', to: 'home#about', as: :about
end
