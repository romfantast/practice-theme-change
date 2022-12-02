const refs = {
  header: document.querySelector("header"),
  themeIcon: document.querySelector("[data-theme-icon]"),
  themeIconPath: document.querySelector("[data-theme-icon] use"),
  codeImage: document.querySelector("[data-code]"),
  navList: document.querySelector("ul"),
};
const lightIconUrl = "/symbol-defs.svg#icon-sun1";
const darkIconUrl = "/symbol-defs.svg#icon-sun2";
let currentUrl = refs.themeIconPath.attributes.href;
const isTheme = localStorage.getItem("theme");

document.body.insertAdjacentHTML("beforeend", createSpinnerMarkup());

window.addEventListener("load", checkTheme);

refs.themeIcon.addEventListener("click", themeChange);
refs.navList.addEventListener("click", navLinkHandler);

function themeChange() {
  if (currentUrl.value === lightIconUrl) {
    setDarkAppearance();
    localStorage.setItem("theme", "dark");
  } else {
    setLightAppearance();
    localStorage.removeItem("theme");
    localStorage.setItem("theme", "light");
  }
}
let isActiveNotify = false;
function navLinkHandler(event) {
  if (isActiveNotify) {
    return;
  }
  if (event.target.nodeName === "LI" && !isActiveNotify) {
    document.body.insertAdjacentHTML("afterbegin", createNotifyMarkup());
    isActiveNotify = true;
  }
  const notifyBox = document.querySelector(".notify-box");
  setTimeout(() => {
    notifyBox.style.display = "none";
    isActiveNotify = false;
  }, 1800);
}

function setDarkAppearance() {
  currentUrl.value = darkIconUrl;
  document.body.classList.add("dark");
  refs.codeImage.src = "/img/dark-code.png";
}
function setLightAppearance() {
  currentUrl.value = lightIconUrl;
  document.body.classList.remove("dark");
  document.body.classList.add("light");
  refs.codeImage.src = "/img/light-code.png";
}

function checkTheme() {
  const spinner = document.querySelector("#app");
  if (detectSystemUserTheme() && isTheme === "dark") {
    setDarkAppearance();
  } else if (!detectSystemUserTheme() && isTheme === "light") {
    setLightAppearance();
  } else if (isTheme === "dark") {
    setDarkAppearance();
  } else if (isTheme === "light") {
    setLightAppearance();
  }
  setTimeout(() => {
    spinner.style.display = "none";
  }, 100);
}

function createSpinnerMarkup() {
  return `
	<div id="app">
		<div class="ui-spinner-container" show.bind="spinner.isActive">
			<div class="ui-spinner">
				<div class="spinner">
					<div></div>
				</div>
			</div>
		</div>
	</div>
	`;
}

function createNotifyMarkup() {
  return `
  <div class="notify-box">
			<p>
				There are only one page &#128578;
			</p>
		</div>
	`;
}

// ========== DETECT A THEME ==========//

function detectSystemUserTheme() {
  const isDarkSystemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (isDarkSystemTheme) {
    setDarkAppearance();
    return true;
  } else {
    setLightAppearance();
    return false;
  }
}
