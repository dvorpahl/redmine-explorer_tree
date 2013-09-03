Redmine::Plugin.register :explorer_tree do
  name 'Explorer Tree (for Project-Index)'
  author 'Danilo Vorpahl'
  description 'This is a plugin enables Explorer-Like Projects-View'
  version '0.1.2'
  #url 'http://www.plastart.de/'
  #author_url 'http://example.com/about'
end

require 'redmine'
require 'hooks/view_layouts_base_html_hook'
