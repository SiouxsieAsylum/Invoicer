document.addEventListener("mousemove", function(e){
  const body = document.getElementsByTagName("body")[0];
  const width = window.innerWidth;
  const height = window.innerHeight;
  let x = e.clientX/10
  let y = e.clientY/10

  console.log("x", x)
  console.log("y", y)

  body.style.backgroundPosition = `${x}% ${y}%`


})
