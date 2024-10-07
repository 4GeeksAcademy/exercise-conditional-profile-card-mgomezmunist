import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Generar la lista de redes sociales
  let socialMedia = `
        <ul class="${variables.socialMediaPosition}">
          <li><a href="https://twitter.com/${variables.twitter ||
            ""}"><i class="fab fa-twitter"></i></a></li>
          <li><a href="https://github.com/${variables.github ||
            ""}"><i class="fab fa-github"></i></a></li>
          <li><a href="https://linkedin.com/in/${variables.linkedin ||
            ""}"><i class="fab fa-linkedin"></i></a></li>
          <li><a href="https://instagram.com/${variables.instagram ||
            ""}"><i class="fab fa-instagram"></i></a></li>
        </ul>
      `;

  document.querySelector("#widget_content").innerHTML = `
        <div class="widget">
          ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${variables.name || "Jane"} ${variables.lastName || "Doe"}</h1>
          <h2>${variables.role || "Web Developer"}</h2>
          <h3>${variables.city || "Miami"}, ${variables.country || "USA"}</h3>
          ${socialMedia}
        </div>
      `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "right",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: "Jane",
    lastName: "Doe",
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;

      if (attribute === "socialMediaPosition" && values[attribute] === "") {
        values[attribute] = "right";
      }

      render(Object.assign(window.variables, values));
    });
  });
};
