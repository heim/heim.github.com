require 'erb'

hash = eval `./git-churn.sh`
sorted_hash = hash.sort {|a,b| a[1]<=>b[1] }

filenames = []
times_altered = []

sorted_hash.each do |pair|

  filenames << pair[0]
  times_altered << pair[1]

end
values = times_altered
labels = filenames
template = ERB.new(File.read("chart_template.html.erb"))

outputFile = File.new("git-churn-chart.html",File::CREAT|File::TRUNC|File::RDWR)
outputFile.write(template.result)
outputFile.close
