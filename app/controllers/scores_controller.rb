class ScoresController < ApplicationController
  before_action :calculate_score_percentages, only: [:index]

  def index
  end 

  private

  def get_scores_arr
    @scores ||= Play.all.pluck(:score).sort();
  end

  def calculate_score_percentages
    scores_arr = get_scores_arr 
    score_counts_arr = Array.new(10) {0}
    scores_arr.each do |score| 
      if score.between?(0,99)
        score_counts_arr[0]+=1
      elsif score.between?(100,199)
        score_counts_arr[1]+=1
      elsif score.between?(200,299)
        score_counts_arr[2]+=1
      elsif score.between?(300,399)
        score_counts_arr[3]+=1
      elsif score.between?(400,499)
        score_counts_arr[4]+=1
      elsif score.between?(500,599)
        score_counts_arr[5]+=1
      elsif score.between?(600,699)
        score_counts_arr[6]+=1
      elsif score.between?(700,799)
        score_counts_arr[7]+=1
      elsif score.between?(800,899)
        score_counts_arr[8]+=1
      else score.between?(900,1000)
        score_counts_arr[9]+=1
      end
    end 

    # Calculate sum
    sum = 0
    score_counts_arr.each do |score_count|  
      sum = sum + score_count 
    end

    score_percentage = Array.new(10) {0}
    total_sum = 0 
    score_counts_arr.each_with_index do |score_count, idx|
      if idx == 9
        score_percentage[9] = 100 - total_sum 
      else
        score_percentage[idx] = (score_count*100)/sum
        total_sum = total_sum + score_percentage[idx]  
      end
    end
    score_percentage
  end

  # Calculate score percentage 

  def score_params 
    params.permit(
      :score,
      :lvl,
      :missesCount,
    )
  end

end
