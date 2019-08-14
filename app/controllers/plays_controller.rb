class PlaysController < ApplicationController

  def update
    Play.update_attributes(play_params)
  end

  private
  def play_params
    params.permit(
      :lvl,
      :score
    )
  end 

end 