# Will build the JSON file for all the product_item components
json.extract! product, :id, :name, :tagline, :url, :image_url, :description, :for_sale, :category

json.user do
  json.extract! product.user, :avatar_url
end

json.up_votes product.votes_for.count

if user_signed_in?
  json.up_voted current_user.voted_for? product
end
