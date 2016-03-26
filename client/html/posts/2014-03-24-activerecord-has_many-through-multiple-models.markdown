---
layout: post
author: Justin Ball
title: "ActiveRecord has_many through multiple models"
date: 2014-03-24 18:06:44 -0600
categories:
  - Rails
  - ActiveRecord
  - has_many
  - Programming
---

More than a few times now I've run into a situation where I really need to be able to relate one object to another through multiple tables - basically use 'has_many' twice.

Here's an example set of objects where a user can have many products but to get to the products you have to first go through associations and then through companies.
'user.companies' is straight forward ActiveRecord but 'user.companies.products' won't give you what you need.

<pre><code class="ruby">

class User < ActiveRecord::Base
  has_many :associations
  has_many :companies, :through => :associations
end

class Association < ActiveRecord::Base
  belongs_to :user
  belongs_to :company
end

class Company < ActiveRecord::Base
  has_many :associations
  has_many :users, :through => :associations
  has_many :products
end

class Product < ActiveRecord::Base
  belongs_to :company
end

</pre></code>

What I really want to do is setup an efficient query that bypasses the companies table. The associations table and the products table both have a 'company_id'.
What if we use those keys to relate the user to products? Doing so yields a bit of code like that below. Have a look at the comments for the details.

<pre><code class="ruby">

class User < ActiveRecord::Base
  has_many :associations
  has_many :companies, :through => :associations

  # Step 1 #####################################################
  # This relationship bypasses the companies table to get products that a user has a relationship with through the companies table.
  # The real magic happens when we specify 'source'. ActiveRecord knows to use the 'associations' table because we specify it using through.
  # We then direct it to the 'products' source. Now go to the comments in 'Association' for the next step.
  ##############################################################
  has_many :products, source: :product, through: :associations

end

class Association < ActiveRecord::Base
  belongs_to :user
  belongs_to :company

  # Step 2 #####################################################
  # Create a new 'belongs_to' relationship (used by 'source' in the 'has_many through' relationship in users).  Associate directly with a product
  # using association.company_id and product.company_id to bypass a query to the companies table. We do this by specifying the foreign_key which is the
  # name of the key in the products table as well as the primary_key which is the key from the associations table.
  ##############################################################
  belongs_to :product, foreign_key: :company_id, primary_key: :company_id

end

class Company < ActiveRecord::Base
  has_many :associations
  has_many :users, :through => :associations
  has_many :products
end

class Product < ActiveRecord::Base
  belongs_to :company

  # Step 3 #####################################################
  # This step isn't required but it will setup the bidirectional relationship back to users in case we want to be able to do something like 'product.users'.
  # Associate directly with an association using the company_id to bypass a query to the companies table.
  # Specify that we have many associations using the products.company_id as the primary key and associations.company_id as the foreign_key.
  # Then we can setup a relationship with users using the associations table.
  has_many :associations, primary_key: :company_id, foreign_key: :company_id
  has_many :users, through: :associations

end
</pre></code>

There you have it. A has_many relationship through multiple tables (more or less - we bypass the companies table but that's a good thing for performance).
Now we can do exciting stuff like this:

<pre><code class="ruby">

  result = user.products.select("count(associations.id) as total, associations.state, count(products.id) as products_total, products.category_id").group("state, category_id").order('category_id')

</pre></code>
