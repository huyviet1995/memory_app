class HomeController < ApplicationController
  before_action :current_lvl, only: [:game] 

  def index
  end

  def game 
    @game_difficulty = set_game_difficulty
    @no_of_row = @game_difficulty[0]
    @no_of_col = @game_difficulty[1]
    @no_of_sqr = @game_difficulty[2]
    @current_lvl = current_lvl
    @random_square_coordinates = random_flipped_square_generator(@no_of_row, @no_of_col, @no_of_sqr).values
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
    visited = Array.new(r) {Array.new(c) {false}}
    result = Hash.new

    for i in 1..no_of_squares do 
      result[i] = Array.new(2)
      loop do
        random_row = rand(r)
        random_col = rand(c)
        if !visited[random_row][random_col]
          visited[random_row][random_col] = true
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
      @current_lvl = game_params[:lvl].to_i < 20 ? game_params[:lvl].to_i : 20
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

  # 1 => 2,2,1
  # 2 => 3,3,2
  # 3 => 3,3,3
  # 4 => 4,4,4
  # 5 => 4,4,5
  # 6 => 5,5,5
  # 7 => 5,5,6
  # 8 => 5,5,7
  # 9 => 5,5,8
  def set_game_difficulty 
    current_lvl = game_params[:lvl].to_i
    case current_lvl 
      when 1
        return [2,2,1]
      when 2
        return [3,3,2]
      when 3
        return [3,3,3]
      when 4
        return [4,4,4]
      when 5
        return [4,4,5]
      when 6
        return [5,5,5]
      when 7
        return [5,5,6]
      when 8
        return [5,5,7]
      when 9
        return [5,5,8]
      else
        return [5,5,8]
      end
  end 


end
