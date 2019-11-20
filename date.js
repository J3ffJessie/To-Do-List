//jshint esversion: 6

exports.getDate = function(){

  const today = new Date();
  //adding formatting options for the date for the ToDo List
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  return today.toLocaleDateString("en-us", options);
};

exports.getDay = function(){

  const today = new Date();

  const options = {
    weekday: "long"
  };

  return today.toLocaleDateString("en-US", options);
};