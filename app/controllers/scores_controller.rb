class ScoresController < ApplicationController
  before_action :calculate_score_percentages, only: [:index]
  before_action :get_score, only: [:index] 
  before_action :get_level, only: [:index]
  skip_before_action :verify_authenticity_token

  def index
  end 

  private

  def get_score 
    @score ||= score_params[:score].nil? ? 0 : score_params[:score]
  end

  def get_level 
    @level ||= score_params[:level].nil? ? 1 : score_params[:level]
  end

  def get_scores_arr
    @scores ||= Play.all.pluck(:score).compact.sort();
  end

  def calculate_score_percentages
    scores_arr = get_scores_arr 
    array_size = (scores_arr.last - scores_arr.first) / 100 + 1;
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
        @score_percentage[9] = 100 - total_sum 
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
    )
  end

end
