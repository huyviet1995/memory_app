class HomeController < ApplicationController
  before_action :current_lvl, only: [:game] 

  def index
  end

  def game 
  end

  def scores
  end

  def tutorial
  end

  def about
  end 

  private
  # input the size of the board, and number of flipped squared
  # output array of coordinates 
  def random_flipped_square_generator(r, c, no_of_squares)
    visited_row = Array.new(r) 
    visited_col = Array.new(c) 
    result = Hash.new

    for i in 1..no_of_squares do 
      result[i] = Array.new(2)
      loop do
        random_row = rand(r)
        random_col = rand(c)
        if visited_row[random_row].nil? || visited_col[random_col].nil?
          visited_row[random_row] = true
          visited_col[random_col] = true
          result[i][0] = random_row
          result[i][1] = random_col
          break
        end
      end 
    end
    
    result

  end

  def current_lvl
    if game_params[:lvl].present? && game_params[:lvl].to_i > 0
      @current_lvl = game_params[:lvl].to_i <20 ? game_params[:lvl].to_i : 20
    else
      @current_lvl = 1
    end
    @current_lvl
  end

  def game_params
    @game_params ||= params.permit(
      :lvl
    )
  end

end
