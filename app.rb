require 'sinatra'
require 'sinatra/reloader'

set :public_folder, "public"

get '/' do
  send_file File.join('index.html')
end

get '/news' do
  send_file File.join('news.html')
end

get '/form' do
  send_file File.join('form.html')
end
