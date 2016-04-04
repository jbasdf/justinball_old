var toggle = document.getElementById('toggle');
if(toggle){
  document.getElementById('toggle').addEventListener('click', function(e){
    document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
    document.getElementById('toggle').classList.toggle('x');
  });
}
