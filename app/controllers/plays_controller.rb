class PlaysController < ApplicationController
  skip_before_action :verify_authenticity_token 

  def create
    @new_play = Play.new({
      level: play_params[:level],
      score: play_params[:score]
    }) 
    if @new_play.save
      render :json, "Play has been saved!"
    else
      render :json, "Play is failed to save! #{@new_play.errors.full_message}"
    end
  end

  def update
  end

  private
  def play_params
    params.permit(
      :level,
      :score,
      :missesCount,
    )
  end 

end 