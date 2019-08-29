class ScoresController < ApplicationController
  before_action :save_play, only: [:index] 
  before_action :get_all_score_summary, only: [:index]
  before_action :get_user_plays, only: [:show]
  before_action :get_score, only: [:index] 
  before_action :get_level, only: [:index]
  before_action :get_highest_score, only: [:show]
  before_action :get_highest_level, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
  end

  # User summary
  def show
  end

  private

  def get_highest_score
    plays = get_user_plays
    @highest_score = plays.maximum(:score)
  end

  def get_highest_level
    plays = get_user_plays 
    @highest_level = plays.maximum(:level)
  end 

  def save_play 
    return if session[:request_referrer] == request.original_url
    new_play = Play.new(
      level: score_params[:level],
      score: score_params[:score],
      user_id: score_params[:user_id].to_i
    )
    if new_play
      new_play.save!
      session[:request_referrer] = request.original_url
      return new_play
    else
      return nil
    end
  end

  def get_score 
    @score ||= score_params[:score].nil? ? 0 : score_params[:score]
  end

  def get_level 
    @level ||= score_params[:level].nil? ? 1 : score_params[:level]
  end

  def get_scores_arr
    @scores ||= Play.all.pluck(:score).compact.sort();
  end

  def get_all_score_summary
    calculate_score_percentages(get_scores_arr)
  end

  def get_user_plays 
    user = User.includes(:plays).find(score_params[:user_id].to_i)
    @plays = user.plays.all
  end

  # Get score for displaying in graph 
  def calculate_score_percentages(scores_arr)
    return [100] if scores_arr.blank?
    array_size = scores_arr.last / 100 + 1;
    score_counts_arr = Array.new(array_size) {0}
    count = 0

    scores_arr.each do |score|
      loop do
        if (score.between?(count*100, count*100 + 99))
          score_counts_arr[count]+=1
          break;
        else
          count+=1 
        end
      end
    end

    # Calculate sum
    sum = 0
    score_counts_arr.each do |score_count|  
      sum = sum + score_count 
    end

    @score_percentage = Array.new(array_size) {0}
    total_sum = 0 
    score_counts_arr.each_with_index do |score_count, idx|
      if idx == array_size - 1
        @score_percentage[array_size-1] = 100 - total_sum 
      else
        @score_percentage[idx] = (score_count*100)/sum
        total_sum = total_sum + @score_percentage[idx]  
      end
    end
    @score_percentage
  end

  # Calculate score percentage 

  def score_params 
    params.permit(
      :score,
      :level,
      :missesCount,
      :user_id,
    )
  end

end
