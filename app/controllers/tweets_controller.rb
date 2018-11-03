class TweetsController < ApplicationController
  def index
    @tweets = Tweet.all.order(created_at: :desc)
    @tweet = Tweet.new
  end

  def create
    @tweet = Tweet.new(tweet_params)

    if @tweet.save
      if request.xhr?
        puts "AJAX BABY"
        respond_to do |format|
          puts 'XHR?'
          format.html do
            puts "html response"
            render partial: "tweet-view", locals: {tweet: @tweet}
          end
          format.json do
            puts 'json'
            render json: @tweet
          end
        end
      else
        redirect_to tweets_path
      end
    else
      render :index
    end
  end

  def destroy
  end

  private

  def tweet_params
    params.require(:tweet).permit(:message)
  end
end
